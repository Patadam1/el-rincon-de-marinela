# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated: HTML, CSS y JavaScript sin framework ni paso de compilación. Se eligió porque es una landing de un negocio local: se sube tal cual a cualquier hosting, carga muy rápido en el móvil (bueno para el SEO local) y no tiene dependencias que mantener. De momento se publica desde GitHub (GitHub Pages); el dominio se comprará más adelante.

## Users

Landing para **Bar · Cafetería El Rincón de Marinela** (Mota del Cuervo, Cuenca). La construye Bramia (bramia.es), un estudio de diseño web y automatización para negocios locales.

- Visitantes principales: **gente joven de Mota del Cuervo y alrededores**. Buscan sitio para comer, cenar o tomar algo, casi siempre desde el móvil, y les atraen las hamburguesas y la comida tipo cadena.
- Visitantes secundarios: gente de la zona que quiere saber **qué hay hoy de menú del día**, el horario o el teléfono.

## Product Purpose

Que al ver la web **den ganas de ir al bar**. Las acciones que cuentan son llamar (para dudas o reservas), ver la carta, ver el menú del día y abrir **Cómo llegar** en Google Maps.

## Positioning

Un bar-cafetería de pueblo que ofrece lo que normalmente solo se encuentra en cadenas grandes: smash burgers, burgers de autor (con oro comestible, pan brioche rojo o negro, crema de pistacho o de lotus), pollo crujiente kentucky y combos. Lo hace con cocina casera de bar de toda la vida, menú del día y precios de pueblo. Abrió hacia febrero de 2026: es un sitio nuevo que quiere diferenciarse de los bares de siempre de la zona.

## Operating Context

- Dirección: C. Fray Alonso Cano, 16, 16630 Mota del Cuervo (Cuenca). Plus Code G42H+FX.
- Teléfono: 600 27 87 70, solo para llamadas. El WhatsApp es personal de la dueña: **no** se publica ni se ofrece WhatsApp.
- Horario actual:
  - De lunes a jueves: 9:00–16:00 y 18:00–23:00.
  - Fin de semana: 9:00–16:00 y 18:00 hasta cierre.
  - Pendiente: si el martes sigue siendo día de descanso y si el viernes va con el horario de fin de semana.
- Hacen comidas y cenas para recoger, sin reparto. No hacen celebraciones. Tienen terraza, pero solo se usa con buen tiempo; ahora mismo no está en uso.
- **Menú del día:** lo tienen siempre, con varios primeros y varios segundos a elegir, y postre o café incluido. Ahora lo publican cada día en sus historias de Instagram. La web tiene que permitir que **lo actualicen ellos mismos cada día** sin tocar código.
- Redes: Instagram @elrincondemarinela y Facebook "Elrincon Demarinela".

## Capabilities and Constraints

- Prioridad de contenido: **1) menú del día**; 2) la carta adaptada a la web, no como imagen; 3) llamar, cómo llegar y redes.
- No se destaca ninguna burger por encima del resto hasta que saquen una "burger del mes".
- El apartado "LAB" de Instagram (sus creaciones nuevas) no se destaca por ahora.
- Solo en español; quizá se añada inglés más adelante.
- Carta transcrita con precios en `content/carta.md`.

## Brand Commitments

- Nombre: **El Rincón de Marinela**, sin tilde en la "i".
- Logo: rótulo enmarcado con "BAR · CAFETERÍA / EL RINCÓN / de Marinela". Se usa el original en `assets/logo.svg` y `assets/logo.png`, y una versión invertida en blanco.
- Lemas de su Instagram: "Cocina casera con esencia" y "Un rincón para saborear el momento".
- Colores de su carta y su Instagram: verde salvia, verde oscuro, crema y blanco, más marrón y rojo en algunas publicaciones. El cliente da libertad de dirección visual.
- Referencias de nivel que le gustan al cliente: bramia.es, bezeta.es, hartielectrocool.es y vicio.com.

## Evidence on Hand

- Logo en SVG y PNG: `assets/`.
- Carta completa con precios: `content/carta.md`.
- Google: 4,2★ con 48 opiniones (34 de 5★). Se puede citar alguna opinión con el nombre de pila; el cliente dio el visto bueno provisional. Opiniones reales con texto:
  - "Hamburguesas de gran calidad y sorprende el buen precio que tienen, muy buen trato por parte de los camareros. Un sitio para repetir"
  - "Primera vez que fui y me encantó…"
  - "Muy buen servicio y muy rico todo!!"
  - "Excelente oreja, buenísimas croquetas y qué buen tinto de verano de la casa."
- **Faltan:** fotos de calidad (las están esperando; hay que dejar huecos para ellas) y vídeos (no está garantizado que lleguen). Las ilustraciones de la carta son stock de Canva en baja calidad y no son activos de marca.
- No inventar: precios, platos que no estén en la carta, servicios que no tengan (reparto, celebraciones) ni la historia de Marinela.

## Product Principles

1. **El menú del día manda:** es lo primero que hay que ver, y tiene que estar al día sin depender de Bramia.
2. **Ganas de ir:** cada sección empuja a ir al bar o a llamar, con "Cómo llegar" y el teléfono siempre a mano en el móvil.
3. **Sabor a cadena, alma de bar:** contar la mezcla entre burgers top y cocina casera de toda la vida.
4. **Carta viva, no un PDF:** la carta se lee, se filtra y se recorre bien en el móvil.
5. **Huecos honestos:** donde falten fotos se deja un hueco preparado, nunca una imagen engañosa.

## Accessibility & Inclusion

Sin requisitos específicos del cliente. Mínimo: contraste AA, uso cómodo con el pulgar en el móvil y respeto de `prefers-reduced-motion`, porque la web va a llevar muchas animaciones.
