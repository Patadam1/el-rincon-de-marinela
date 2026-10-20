(() => {
  "use strict";

  const R = window.RINCON;
  const CARTA = window.CARTA;
  const POSAVASOS = window.POSAVASOS;

  const root = document.documentElement;
  root.classList.add("js");

  const staticMode = /[?&]quieto/.test(location.search); // para capturas: sin animaciones de entrada
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches || staticMode;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const mobile = matchMedia("(max-width: 760px)");

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const euro = (v) => {
    if (typeof v === "number") return v.toFixed(2).replace(".", ",") + " €";
    return String(v).trim().replace(/€?$/, " €").replace(/\s+€/, " €");
  };

  /* ---------- Tiempo en Mota del Cuervo ---------- */

  const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const DIAS_TABLA = [1, 2, 3, 4, 5, 6, 0];

  function madridNow() {
    const parts = new Intl.DateTimeFormat("es-ES", {
      timeZone: "Europe/Madrid", year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", hourCycle: "h23", weekday: "long"
    }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t)?.value;
    const day = DIAS.indexOf(get("weekday"));
    return {
      day, d: +get("day"), m: +get("month"), y: +get("year"),
      minutes: +get("hour") * 60 + +get("minute")
    };
  }

  const toMin = (hhmm) => {
    if (hhmm === "cierre") return 24 * 60;
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  };
  const prettyTime = (hhmm) => (hhmm === "cierre" ? "cierre" : hhmm.replace(/^0/, ""));

  /* ---------- Enlaces ---------- */

  $$("[data-maps]").forEach((a) => {
    a.href = R.mapsHref;
    a.target = "_blank";
    a.rel = "noopener";
  });

  /* ---------- Cabecera ---------- */

  const top = $("[data-top]");
  const onScrollHeader = () => top.toggleAttribute("data-scrolled", scrollY > innerHeight * 0.35);
  addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Envoltorios de los posavasos (caída, inclinación, giro) ---------- */

  function wrapCoaster(c) {
    if ($(".coaster__drop", c)) return;
    const inner = $(".coaster__inner", c);
    const drop = el("div", "coaster__drop");
    const tilt = el("div", "coaster__tilt");
    drop.style.transformStyle = tilt.style.transformStyle = "preserve-3d";
    inner.replaceWith(drop);
    drop.append(tilt);
    tilt.append(inner);
  }

  function setFlipped(c, on) {
    c.classList.toggle("is-flipped", on);
    const front = $(".face--front", c);
    const back = $(".face--back", c);
    if (front && back) {
      front.setAttribute("aria-hidden", String(on));
      back.setAttribute("aria-hidden", String(!on));
      back.inert = !on;
      front.inert = on;
    }
    const btn = $("[data-flip]", c);
    if (btn) {
      btn.setAttribute("aria-pressed", String(on));
      const lbl = $("[data-flip-label]", btn);
      if (lbl) lbl.textContent = on ? "Volver" : btn.dataset.label || "Dar la vuelta";
    }
  }

  /* ---------- Caída sobre la barra ---------- */

  function dropIn(c, delay = 0) {
    if (staticMode) return;
    const target = $(".coaster__drop", c) || c;
    if (reduceMotion) {
      target.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay, fill: "backwards", easing: "ease-out" });
      return;
    }
    const spin = (Math.random() * 50 + 25) * (Math.random() < 0.5 ? -1 : 1);
    const settle = spin > 0 ? -1 : 1;
    target.animate(
      [
        { transform: `translate3d(0, -60vh, 0) rotate(${spin}deg) scale(1.12)`, opacity: 0, offset: 0 },
        { opacity: 1, offset: 0.25 },
        { transform: `translate3d(0, 0, 0) rotate(${settle * 4}deg) scale(1)`, offset: 0.62, easing: "cubic-bezier(.2,.6,.4,1)" },
        { transform: `translate3d(0, -10px, 0) rotate(${settle * -1.5}deg) scale(1.01)`, offset: 0.78, easing: "cubic-bezier(.3,0,.6,1)" },
        { transform: "translate3d(0, 0, 0) rotate(0deg) scale(1)", offset: 1 }
      ],
      { duration: 1050, delay, easing: "cubic-bezier(.45,0,.55,1)", fill: "backwards" }
    );
  }

  function dropOnView(nodes, stagger = 90) {
    if (staticMode) return;
    const io = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      visible.forEach((e, i) => {
        e.target.style.visibility = "";
        dropIn(e.target, i * stagger);
        io.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.15 });
    nodes.forEach((n) => {
      n.style.visibility = "hidden";
      io.observe(n);
    });
  }

  /* ---------- Inclinación con el ratón ---------- */

  function addTilt(c) {
    if (!finePointer || reduceMotion) return;
    const tilt = $(".coaster__tilt", c);
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const loop = () => {
      cx += (tx - cx) * 0.14;
      cy += (ty - cy) * 0.14;
      tilt.style.transform = `rotateX(${cy.toFixed(2)}deg) rotateY(${cx.toFixed(2)}deg)`;
      if (Math.abs(tx - cx) > 0.02 || Math.abs(ty - cy) > 0.02) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
    c.addEventListener("pointermove", (e) => {
      if (c.classList.contains("is-dragging")) return;
      const r = c.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 16;
      ty = -((e.clientY - r.top) / r.height - 0.5) * 16;
      kick();
    });
    c.addEventListener("pointerleave", () => { tx = 0; ty = 0; kick(); });
  }

  /* ---------- Menú del día ---------- */

  function parseCSV(text) {
    const rows = [];
    let row = [], cell = "", q = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (q) {
        if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
        else if (ch === '"') q = false;
        else cell += ch;
      } else if (ch === '"') q = true;
      else if (ch === ",") { row.push(cell); cell = ""; }
      else if (ch === "\n" || ch === "\r") {
        if (ch === "\r" && text[i + 1] === "\n") i++;
        row.push(cell); rows.push(row); row = []; cell = "";
      } else cell += ch;
    }
    if (cell || row.length) { row.push(cell); rows.push(row); }
    return rows;
  }

  function menuFromRows(rows) {
    const m = { fecha: "", precio: "", primeros: [], segundos: [], nota: "" };
    rows.forEach(([tipo = "", plato = ""]) => {
      const t = tipo.trim().toLowerCase();
      const v = plato.trim();
      if (!v) return;
      if (t.startsWith("fecha")) m.fecha = v;
      else if (t.startsWith("precio")) m.precio = v;
      else if (t.startsWith("primer")) m.primeros.push(v);
      else if (t.startsWith("segund")) m.segundos.push(v);
      else if (t.startsWith("nota")) m.nota = v;
    });
    return m;
  }

  function isToday(fecha, now) {
    if (!fecha) return true;
    const s = fecha.trim();
    let d, mo, y;
    let mt = s.match(/^(\d{1,2})[\/\-.](\d{1,2})(?:[\/\-.](\d{2,4}))?$/);
    if (mt) { d = +mt[1]; mo = +mt[2]; y = mt[3] ? +mt[3] : now.y; }
    else if ((mt = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/))) { y = +mt[1]; mo = +mt[2]; d = +mt[3]; }
    else return true;
    if (y < 100) y += 2000;
    return d === now.d && mo === now.m && y === now.y;
  }

  async function loadMenu() {
    if (R.menuSheetCsv) {
      try {
        const res = await fetch(R.menuSheetCsv + (R.menuSheetCsv.includes("?") ? "&" : "?") + "t=" + Date.now(), { cache: "no-store" });
        if (res.ok) return menuFromRows(parseCSV(await res.text()));
      } catch (e) { /* sin conexión con la hoja: usamos el archivo */ }
    }
    try {
      const res = await fetch(R.menuFallback, { cache: "no-store" });
      if (res.ok) return await res.json();
    } catch (e) { /* abierto desde el disco: sin menú */ }
    return null;
  }

  const precioTxt = (p) => euro(String(p).replace(/\s*€\s*$/, "").replace(".", ","));

  function renderMenu(menu) {
    const now = madridNow();
    const back = $("[data-menu-back]");
    const priceEl = $("[data-menu-price]");
    const coaster = $(".coaster--menu");
    const closedToday = (R.horario[now.day] || []).length === 0;
    const hasDishes = !!(menu && (menu.primeros?.length || menu.segundos?.length) && isToday(menu.fecha, now));

    $("[data-today]").textContent = `Hoy, ${DIAS[now.day]} ${now.d}`;
    renderHoy(menu, now, closedToday, hasDishes);

    if (menu?.precio && hasDishes) {
      priceEl.textContent = precioTxt(menu.precio);
      priceEl.hidden = false;
    }

    if (closedToday) {
      coaster.dataset.closed = "1";
      $(".menu__inc", coaster).textContent = "Hoy descansamos. Volvemos mañana a las 9:00.";
      setMenuButton("Ver horario");
      back.innerHTML = `<p class="menu__empty"><strong>Hoy descansamos</strong>Los ${DIAS[now.day]} cerramos. Mañana volvemos con menú desde las 9:00.</p>`;
      return;
    }
    if (!hasDishes) {
      back.innerHTML = `<p class="menu__empty"><strong>Hoy hay menú</strong>Aún no hemos subido los platos de hoy. Míralos en nuestras <a href="${R.instagram}" target="_blank" rel="noopener">historias de Instagram</a> o <a href="${R.telefonoHref}">llámanos</a>.</p>`;
      return;
    }
    const list = (arr) => `<p class="menu__dishes">${arr.map((d) => `<span class="menu__dish">${esc(d)}</span>`).join("")}</p>`;
    back.innerHTML = `
      ${menu.primeros.length ? `<p class="menu__group">Primeros</p>${list(menu.primeros)}` : ""}
      ${menu.segundos.length ? `<p class="menu__group">Segundos</p>${list(menu.segundos)}` : ""}
      <p class="menu__foot">${esc(menu.nota || "Postre o café incluido")}${menu.precio ? " · " + esc(precioTxt(menu.precio)) : ""}</p>`;
    fitMenu();
    addEventListener("resize", fitMenu, { passive: true });
    document.fonts?.ready.then(fitMenu);
  }

  function setMenuButton(label) {
    const btn = $(".coaster--menu [data-flip]");
    btn.dataset.label = label;
    $("[data-flip-label]", btn).textContent = label;
    btn.removeAttribute("aria-pressed");
  }

  /* Si el menú cabe con letra cómoda, el posavasos se da la vuelta.
     Si no cabe (lo normal con varios platos), el posavasos es un botón que lleva a #menu-hoy. */
  function fitMenu() {
    const body = $("[data-menu-back]");
    const face = body?.closest(".face");
    const coaster = $(".coaster--menu");
    if (!face || !$(".menu__dish", body)) return;
    const room = face.clientHeight * 0.66; // alto útil dentro del círculo
    const cs = getComputedStyle(body);
    body.style.setProperty("--fit", "1");
    const fits = body.scrollHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) <= room;
    coaster.classList.toggle("is-link", !fits);
    if (fits) {
      delete coaster.dataset.link;
      const btn = $("[data-flip]", coaster);
      btn.dataset.label = "Ver los platos de hoy";
      if (!coaster.classList.contains("is-flipped")) $("[data-flip-label]", btn).textContent = "Ver los platos de hoy";
    } else {
      coaster.dataset.link = "1";
      setFlipped(coaster, false);
      setMenuButton("Ver el menú de hoy");
    }
  }

  /* La sección grande del menú del día */
  function renderHoy(menu, now, closedToday, hasDishes) {
    const body = $("[data-hoy-body]");
    $("[data-hoy-date]").textContent = `${DIAS[now.day]} ${now.d}`;
    const price = $("[data-hoy-price]");
    if (closedToday) {
      body.innerHTML = `<p class="hoy__empty"><strong>Hoy descansamos</strong>Los ${DIAS[now.day]} cerramos. Mañana, desde las 9:00, volvemos con menú del día.</p>`;
      return;
    }
    if (!hasDishes) {
      body.innerHTML = `<p class="hoy__empty"><strong>Cada día, un menú distinto</strong>Primero, segundo y postre o café. Hoy todavía no lo hemos subido: míralo en nuestras <a href="${R.instagram}" target="_blank" rel="noopener">historias de Instagram</a> o <a href="${R.telefonoHref}">llámanos</a>.</p>`;
      return;
    }
    const group = (title, arr) => arr.length ? `<div class="hoy__group"><h3>${title}</h3><ul>${arr.map((d) => `<li>${esc(d)}</li>`).join("")}</ul></div>` : "";
    body.innerHTML = group("Primeros", menu.primeros) + group("Segundos", menu.segundos);
    $("[data-hoy-note]").textContent = menu.nota || "Postre o café incluido";
    if (menu.precio) {
      $("[data-hoy-price-num]").textContent = precioTxt(menu.precio);
      price.hidden = false;
      wrapCoaster(price);
    }
    revealList($$("li", body));
  }
  /* ---------- Abierto ahora ---------- */

  function slotsText(slots) {
    if (!slots.length) return "Cerrado";
    return slots.map(([a, b]) => `${prettyTime(a)}–${prettyTime(b)}`).join(" · ");
  }

  function renderOpen() {
    const now = madridNow();
    const stamp = $("[data-open-stamp]");
    const detail = $("[data-open-detail]");
    const today = R.horario[now.day] || [];
    const current = today.find(([a, b]) => now.minutes >= toMin(a) && now.minutes < toMin(b));
    if (current) {
      stamp.textContent = "Abierto";
      stamp.dataset.state = "open";
      detail.textContent = current[1] === "cierre" ? "Hoy hasta el cierre" : `Hoy hasta las ${prettyTime(current[1])}`;
      return;
    }
    stamp.textContent = "Cerrado";
    stamp.dataset.state = "closed";
    const later = today.find(([a]) => toMin(a) > now.minutes);
    if (later) { detail.textContent = `Abrimos hoy a las ${prettyTime(later[0])}`; return; }
    for (let i = 1; i <= 7; i++) {
      const d = (now.day + i) % 7;
      const s = R.horario[d] || [];
      if (s.length) {
        detail.textContent = i === 1 ? `Abrimos mañana a las ${prettyTime(s[0][0])}` : `Abrimos el ${DIAS[d]} a las ${prettyTime(s[0][0])}`;
        return;
      }
    }
  }

  function renderTimetable() {
    const tbody = $("[data-timetable] tbody");
    const now = madridNow();
    tbody.innerHTML = DIAS_TABLA.map((d) => {
      const name = DIAS[d][0].toUpperCase() + DIAS[d].slice(1);
      return `<tr${d === now.day ? ' class="is-today"' : ""}><th scope="row">${name}</th><td>${slotsText(R.horario[d] || [])}</td></tr>`;
    }).join("");
  }

  /* ---------- Posavasos de la barra ---------- */

  const POS = [
    [2, 4, -8], [21, 36, 6], [40, 3, -5], [58, 34, 9], [78, 6, -11], [5, 60, 4], [40, 62, -6]
  ];
  const RIM = "EL RINCÓN DE MARINELA · MOTA DEL CUERVO · ";

  function buildBarra() {
    const field = $("[data-field]");
    POSAVASOS.forEach((p, i) => {
      const c = el("article", `coaster coaster--${p.forma === "cuadrado" ? "square" : "round"}`);
      c.dataset.origen = p.origen;
      c.dataset.id = p.id;
      const rimId = `rim-${p.id}`;
      const ticket = p.origen === "casa" ? '<span class="ticket ticket--casa">De casa</span>' : '<span class="ticket ticket--ciudad">De ciudad</span>';
      c.innerHTML = `
        <div class="coaster__inner">
          <div class="face face--front">
            ${p.forma === "cuadrado" ? "" : `<svg class="rim" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="${rimId}" d="M100,100 m-79,0 a79,79 0 1,1 158,0 a79,79 0 1,1 -158,0"/></defs><text><textPath href="#${rimId}" textLength="492">${RIM}${RIM}</textPath></text></svg>`}
            <div class="face__body">
              <h3 class="pc__title">${esc(p.titulo)}</h3>
              ${ticket}
              ${p.desde ? `<p class="pc__from">desde ${euro(p.desde)}</p>` : `<p class="pc__from">desde las 9:00</p>`}
            </div>
          </div>
          <div class="face face--back" aria-hidden="true">
            <div class="face__body">
              <p class="pc__back">${esc(p.dorso)}</p>
            </div>
          </div>
        </div>
        <button class="coaster__hit" type="button" data-flip aria-pressed="false" aria-label="${esc(p.titulo)}: dar la vuelta"></button>
        <a class="pc__link" href="#carta" data-goto="${p.carta}" tabindex="-1">Ver en la carta</a>`;
      field.append(c);
      const [l, t, r] = POS[i % POS.length];
      c.style.left = l + "%";
      c.style.top = t + "%";
      c.style.rotate = r + "deg";
      wrapCoaster(c);
      setFlipped(c, false);
      addTilt(c);
      addPhoto(c, R.fotos[p.id]);
      enableDrag(c, field);
    });
    dropOnView($$(".coaster", field), 110);
  }

  function addPhoto(c, src) {
    if (!src) return;
    const img = new Image();
    img.alt = "";
    img.className = "pc__photo";
    img.decoding = "async";
    img.onload = () => {
      $(".face--front", c).prepend(img);
      c.classList.add("has-photo");
    };
    img.src = src;
  }

  /* arrastrar y lanzar (solo con ratón y pantalla ancha) */
  let zTop = 10;
  function enableDrag(c, field) {
    let startX = 0, startY = 0, ox = 0, oy = 0, x = 0, y = 0, vx = 0, vy = 0, lastT = 0, lastX = 0, lastY = 0;
    let dragging = false, pressed = false, raf = 0;

    const apply = () => { c.style.translate = `${x}px ${y}px`; };

    const bounds = () => {
      const f = field.getBoundingClientRect();
      const r = c.getBoundingClientRect();
      const baseL = r.left - f.left - x, baseT = r.top - f.top - y;
      return { minX: -baseL - 20, maxX: f.width - baseL - r.width + 20, minY: -baseT - 20, maxY: f.height - baseT - r.height + 20 };
    };

    let lastFrame = 0;
    const glide = (t) => {
      const k = lastFrame ? Math.min((t - lastFrame) / 16.67, 3) : 1;
      lastFrame = t;
      const f = Math.pow(0.92, k);
      vx *= f; vy *= f;
      x += vx * k; y += vy * k;
      const b = bounds();
      if (x < b.minX) { x = b.minX; vx = -vx * 0.45; }
      if (x > b.maxX) { x = b.maxX; vx = -vx * 0.45; }
      if (y < b.minY) { y = b.minY; vy = -vy * 0.45; }
      if (y > b.maxY) { y = b.maxY; vy = -vy * 0.45; }
      apply();
      if (Math.abs(vx) > 0.2 || Math.abs(vy) > 0.2) raf = requestAnimationFrame(glide);
      else { raf = 0; lastFrame = 0; }
    };

    c.addEventListener("pointerdown", (e) => {
      if (e.target.closest("a")) return;
      if (mobile.matches || e.pointerType !== "mouse") { pressed = true; return; }
      pressed = true; dragging = false;
      cancelAnimationFrame(raf);
      startX = e.clientX; startY = e.clientY; ox = x; oy = y;
      lastX = e.clientX; lastY = e.clientY; lastT = performance.now();
      vx = vy = 0;
      c.setPointerCapture(e.pointerId);
    });
    c.addEventListener("pointermove", (e) => {
      if (!pressed || mobile.matches || e.pointerType !== "mouse") return;
      const dx = e.clientX - startX, dy = e.clientY - startY;
      if (!dragging && Math.hypot(dx, dy) > 6) {
        dragging = true;
        c.classList.add("is-dragging");
        c.style.zIndex = ++zTop;
        $(".coaster__tilt", c).style.transform = "";
      }
      if (!dragging) return;
      x = ox + dx; y = oy + dy;
      const now = performance.now(), dt = Math.max(now - lastT, 1);
      vx = ((e.clientX - lastX) / dt) * 16; vy = ((e.clientY - lastY) / dt) * 16;
      lastX = e.clientX; lastY = e.clientY; lastT = now;
      apply();
    });
    const end = () => {
      if (!pressed) return;
      pressed = false;
      if (dragging) {
        dragging = false;
        c.classList.remove("is-dragging");
        if (!reduceMotion) raf = requestAnimationFrame(glide);
        c.dataset.justDragged = "1";
        setTimeout(() => delete c.dataset.justDragged, 0);
      }
    };
    c.addEventListener("pointerup", end);
    c.addEventListener("pointercancel", end);

    const flip = () => {
      const on = !c.classList.contains("is-flipped");
      setFlipped(c, on);
      const link = $(".pc__link", c);
      link.tabIndex = on ? 0 : -1;
      c.style.zIndex = ++zTop;
      hideHint();
    };
    c.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      if (c.dataset.justDragged) return;
      flip();
    });
  }

  function hideHint() {
    const h = $("[data-hint]");
    if (h && !h.dataset.done) {
      h.dataset.done = "1";
      h.animate([{ opacity: 1 }, { opacity: 0.45 }], { duration: 400, fill: "forwards", easing: "ease-out" });
    }
  }

  /* ---------- La carta ---------- */

  const CHIP_NAMES = { amantes: "Para compartir", bebidas: "Bebidas" };

  function buildCarta() {
    const list = $("[data-carta]");
    const track = $("[data-rack-track]");
    const carta = $(".carta");

    const all = el("button", "chip", "Todo");
    all.type = "button";
    all.setAttribute("aria-pressed", "true");
    all.dataset.cat = "";
    track.append(all);

    CARTA.forEach((cat) => {
      const chip = el("button", "chip", esc(CHIP_NAMES[cat.id] || cat.nombre));
      chip.type = "button";
      chip.dataset.cat = cat.id;
      chip.setAttribute("aria-pressed", "false");
      track.append(chip);

      const sec = el("section", "cat");
      sec.id = "carta-" + cat.id;
      sec.dataset.cat = cat.id;
      const ticket = cat.origen === "casa" ? '<span class="ticket ticket--casa">De casa</span>' : '<span class="ticket ticket--ciudad">De ciudad</span>';
      sec.innerHTML = `
        <div class="cat__head">
          <h3 class="cat__title">${esc(cat.nombre)}</h3>
          ${ticket}
          ${cat.sub ? `<p class="cat__sub">${esc(cat.sub)}</p>` : ""}
        </div>
        <ul class="cat__items">
          ${cat.items.map(([name, price, desc = "", tags = []]) => `
            <li class="dish">
              <div class="dish__row">
                <span class="dish__name">${esc(name)}${tags.length ? `<span class="dish__tags">${tags.map(tagHTML).join("")}</span>` : ""}</span>
                <span class="dish__dots" aria-hidden="true"></span>
                <span class="dish__price">${euro(price)}</span>
              </div>
              ${desc ? `<p class="dish__desc">${esc(desc)}</p>` : ""}
            </li>`).join("")}
        </ul>
        ${cat.nota ? `<p class="cat__note">${esc(cat.nota)}</p>` : ""}`;
      list.append(sec);
    });

    const select = (id, scroll) => {
      $$(".chip", track).forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.cat === (id || ""))));
      $$(".cat", list).forEach((s) => s.classList.toggle("is-active", s.dataset.cat === id));
      if (id) carta.dataset.active = id; else delete carta.dataset.active;
      const chip = $(`.chip[data-cat="${id || ""}"]`, track);
      chip?.scrollIntoView({ block: "nearest", inline: "center", behavior: reduceMotion ? "auto" : "smooth" });
      if (scroll && id) {
        const target = $("#carta-" + id);
        const y = target.getBoundingClientRect().top + scrollY - (mobile.matches ? 130 : 150);
        scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
      }
    };

    track.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      const id = chip.dataset.cat;
      select(chip.getAttribute("aria-pressed") === "true" && id ? "" : id, true);
    });

    document.addEventListener("click", (e) => {
      const a = e.target.closest("[data-goto]");
      if (!a) return;
      e.preventDefault();
      select(a.dataset.goto, true);
    });
  }

  function tagHTML(t) {
    if (t === "nuevo") return '<span class="tag tag--nuevo">Nuevo</span>';
    if (t === "reco") return '<span class="tag tag--reco">Recomendado</span>';
    if (t === "pica") return '<span class="tag tag--pica">Pica</span>';
    return "";
  }

  /* ---------- Servilletas ---------- */

  function buildNapkins() {
    const wrap = $("[data-napkins]");
    const rot = [-2.5, 1.8, -1.2, 2.6, -1.8];
    R.opiniones.forEach((o, i) => {
      const f = el("figure", "napkin");
      f.style.setProperty("--r", rot[i % rot.length] + "deg");
      f.innerHTML = `<blockquote>«${esc(o.texto)}»</blockquote><figcaption>${o.autor ? esc(o.autor) + " · " : ""}Opinión en Google</figcaption>`;
      wrap.append(f);
    });
    if (!reduceMotion) dropNapkins($$(".napkin", wrap));
  }

  function dropNapkins(nodes) {
    const io = new IntersectionObserver((entries) => {
      entries.filter((e) => e.isIntersecting).forEach((e, i) => {
        e.target.style.visibility = "";
        e.target.animate(
          [
            { transform: "translate3d(0, 40px, 0) scale(1.06)", opacity: 0, filter: "blur(3px)" },
            { transform: "translate3d(0, 0, 0) scale(1)", opacity: 1, filter: "blur(0)" }
          ],
          { duration: 700, delay: i * 80, easing: "cubic-bezier(.23,1,.32,1)", fill: "backwards" }
        );
        io.unobserve(e.target);
      });
    }, { threshold: 0.2 });
    nodes.forEach((n) => { n.style.visibility = "hidden"; io.observe(n); });
  }

  /* ---------- Mapa bajo demanda ---------- */

  $("[data-map-load]")?.addEventListener("click", () => {
    const box = $("[data-map]");
    const f = document.createElement("iframe");
    f.title = "Mapa: El Rincón de Marinela, Mota del Cuervo";
    f.loading = "lazy";
    f.referrerPolicy = "no-referrer-when-downgrade";
    f.src = "https://www.google.com/maps?q=El+Rinc%C3%B3n+de+Marinela,+C.+Fray+Alonso+Cano+16,+16630+Mota+del+Cuervo&output=embed";
    box.replaceChildren(f);
  });

  /* ---------- Bordes que giran con el scroll ---------- */

  function rimSpin() {
    if (reduceMotion) return;
    const rims = $$(".rim");
    let ticking = false;
    const update = () => {
      const v = (scrollY * 0.06).toFixed(2) + "deg";
      rims.forEach((r) => r.style.setProperty("--rim", v));
      ticking = false;
    };
    addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
  }

  /* ---------- Entrada de la primera pantalla: un solo momento, los posavasos caen ---------- */

  function heroIntro() {
    if (staticMode) return;
    const lines = $$(".hero__title .line");
    const actions = $$(".hero__actions .sachet-wrap");
    const coasters = $$('[data-drop="hero"]');
    const turn = $(".coaster--menu .coaster__turn");
    const ease = "cubic-bezier(.23,1,.32,1)";

    // el menú del día cae primero; luego el horario y Google
    coasters.forEach((c, i) => dropIn(c, 120 + i * 180));
    if (reduceMotion) return;

    turn?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: 950, easing: "ease-out", fill: "backwards" });
    lines.forEach((l, i) => {
      l.animate(
        [{ transform: "translateY(0.45em)", clipPath: "inset(0 0 100% 0)" }, { transform: "none", clipPath: "inset(0 0 -10% 0)" }],
        { duration: 800, delay: 80 + i * 110, easing: ease, fill: "backwards" }
      );
    });
    actions.forEach((a, i) =>
      a.animate([{ transform: "translateY(10px)", opacity: 0 }, { transform: "none", opacity: 1 }], { duration: 500, delay: 700 + i * 60, easing: ease, fill: "backwards" })
    );
  }
  /* ---------- Textos que aparecen la primera vez ---------- */

  const EASE = "cubic-bezier(.23,1,.32,1)";
  const motionOn = () => !reduceMotion && "IntersectionObserver" in window;

  // anima cuando el disparador entra en pantalla; hasta entonces queda en su primer fotograma
  function onFirstView(trigger, build, margin = "0px 0px -10% 0px") {
    if (!motionOn()) return;
    const anims = build().map(([node, frames, opts]) => {
      const a = node.animate(frames, { easing: EASE, fill: "backwards", ...opts });
      a.pause();
      return a;
    });
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      anims.forEach((a) => a.play());
      io.disconnect();
    }, { rootMargin: margin, threshold: 0.1 });
    io.observe(trigger);
  }

  function splitWords(node) {
    const parts = [];
    [...node.childNodes].forEach((n) => {
      if (n.nodeType !== 3) return;
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach((tok) => {
        if (!tok) return;
        if (/^\s+$/.test(tok)) { frag.append(tok); return; }
        const w = el("span", "w");
        const inner = el("span", null);
        inner.textContent = tok;
        w.append(inner);
        frag.append(w);
        parts.push(inner);
      });
      n.replaceWith(frag);
    });
    return parts;
  }

  function revealText() {
    if (!motionOn()) return;
    $$('[data-reveal="words"]').forEach((h) => {
      const words = splitWords(h);
      onFirstView(h, () => words.map((w, i) => [w,
        [{ transform: "translateY(105%) rotate(5deg)", opacity: 0 }, { transform: "none", opacity: 1 }],
        { duration: 800, delay: i * 55 }]));
    });
    $$('[data-reveal="fade"]').forEach((p) => {
      onFirstView(p, () => [[p,
        [{ opacity: 0, transform: "translateY(14px)", filter: "blur(6px)" }, { opacity: 1, transform: "none", filter: "blur(0)" }],
        { duration: 900, delay: 180 }]]);
    });
    $$('[data-reveal="type"]').forEach((p) => {
      onFirstView(p, () => [[p,
        [{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0 0 0)" }],
        { duration: 1100, delay: 500, easing: "steps(28, end)" }]]);
    });
    // la carta: sellos que se estampan y platos que entran en cascada, categoría a categoría
    $$(".cat").forEach((cat) => {
      onFirstView(cat, () => [
        [$(".cat__title", cat), [{ opacity: 0, transform: "translateX(-14px)" }, { opacity: 1, transform: "none" }], { duration: 700 }],
        ...$$(".ticket, .tag", cat).map((t, i) => [t,
          [{ opacity: 0, transform: "scale(1.9) rotate(-14deg)" }, { opacity: 1, transform: "scale(.94)", offset: 0.7 }, { opacity: 1, transform: "none" }],
          { duration: 420, delay: 260 + i * 70, easing: "cubic-bezier(.3,0,.5,1)" }]),
        ...$$(".dish", cat).slice(0, 10).map((d, i) => [d,
          [{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }],
          { duration: 500, delay: 120 + i * 40 }])
      ]);
    });
    // el sello de Abierto/Cerrado se estampa después de que caiga su posavasos
    const stamp = $("[data-open-stamp]");
    if (stamp && !staticMode) {
      stamp.animate([{ opacity: 0, transform: "scale(2) rotate(-18deg)" }, { opacity: 1, transform: "scale(.92)", offset: 0.75 }, { opacity: 1, transform: "none" }],
        { duration: 450, delay: 1200, easing: "cubic-bezier(.3,0,.5,1)", fill: "backwards" });
    }
  }

  function revealList(nodes) {
    if (!motionOn() || !nodes.length) return;
    onFirstView(nodes[0].closest("section") || nodes[0], () => nodes.map((n, i) => [n,
      [{ opacity: 0, transform: "translateX(-18px)" }, { opacity: 1, transform: "none" }],
      { duration: 650, delay: 200 + i * 70 }]));
  }

  /* ---------- La barra viva ---------- */

  function liveCounter() {
    if (reduceMotion) return;
    // lámpara que sigue al ratón en la primera pantalla
    const hero = $(".hero");
    if (finePointer && hero) {
      const lamp = el("div", "lamp");
      lamp.setAttribute("aria-hidden", "true");
      hero.prepend(lamp);
      let tx = innerWidth * 0.6, ty = innerHeight * 0.5, x = tx, y = ty, raf = 0;
      const loop = () => {
        x += (tx - x) * 0.08; y += (ty - y) * 0.08;
        lamp.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(loop) : 0;
      };
      hero.addEventListener("pointermove", (e) => {
        const r = hero.getBoundingClientRect();
        tx = e.clientX - r.left; ty = e.clientY - r.top;
        if (!raf) raf = requestAnimationFrame(loop);
      });
    }
    // marcas de vasos que aparecen en la barra
    const spots = [
      [".hero", [[6, 72, 170, -20, 0.55], [88, 18, 120, 40, 0.4]]],
      [".hoy", [[3, 12, 150, 10, 0.5], [92, 70, 190, -30, 0.45]]],
      [".barra", [[86, 8, 140, 25, 0.5], [30, 88, 200, -10, 0.4], [70, 92, 110, 60, 0.45]]],
      [".opiniones", [[8, 30, 160, 15, 0.45], [90, 78, 130, -40, 0.5]]],
      [".foot", [[12, 40, 140, 0, 0.4], [84, 20, 170, 30, 0.45]]]
    ];
    spots.forEach(([sel, list]) => {
      const sec = $(sel);
      if (!sec) return;
      list.forEach(([l, t, s, r, o]) => {
        const st = el("div", "stain");
        st.setAttribute("aria-hidden", "true");
        st.style.cssText = `left:${l}%;top:${t}%;--s:${s}px;--r:${r}deg;--o:${o};translate:-50% -50%`;
        sec.append(st);
      });
      if (staticMode || !("IntersectionObserver" in window)) { $$(".stain", sec).forEach((s) => s.classList.add("is-in")); return; }
      const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return;
        $$(".stain", sec).forEach((s, i) => setTimeout(() => s.classList.add("is-in"), 400 + i * 500));
        io.disconnect();
      }, { threshold: 0.2 });
      io.observe(sec);
    });
  }
  /* ---------- Arranque ---------- */

  $$("[data-coaster]").forEach((c) => {
    wrapCoaster(c);
    addTilt(c);
  });

  const menuCoaster = $(".coaster--menu");
  const menuBtn = $("[data-flip]", menuCoaster);
  menuBtn.dataset.label = $("[data-flip-label]", menuBtn).textContent;
  setFlipped(menuCoaster, false);
  const toggleMenu = () => {
    if (menuCoaster.dataset.closed) {
      $("#visita").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      return;
    }
    if (menuCoaster.dataset.link) {
      $("#menu-hoy").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      return;
    }
    setFlipped(menuCoaster, !menuCoaster.classList.contains("is-flipped"));
  };
  menuBtn.addEventListener("click", toggleMenu);
  $(".coaster__inner", menuCoaster).addEventListener("click", toggleMenu);
  $(".coaster__inner", menuCoaster).style.cursor = "pointer";

  renderOpen();
  renderTimetable();
  setInterval(renderOpen, 60_000);
  loadMenu().then(renderMenu);

  buildBarra();
  buildCarta();
  buildNapkins();
  rimSpin();
  heroIntro();
  revealText();
  liveCounter();
})();
