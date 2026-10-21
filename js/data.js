/* Datos de El Rincón de Marinela.
   Para cambiar precios, platos u horario, edita este archivo. */

window.RINCON = {
  telefono: "600 27 87 70",
  telefonoHref: "tel:+34600278770",
  direccion: "C. Fray Alonso Cano, 16, 16630 Mota del Cuervo (Cuenca)",
  mapsHref: "https://www.google.com/maps/dir/?api=1&destination=El+Rinc%C3%B3n+de+Marinela%2C+C.+Fray+Alonso+Cano+16%2C+16630+Mota+del+Cuervo",
  mapsFichaHref: "https://maps.app.goo.gl/gHz9aJYzG9bYYPPh6",
  instagram: "https://www.instagram.com/elrincondemarinela/",
  facebook: "https://www.facebook.com/p/El-Rinc%C3%B3n-de-Marinela-61578650065252/",

  /* Menú del día.
     Pega aquí el enlace CSV publicado de la hoja de Google (ver menu-del-dia/COMO-ACTUALIZAR.md).
     Mientras esté vacío, la web usa menu-del-dia/hoy.json. */
  menuSheetCsv: "",
  menuFallback: "menu-del-dia/hoy.json",

  /* Horario. 0 = domingo … 6 = sábado. "cierre" = hasta que cierren. Martes cerrado. */
  horario: {
    0: [["09:00", "16:00"], ["18:00", "cierre"]],
    1: [["09:00", "16:00"], ["18:00", "23:00"]],
    2: [],
    3: [["09:00", "16:00"], ["18:00", "23:00"]],
    4: [["09:00", "16:00"], ["18:00", "23:00"]],
    5: [["09:00", "16:00"], ["18:00", "cierre"]],
    6: [["09:00", "16:00"], ["18:00", "cierre"]]
  },

  /* Fotos: pon el archivo en assets/fotos/ con este nombre y aparece solo. */
  fotos: {
    smash: "assets/fotos/volcan-de-queso.jpg",
    burgers: "assets/fotos/black-burger.jpg",
    pollo: "assets/fotos/fritura.jpg",
    raciones: "assets/fotos/huevos-rotos.jpg",
    tostas: "assets/fotos/tosta-gambas.jpg",
    tartas: "assets/fotos/tarta-pistacho.jpg",
    desayunos: "assets/fotos/desayunos.jpg"
  },

  /* Burger del mes: cámbiala cada mes. Para ocultar la sección, pon burgerDelMes: null. */
  burgerDelMes: {
    nombre: "La Maldita",
    descripcion: "Pan negro, cheddar fundido y beicon. La de Halloween, solo este mes.",
    precio: null,
    foto: "assets/fotos/black-burger.jpg",
    encuadre: "50% 60%", // qué parte de la foto se ve (horizontal vertical)
    carta: "burgers"
  },

  /* Fotos de la tira «Pásate a vernos»: añade o quita las que quieras.
     Si una foto no está en assets/fotos/, la tira se la salta. */
  galeria: [
    "barra.jpg", "black-burger.jpg", "oreja.jpg", "nachos.jpg", "comedor.jpg", "burger-pistacho.jpg",
    "paella.jpg", "patatas-queso.jpg", "volcan-de-queso.jpg", "fritura.jpg", "ensalada-caprese.jpg",
    "burger-roja.jpg", "huevos-rotos.jpg", "sandwich.jpg", "escalope.jpg", "gambas-ajillo.jpg",
    "tosta-gambas.jpg", "ensalada-manzana.jpg", "menu-pescado.jpg", "bocadillo.jpg", "ensalada-salmon.jpg",
    "menu-carne.jpg", "tarta-pistacho.jpg", "ensalada-marisco.jpg"
  ],

  opiniones: [
    { texto: "Hamburguesas de gran calidad y sorprende el buen precio que tienen, muy buen trato por parte de los camareros. Un sitio para repetir." },
    { texto: "Excelente oreja, buenísimas croquetas y qué buen tinto de verano de la casa." },
    { texto: "Primera vez que fui y me encantó, recomiendo mucho a la gente que vaya a este bar, sin duda voy a repetir muchas veces." },
    { texto: "Pedimos un par de raciones y la hamburguesa de volcán y estaba exquisita.", autor: "Antonio" },
    { texto: "Muy buen servicio y muy rico todo." }
  ]
};

/* La carta. origen: "casa" (cocina de toda la vida) o "ciudad" (lo que solo había en las cadenas).
   tags: "nuevo" (tinta roja), "reco" (recomendado, tinta dorada), "pica". */
window.CARTA = [
  {
    id: "raciones", nombre: "Raciones", sub: "Las de toda la vida", origen: "casa",
    items: [
      ["Pincho moruno", 2.5], ["Croquetas variadas", 10], ["Tabla de quesos", 14], ["Jamón de bodega", 14],
      ["Torreznos", 11.5], ["Calamares nacionales", 15], ["Oreja", 10.5], ["Alitas", 10],
      ["Lomo de orza", 11, "", ["nuevo"]], ["Revuelto de ajetes y gambas", 11], ["Huevos rotos", 10.5],
      ["Sepia a la plancha", 12], ["Rabas", 13], ["Pulpo", 14.5], ["Secreto", 9.5],
      ["Muslo de pollo deshuesado", 8.5], ["Rejos fritos", 13]
    ]
  },
  {
    id: "amantes", nombre: "Para los amantes del Rincón", sub: "Para compartir", origen: "ciudad",
    items: [
      ["Crunchy combo", 13, "Crocanti, alitas grill, solomillo kentucky y 3 salsas", ["nuevo"]],
      ["Combo El Rincón", 15, "Nuggets, alitas, tequeños, patatas y queso frito"],
      ["Cachopo crujiente", 9, "", ["nuevo"]], ["Fingers de pollo", 9],
      ["Cono de pollo kentucky", 10.5, "", ["nuevo"]], ["Tequeños", 9.5],
      ["Tequeños infernales", 10, "Tequeños con un ligero toque picante", ["pica"]],
      ["Queso frito", 11.5], ["Salchipapas", 8], ["Patatas fritas", 6], ["Patatas bravas", 7.5],
      ["Patatas rancheras", 9.5, "Beicon crujiente, queso fundido y salsa ranchera"],
      ["Patatas cochinas", 10.5, "Carne mechada a baja temperatura, bbq y queso", ["reco"]],
      ["Nachos", 10.5, "Salsa secreta, cheddar, cebolla crujiente y guacamole", ["reco", "pica"]]
    ]
  },
  {
    id: "burgers", nombre: "Burgers", sub: "Todas con patatas", origen: "ciudad",
    nota: "Ingrediente extra 0,50 € · Huevo frito 1,00 €",
    items: [
      ["La de siempre", 8, "Vacuno 180 g, lechuga, tomate y mayonesa"],
      ["La Canalla", 9, "Carne mechada a baja temperatura, lechuga, cheddar y salsa bbq", ["reco"]],
      ["Deluxe", 9.5, "Vacuno 180 g, salsa de pepinillo, lechuga, tomate, beicon crujiente, cheddar, huevo y cebolla crujiente"],
      ["La Setera", 9, "Vacuno 180 g, beicon, queso tierno, cebolla caramelizada y salsa de setas"],
      ["La Manchega 2.0", 10, "Vacuno 180 g, queso curado, mermelada de beicon, jamón ibérico y panceta ibérica", ["reco"]],
      ["Buey Moteña", 10.5, "Buey 220 g, lechuga, queso de cabra, cebolla caramelizada y salsa de pepinillos"],
      ["La Pecadora", 12, "Vacuno 200 g, pan brioche rojo, mermelada de cecina, cheddar, beicon, salsa cheddar y oro comestible", ["nuevo"]],
      ["Black Golden", 13, "Vacuno 200 g, pan brioche negro, salsa Emmy, doble cheddar, beicon, salsa de mango habanero, salsa cheddar y oro comestible", ["nuevo"]]
    ]
  },
  {
    id: "smash", nombre: "Smash", sub: "Doble, aplastada en la plancha", origen: "ciudad",
    items: [
      ["Clasic Smash", 8, "Smash de vacuno 100 g, doble cheddar y beicon crispy"],
      ["Lotus Extreme", 10, "Doble smash de vacuno, doble cheddar, beicon crispy y crema crumble de lotus y galleta"],
      ["Volcán de Queso", 10, "Doble smash de vacuno, cheddar, beicon crujiente, volcán de queso y cebolla crujiente", ["reco"]],
      ["La Trufada", 10, "Doble smash de vacuno 120 g, cheddar, panceta ibérica y salsa cremosa de trufa"],
      ["Pistacho", 10, "Doble smash de vacuno, doble cheddar, beicon y crema de pistacho", ["nuevo"]]
    ]
  },
  {
    id: "pollo", nombre: "Pollo crujiente", sub: "Estilo kentucky", origen: "ciudad",
    items: [
      ["Crispy Chicken", 10, "Pollo crujiente, lechuga, tomate, mayonesa, queso, beicon y cebolla crujiente"],
      ["Crispy Royale", 12, "Pollo kentucky, salsa rosa, mermelada de beicon, cheddar, beicon, patatas paja, salsa de mango habanero, salsa cheddar y sésamo", ["nuevo", "reco"]]
    ]
  },
  {
    id: "perritos", nombre: "Perritos", sub: "En pan brioche", origen: "ciudad",
    items: [
      ["Perrito clásico", 5.5, "Salchicha, queso fundido, mayonesa y ketchup"],
      ["Perrito especial", 6.5, "Salchicha, queso, beicon, cebolla frita y patatas paja"],
      ["Perrito mexicano", 7.5, "Salchicha, tomate, pepinillo, guacamole y nachos troceados"]
    ]
  },
  {
    id: "pizzas", nombre: "Pizzas", sub: "Todas a 10 €", origen: "ciudad",
    items: [
      ["Margarita", 10], ["Jamón york y queso", 10], ["Beicon y queso", 10],
      ["Barbacoa", 10], ["Pepperoni", 10], ["5 quesos", 10], ["Pan pizza", 4.5]
    ]
  },
  {
    id: "tostas", nombre: "Tostas", sub: "En pan de verdad", origen: "casa",
    items: [
      ["Caprese", 8, "Tomate cherry, mozzarella y orégano"],
      ["Pimiento", 8.5, "Mermelada de pimiento y queso de cabra"],
      ["Pollo", 8.5, "Pechuga, brotes verdes, queso tierno y cebolla caramelizada"],
      ["Tomate y boquerón", 8.5, "Boquerones, tomate, ajo picado y perejil"],
      ["Huevos revueltos con jamón y tomate", 9, "Jamón serrano, huevo, tomate, pimienta negra y brotes verdes"],
      ["Salmón", 9.5, "Salmón ahumado y crema de queso azul"],
      ["Matrimonio", 9.5, "Boquerón, anchoa y tomate", ["nuevo"]]
    ]
  },
  {
    id: "bocadillos", nombre: "Bocadillos", sub: "Y montados", origen: "casa",
    nota: "Montados: 2 € menos que el bocadillo",
    items: [
      ["Beicon y queso", 5.5], ["Chorizo", 5.5], ["Jamón a la plancha con tomate y queso", 5.5],
      ["Lomo, tomate y queso", 5.5], ["Oreja", 6.5], ["Serranito", 7],
      ["El Rinconcito", 7, "Tortilla francesa, jamón a la plancha, tomate y alioli"],
      ["Pulled pork ahumado", 7.5, "Carne mechada a baja temperatura, bbq, lechuga y pepinillo"],
      ["De la abuela", 7.5, "Lechuga, tomate, atún, pechuga, beicon y huevo frito"],
      ["De la casa", 7.5, "Lechuga, tomate, beicon, pechuga empanada y barbacoa"],
      ["Calamares", 9.5]
    ]
  },
  {
    id: "sandwich", nombre: "Sándwiches", sub: "", origen: "casa",
    items: [
      ["Mixto", 5, "Jamón york y queso"],
      ["Especial", 7.5, "Jamón york, mayonesa, lechuga, tomate, atún, pechuga y huevo duro"],
      ["Siciliana", 8.5, "Mortadela siciliana, guacamole, tomate cherry, rúcula, pesto y pan rústico"]
    ]
  },
  {
    id: "ensaladas", nombre: "Ensaladas", sub: "", origen: "casa",
    items: [
      ["Tomate y mozzarella", 8.5], ["Tomate y ventresca", 9.5], ["Mixta", 9.5], ["César", 10],
      ["Mermelada de pimiento, brotes, queso de cabra y gambones", 11]
    ]
  },
  {
    id: "postres", nombre: "Postres", sub: "Tartas caseras", origen: "casa",
    nota: "Las tartas son artesanas y cambian según el día: pregunta cuáles hay.",
    items: [
      ["Tartas caseras", 5.5, "Queso y chocolate blanco, de la abuela, Lotus, pistacho, Pantera Rosa, Oreo, mango y fruta de la pasión, fresa o 3 chocolates"],
      ["Culan", 5.5, "Chocolate, chocolate blanco o pistacho"], ["Bizcochada", 5.5], ["Natillas", 5.5],
      ["Tiramisú", 5.5], ["Arroz con leche", 5.5], ["Helado", 5.5, "Vainilla, Lotus o turrón"],
      ["Crepes, tortitas y gofres", 3.5, "Chocolate, chocolate blanco, Kinder, pistacho, Lotus, caramelo o fresa"],
      ["Croissant premium", 3.5, "Chocolate, chocolate blanco, Kinder, pistacho, Lotus, caramelo o fresa"],
      ["Miguelitos", 2]
    ]
  },
  {
    id: "bebidas", nombre: "Bebidas y cafés", sub: "", origen: "casa",
    items: [
      ["Café solo, americano o cortado", 1.3], ["Café con leche", 1.5], ["Infusiones", 1.5],
      ["Refrescos", 2.5], ["Zumos", 2.5], ["Agua 0,5 l", 1.5], ["Agua 1,5 l", 3],
      ["Tinto de verano", 3], ["Tinto casero", 4], ["Tinto de verano de la casa", 5],
      ["Estrella Galicia", "1,50 / 2,50"], ["Mahou Verde (caña/copa)", 2.5], ["Mahou Verde", 2.7],
      ["Mahou 5 Estrellas", 2.5], ["Cerveza sin alcohol", 2.5], ["Tostada 0,0", 2.5],
      ["Alhambra", 3], ["Corona", 3], ["Radler", 2.5]
    ]
  }
];

/* Posavasos de "En la barra": una selección por categoría. */
window.POSAVASOS = [
  { id: "smash", titulo: "Smash", origen: "ciudad", carta: "smash", forma: "redondo", desde: 8,
    dorso: "Doble carne aplastada en la plancha hasta que cruje: lotus, trufa, pistacho o volcán de queso." },
  { id: "raciones", titulo: "Raciones", origen: "casa", carta: "raciones", forma: "cuadrado", desde: 2.5,
    dorso: "Torreznos, oreja, croquetas, calamares, pulpo… las de toda la vida, para compartir." },
  { id: "burgers", titulo: "Burgers", origen: "ciudad", carta: "burgers", forma: "redondo", desde: 8,
    dorso: "De la de siempre a la Black Golden, con pan brioche negro y oro comestible." },
  { id: "tartas", titulo: "Tartas caseras", origen: "casa", carta: "postres", forma: "redondo", desde: 5.5,
    dorso: "Lotus, pistacho, Pantera Rosa, 3 chocolates… hechas aquí. Pregunta cuáles hay hoy." },
  { id: "pollo", titulo: "Pollo crujiente", origen: "ciudad", carta: "amantes", forma: "cuadrado", desde: 9,
    dorso: "Kentucky en cono, fingers, crunchy combo con tres salsas y la Crispy Royale." },
  { id: "tostas", titulo: "Tostas", origen: "casa", carta: "tostas", forma: "redondo", desde: 8,
    dorso: "Matrimonio, salmón, boquerón… y bocadillos de los de antes, como El Rinconcito." },
  { id: "desayunos", titulo: "Desayunos", origen: "casa", carta: "bebidas", forma: "cuadrado", desde: null,
    dorso: "Desde las 9:00: café, tostadas, croissants premium, crepes y gofres." }
];
