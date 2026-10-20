# El Rincón de Marinela · Landing

Landing del Bar · Cafetería El Rincón de Marinela (Mota del Cuervo). Hecha por Bramia.
Es HTML, CSS y JavaScript sin dependencias: se sube tal cual a cualquier hosting.

## Estructura

| Archivo | Qué es |
|---|---|
| `index.html` | La página |
| `css/styles.css` | Estilos: la barra verde, los posavasos y los sobres de azúcar |
| `js/data.js` | **Todos los datos editables**: teléfono, horario, enlaces, carta, opiniones y fotos |
| `js/app.js` | Animaciones y lógica: menú del día, "abierto ahora", carta y arrastrar posavasos |
| `menu-del-dia/` | Menú del día: hoja de Google y archivo de respaldo (ver `COMO-ACTUALIZAR.md`) |
| `assets/` | Logo en SVG (original, blanco y tinta), imagen para compartir (`og.png`) y favicon |
| `content/carta.md` | La carta transcrita de su Canva, como referencia |

## Tareas pendientes

- **Fotos.** Pon los archivos en `assets/fotos/` con estos nombres y aparecen solos en los posavasos de «Dos cartas en una barra»: `smash.jpg`, `burgers.jpg`, `pollo.jpg`, `raciones.jpg`, `tostas.jpg`, `tartas.jpg` y `desayunos.jpg`. Usa fotos cuadradas de unos 800×800 px.
- **Menú del día.** Crea la hoja de Google y pega su enlace en `js/data.js` (`menuSheetCsv`). Los pasos están en `menu-del-dia/COMO-ACTUALIZAR.md`.
- **Dominio.** Cuando lo compréis, cambia en `index.html` `og:image` a la URL absoluta (por ejemplo `https://dominio.es/assets/og.png`); WhatsApp necesita la URL completa para enseñar la vista previa. Añade también `<link rel="canonical">`.
- **Por confirmar con el cliente:**
  - Nombre exacto de la burger nº 6, que he puesto como «Buey Moteña».
  - Si La Viciosa, Red Burguer y la tosta de gambón siguen en carta; ahora no aparecen.
  - Carta de desayunos y meriendas con precios.

## Publicar en GitHub Pages

1. Crea un repositorio y sube todo el contenido de esta carpeta, salvo `.impeccable/` y `.claude/`, que son herramientas de trabajo.
2. En el repositorio, ve a Settings → Pages → Branch `main`, carpeta `/ (root)`.
3. Con el dominio comprado, añádelo en Settings → Pages → Custom domain.

## Ver en local

```bash
python -m http.server 5173
```

Abre http://localhost:5173. Para hacer capturas sin animaciones, añade `?quieto` a la URL.
