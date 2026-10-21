# Menú del día: cómo lo actualiza el bar

El bar rellena un **Formulario de Google** desde el móvil cada mañana. La web lee el último envío y lo muestra sola, sin tocar código ni avisar a Bramia.

## Preparación (una sola vez, la hace Bramia, unos 10 minutos)

### 1. Crear el formulario
1. Entra en **forms.google.com** con la cuenta de Google del bar (o una de Bramia) y crea un **formulario en blanco**.
2. Título: «Menú del día · El Rincón de Marinela».
3. Añade estas 4 preguntas, **con estos nombres exactos**:

   | Pregunta | Tipo | ¿Obligatoria? |
   |---|---|---|
   | **Primeros** | Párrafo | Sí |
   | **Segundos** | Párrafo | Sí |
   | **Precio** | Respuesta corta | No |
   | **Nota** | Respuesta corta | No |

   En la descripción de Primeros y Segundos pon: «Un plato por línea».
4. En **Configuración**, desactiva «Recopilar correos electrónicos» y «Limitar a 1 respuesta», para que se pueda enviar todos los días sin iniciar sesión.

### 2. Conectarlo con una hoja
1. Pestaña **Respuestas** → **Vincular con Hojas de cálculo** → **Crear una hoja nueva**.
2. En la hoja: **Archivo → Configuración → Configuración regional: España**. Así la fecha sale como 21/10/2026.

### 3. Publicar la hoja para la web
1. En la hoja: **Archivo → Compartir → Publicar en la web**.
2. Elige la pestaña **Respuestas de formulario 1** y el formato **Valores separados por comas (.csv)**.
3. Pulsa **Publicar** y copia el enlace.
4. Pega el enlace en `js/data.js`, en `menuSheetCsv: "…"`, y sube el cambio. Si se lo pasas a Claude, lo hace él.

### 4. Darle el formulario al bar
1. En el formulario, pulsa **Enviar → icono de enlace → Acortar URL** y copia el enlace.
2. Mándaselo al encargado con el mensaje de abajo.

## Mensaje para el bar (copiar y pegar en WhatsApp)

> ¡Hola! Para cambiar el **menú del día** en la web:
>
> 1. Abre este enlace: [ENLACE DEL FORMULARIO]
> 2. Escribe los **primeros** y los **segundos**, **uno por línea**.
> 3. Pon el precio si quieres y pulsa **Enviar**.
>
> En unos 5 minutos sale en la web. Si te equivocas, vuelve a enviarlo y vale el último.
>
> Consejo: guarda el enlace en la pantalla de inicio del móvil (en Chrome, menú ⋮ → «Añadir a pantalla de inicio») y lo tendrás como una app.

## Cómo se comporta la web

- Muestra **solo el envío de hoy**. Si hoy aún no han enviado nada, no enseña el menú de ayer: dice que aún no se ha subido y manda a las historias de Instagram o a llamar.
- Si el menú no cabe en el posavasos, el posavasos lleva a la sección grande «Menú del día».
- Los **martes** (cerrado) avisa solo de que descansan.
- Los cambios tardan unos **5 minutos** en verse, porque Google tarda en refrescar la hoja publicada.

## Si no se usa el formulario

Mientras `menuSheetCsv` esté vacío, la web lee `menu-del-dia/hoy.json`. También sigue funcionando el formato antiguo de hoja con columnas «tipo / plato» (ver `plantilla-hoja.csv`).
