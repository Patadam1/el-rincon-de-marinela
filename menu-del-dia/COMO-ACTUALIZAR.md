# Menú del día: cómo lo actualizan ellos

La web lee el menú de una **hoja de Google Sheets**. El bar la edita desde el móvil cada mañana y la web lo muestra sola. No hace falta tocar código ni avisar a Bramia.

## Preparación (una sola vez, la hace Bramia)

1. Con la cuenta de Google del bar, crea una hoja nueva en Google Sheets. Llámala, por ejemplo, «Menú del día · El Rincón».
2. Copia en ella el contenido de `plantilla-hoja.csv`, en dos columnas: **A = tipo** y **B = plato**.
3. Menú **Archivo → Compartir → Publicar en la web**:
   - En «Enlace», elige la hoja (Hoja 1) y el formato **Valores separados por comas (.csv)**.
   - Pulsa **Publicar** y copia el enlace que te da.
4. Pega ese enlace en `js/data.js`, en `menuSheetCsv: "…"`, y sube el cambio.
5. Comparte la hoja con el móvil de la dueña (Compartir → con permiso de **Editor**) e instálale la app de Google Sheets.

## Cada día (lo hace el bar, en 1 minuto)

Abren la hoja en la app de Google Sheets y cambian solo la columna B:

| tipo    | plato                          |
|---------|--------------------------------|
| fecha   | 21/10/2026                     |
| precio  | 12,50                          |
| primero | Lentejas estofadas             |
| primero | Ensalada de la casa            |
| segundo | Pollo asado con patatas        |
| segundo | Merluza a la plancha           |
| nota    | Postre o café incluido         |

- Pueden poner tantas filas de **primero** y **segundo** como quieran.
- **fecha** es importante: si pone otro día que no es hoy, la web no enseña platos viejos. En su lugar dice que aún no se ha subido el menú y manda a las historias de Instagram o a llamar.
- Si dejan **precio** vacío, la web no muestra precio.
- Los cambios tardan unos **5 minutos** en verse, porque Google tarda en refrescar la hoja publicada.
- Los martes la web dice sola que descansan. No hace falta tocar nada.

## Si no se usa la hoja

Mientras `menuSheetCsv` esté vacío, la web lee `menu-del-dia/hoy.json`, que ahora está vacío. En ese caso, el posavasos del menú anuncia que hay menú cada día y manda a las historias de Instagram o a llamar.
