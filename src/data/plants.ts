import type { PollinatorId } from './pollinators';

export interface GrowingGuide {
  depth: string;
  substrate: string;
  sun: string;
  watering: string;
  germination: string;
  tip: string;
}

export interface Plant {
  id: string;
  commonName: string;
  otherNames: string;
  scientificName: string;
  family: string;
  origin: string;
  habit: string;
  height: string;
  bloom: string;
  summary: string;
  balconyFit: 'ideal' | 'good' | 'large-pot';
  pollinators: PollinatorId[];
  pollinatorNote: string;
  garden: GrowingGuide;
  balcony: GrowingGuide;
}

export const balconyFitLabels: Record<Plant['balconyFit'], string> = {
  ideal: 'Ideal para balcón',
  good: 'Se adapta bien a maceta',
  'large-pot': 'Necesita maceta grande',
};

// Plantas nutricias: las que crían a las orugas de cada mariposa del catálogo.
// Una misma planta puede cumplir los dos roles: el cedrón del monte está en la lista de nectaríferas
// y además es la planta nutricia de dos mariposas (las mariposas la buscan por id en `plants`).
export const hostPlants: Plant[] = [
  {
    id: 'ruda',
    commonName: 'Ruda',
    otherNames: 'Ruda macho, ruda de jardín',
    scientificName: 'Ruta graveolens',
    family: 'Rutáceas',
    origin: 'Mediterránea, presente en casi todas las casas argentinas: es la ruda de la caña del 1.º de agosto.',
    habit: 'Subarbusto aromático',
    height: '0,5 a 0,8 m',
    bloom: 'Ramilletes de florcitas amarillas en primavera y verano',
    summary:
      'La planta de la caña con ruda también cría mariposas: la Limonera grande pone sus huevos en sus hojas azuladas, igual que en los cítricos.',
    balconyFit: 'ideal',
    pollinators: ['bees', 'others'],
    pollinatorNote: 'Sus florcitas amarillas atraen abejas y moscas de las flores.',
    garden: {
      depth: 'Con 25 a 30 cm de tierra suelta alcanza.',
      substrate: 'Pobre, pedregoso y con muy buen drenaje. En tierra muy rica se ablanda y pierde aroma.',
      sun: 'Pleno sol. Tolera media sombra.',
      watering: 'Escaso: resiste la sequía y sufre con el exceso de agua.',
      germination:
        'Sembrá en primavera a medio centímetro de profundidad; nace en 1 a 3 semanas. También se multiplica por gajos de unos 10 cm en primavera o a fin de verano.',
      tip: 'Su savia, con el sol, puede manchar y quemar la piel: podala y tocala con guantes.',
    },
    balcony: {
      depth: 'Maceta de 20 a 25 cm de profundidad (5 a 8 litros).',
      substrate: 'Sustrato universal con un tercio de arena gruesa o perlita.',
      sun: 'Al menos 5 horas de sol directo.',
      watering: 'Una o dos veces por semana en verano, cada diez días en invierno. Dejá secar entre riegos.',
      germination: 'Por semilla o, más rápido, con un plantín de vivero o un gajo.',
      tip: 'Es la forma más fácil de criar una Limonera grande en un balcón: una maceta chica alcanza. Si aparece una "caquita de pájaro" que se mueve, es su oruga.',
    },
  },
  {
    id: 'patito',
    commonName: 'Patito',
    otherNames: 'Flor de patito, milhombres',
    scientificName: 'Aristolochia fimbriata',
    family: 'Aristoloquiáceas',
    origin: 'Nativa del centro y noreste de Argentina',
    habit: 'Rastrera o trepadora baja',
    height: 'Tallos de 0,5 a 1 m',
    bloom: 'Flores en forma de pipa con flecos, de primavera a otoño',
    summary:
      'Planta rastrera de hojas acorazonadas con nervaduras plateadas y una flor insólita, con forma de patito. Es el único alimento de las orugas de la Bordes de oro.',
    balconyFit: 'ideal',
    pollinators: ['others'],
    pollinatorNote: 'La flor atrapa por unas horas a pequeñas moscas, que salen cargadas de polen.',
    garden: {
      depth: 'Con 20 a 30 cm de tierra suelta alcanza. Funciona como cubresuelo debajo de árboles y arbustos.',
      substrate: 'Liviano, rico en materia orgánica (compost, hojas) y bien drenado. No tolera el encharcamiento.',
      sun: 'Sombra o media sombra. Sol suave de la mañana.',
      watering: 'Frecuente en primavera y verano, con la tierra siempre apenas húmeda. En otoño e invierno reducilo bastante.',
      germination:
        'Usá semillas frescas. Sembrá a fines de invierno (agosto) casi en superficie, a 0,5 cm, con algo de arena. Con calor y humedad nace en 3 a 6 semanas, de forma despareja.',
      tip: 'En invierno pierde la parte aérea y rebrota desde su raíz engrosada: no la des por muerta.',
    },
    balcony: {
      depth: 'Maceta de 20 a 25 cm de profundidad, o maceta colgante para que los tallos caigan.',
      substrate: 'Sustrato liviano con compost y un puñado de perlita.',
      sun: 'Media sombra: ideal para balcones que reciben sol solo a la mañana.',
      watering: 'Mantené el sustrato húmedo en verano. En maceta se seca rápido: revisala cada dos días.',
      germination: 'Igual que en jardín. También se multiplica por gajos en primavera.',
      tip: 'Las orugas comen muchísimo: tené dos o tres plantas para que no la dejen pelada. No es comestible (contiene ácido aristolóquico).',
    },
  },
  {
    id: 'tasi',
    commonName: 'Tasi',
    otherNames: 'Doca, taso',
    scientificName: 'Araujia odorata',
    family: 'Apocináceas',
    origin: 'Nativa de Argentina (antes llamada Morrenia odorata)',
    habit: 'Enredadera',
    height: 'Guías de 3 a 5 m',
    bloom: 'Ramilletes de flores blancas y perfumadas de primavera a otoño; frutos grandes y verdes',
    summary:
      'La enredadera nativa de la Monarca del sur: sus hojas crían a las orugas y les dan las toxinas que las protegen de los pájaros. Crece sola en alambrados y cercos de toda la ciudad.',
    balconyFit: 'good',
    pollinators: ['bees', 'butterflies', 'others'],
    pollinatorNote: 'Sus flores perfumadas atraen abejas, mariposas y otros insectos, que salen de ellas cargados de polen.',
    garden: {
      depth: 'Unos 30 cm de tierra, al pie de un alambrado, cerco o pérgola donde pueda enroscarse.',
      substrate: 'Cualquiera. Es muy rústica y crece incluso en suelos pobres.',
      sun: 'Pleno sol o media sombra.',
      watering: 'Escaso. Una vez establecida casi no necesita riego.',
      germination:
        'Las semillas maduran dentro del fruto, cada una con un "plumerito" de seda. Sembralas en primavera a medio centímetro; nacen en 1 a 3 semanas. También prende de gajo.',
      tip: 'Tiene un látex blanco que irrita la piel y los ojos: lavate las manos después de manipularla.',
    },
    balcony: {
      depth: 'Maceta de 30 cm de profundidad (15 a 20 litros) con un tutor, una caña o hilos hacia la baranda.',
      substrate: 'Sustrato universal con un tercio de arena.',
      sun: 'De 4 a 6 horas de sol.',
      watering: 'Una o dos veces por semana en verano.',
      germination: 'Directo en la maceta: 2 o 3 semillas, y después dejá la plantita más fuerte.',
      tip: 'Crece rápido y en una temporada puede cubrir la baranda. Es de las mejores formas de ver monarcas desde un departamento.',
    },
  },
  {
    id: 'mburucuya',
    commonName: 'Mburucuyá',
    otherNames: 'Pasionaria, flor de la pasión',
    scientificName: 'Passiflora caerulea',
    family: 'Pasifloráceas',
    origin: 'Nativa de Argentina',
    habit: 'Trepadora con zarcillos',
    height: 'Hasta 10 m de guías',
    bloom: 'Flores blancas con corona azul y violeta, de primavera a otoño. Fruto anaranjado',
    summary:
      'La trepadora nativa más generosa: da sombra, flores espectaculares y frutos para las aves. Es la planta nutricia del Espejito y de otras mariposas anaranjadas.',
    balconyFit: 'good',
    pollinators: ['bumblebees', 'bees'],
    pollinatorNote: 'La polinizan sobre todo los mangangás (abejorros carpinteros). Sus frutos alimentan aves.',
    garden: {
      depth: 'Hoyo de 40 cm, al pie de un alambrado, reja o pérgola donde pueda trepar.',
      substrate: 'Poco exigente. Cualquier tierra con buen drenaje y algo de compost.',
      sun: 'Sol o media sombra.',
      watering: 'Medio. Regular durante el primer año; después resiste períodos secos.',
      germination:
        'Limpiá bien la pulpa de las semillas y remojalas 24 h en agua tibia. Sembrá a 1 cm en primavera. Es lenta y despareja: puede tardar de uno a varios meses. Por gajos o hijuelos de raíz es mucho más rápido.',
      tip: 'Las orugas pueden dejarla sin hojas en verano: es normal, rebrota con fuerza.',
    },
    balcony: {
      depth: 'Maceta de 40 cm de profundidad (30 litros o más) con tutor, enrejado o hilos hacia la baranda.',
      substrate: 'Sustrato universal con compost y un tercio de fibra de coco, que retiene humedad.',
      sun: 'De 4 a 6 horas de sol.',
      watering: 'Frecuente en verano (cada 2 días). Evitá el plato con agua estancada.',
      germination: 'Igual que en jardín. Si conseguís un gajo enraizado o un hijuelo, ganás una temporada.',
      tip: 'Guiá los tallos nuevos con hilo: se prenden solos con sus zarcillos y arman una cortina verde.',
    },
  },
  {
    id: 'peine-de-mono',
    commonName: 'Peine de mono',
    otherNames: 'Tripa de fraile, palomitas, trompeta',
    scientificName: 'Amphilophium cynanchoides',
    family: 'Bignoniáceas',
    origin: 'Nativa del norte y centro de Argentina (antes llamada Pithecoctenium cynanchoides)',
    habit: 'Enredadera leñosa con zarcillos',
    height: 'Guías de 4 a 6 m',
    bloom: 'Trompetas blanco crema en primavera y verano; frutos cubiertos de cerdas, como un peine',
    summary:
      'Enredadera del monte nativo con flores en forma de trompeta y frutos erizados que le dan el nombre. Sus hojas son alimento de las orugas de la Hortensia.',
    balconyFit: 'large-pot',
    pollinators: ['bees', 'bumblebees'],
    pollinatorNote: 'Sus trompetas las visitan abejas grandes y abejorros, que entran enteros a buscar el néctar.',
    garden: {
      depth: 'Hoyo de 40 cm, junto a un alambrado, una reja o un árbol donde pueda trepar con sus zarcillos.',
      substrate: 'Poco exigente; prefiere suelos sueltos y bien drenados.',
      sun: 'Pleno sol. Tolera media sombra.',
      watering: 'Escaso a medio. Resiste bien la sequía.',
      germination:
        'Las semillas tienen alas finas, como de papel celofán. Sembralas frescas en primavera, apenas cubiertas, y mantené húmedo: suelen nacer en pocas semanas. También se multiplica por acodo.',
      tip: 'Es vigorosa: guiala y podala a fin de invierno para que no tape todo el cerco.',
    },
    balcony: {
      depth: 'Maceta grande, de 40 cm de profundidad (30 litros o más), con enrejado o hilos para trepar.',
      substrate: 'Sustrato universal con compost y un tercio de arena.',
      sun: 'Al menos 6 horas de sol.',
      watering: 'Dos veces por semana en verano, sin encharcar.',
      germination: 'Igual que en jardín, directo en la maceta definitiva.',
      tip: 'Dejá los frutos secos en la planta: abiertos son muy decorativos y liberan las semillas aladas.',
    },
  },
  {
    id: 'malva',
    commonName: 'Malva',
    otherNames: 'Malva silvestre',
    scientificName: 'Malva sylvestris',
    family: 'Malváceas',
    origin: 'Europea, naturalizada en baldíos y veredas de Córdoba',
    habit: 'Herbácea bienal o perenne',
    height: '0,6 a 1,2 m',
    bloom: 'Flores lilas con venas oscuras, de primavera a otoño',
    summary:
      'Una "maleza" de vereda que vale la pena dejar crecer: entre sus hojas arman su refugio de seda las orugas de las damas. La Dama pintada también usa cardos y marcelas.',
    balconyFit: 'good',
    pollinators: ['bees', 'bumblebees'],
    pollinatorNote: 'Da mucho polen a abejas y abejorros.',
    garden: {
      depth: 'Tierra suelta y profunda: tiene raíz pivotante y no le gusta que la trasplanten.',
      substrate: 'Tierra común de jardín. No necesita abono.',
      sun: 'Sol o sol parcial.',
      watering: 'Muy moderado. Solo en sequías largas.',
      germination:
        'Siembra directa a comienzos de primavera. La semilla necesita luz: apoyala sobre la tierra y presionala apenas, sin taparla. Nace en 7 a 21 días con 18 a 22 °C.',
      tip: 'Si ves hojas plegadas y unidas con seda, adentro hay una oruga de dama. No la toques.',
    },
    balcony: {
      depth: 'Maceta de 30 cm de profundidad como mínimo, por su raíz larga.',
      substrate: 'Sustrato universal mezclado con arena para mejorar el drenaje.',
      sun: 'Ubicación soleada.',
      watering: 'Moderado. Dejá secar la superficie entre riegos.',
      germination: 'Sembrá directo en la maceta definitiva, en superficie.',
      tip: 'Cortá las flores marchitas para alargar la floración.',
    },
  },
  {
    id: 'malva-blanca',
    commonName: 'Malva blanca',
    otherNames: 'Malvavisco, malva del zorro',
    scientificName: 'Sphaeralcea bonariensis',
    family: 'Malváceas',
    origin: 'Nativa del centro de Argentina',
    habit: 'Subarbusto',
    height: '1 a 1,5 m',
    bloom: 'Flores color salmón de primavera a otoño',
    summary:
      'Mata de hojas grisáceas y aterciopeladas con flores salmón. Es planta nutricia de la Dama manchada y de varias mariposas ajedrezadas.',
    balconyFit: 'good',
    pollinators: ['bees', 'bumblebees', 'others'],
    pollinatorNote: 'La visitan abejas, abejorros y moscas de las flores.',
    garden: {
      depth: 'De 30 a 40 cm. Ideal para el rincón más seco y soleado.',
      substrate: 'Suelos pobres, arenosos e incluso salinos. Lo único que no tolera es el exceso de agua.',
      sun: 'Pleno sol.',
      watering: 'Escaso. Es una planta del monte seco.',
      germination:
        'Germina mejor con fresco, entre 15 y 20 °C: sembrá en otoño o a fines de invierno. Con más de 30 °C casi no nace. Tarda 1 a 2 semanas.',
      tip: 'Si se pone desprolija, podala a un tercio a fin de invierno y rebrota compacta.',
    },
    balcony: {
      depth: 'Maceta de 30 cm de profundidad.',
      substrate: 'Muy drenante: sustrato universal con un 30 % de arena gruesa.',
      sun: 'El lugar más soleado del balcón.',
      watering: 'Una vez por semana, y solo si el sustrato está seco. El exceso de agua es su único enemigo.',
      germination: 'Igual que en jardín, en los meses frescos. También por gajos.',
      tip: 'Perfecta para balcones calurosos y ventosos donde otras plantas sufren.',
    },
  },
  {
    id: 'canario-rojo',
    commonName: 'Canario rojo',
    otherNames: 'Ajicillo, coral del campo',
    scientificName: 'Dicliptera squarrosa',
    family: 'Acantáceas',
    origin: 'Nativa del centro y norte de Argentina',
    habit: 'Herbácea perenne',
    height: '0,5 a 1 m',
    bloom: 'Tubos rojo coral de primavera a otoño',
    summary:
      'Herbácea de flores rojas, finas y tubulares. Doble función: sus hojas crían a las orugas de la Bataraza y sus flores son de las preferidas de los colibríes.',
    balconyFit: 'ideal',
    pollinators: ['hummingbirds', 'butterflies', 'bees'],
    pollinatorNote: 'Flor roja y tubular: un imán para picaflores.',
    garden: {
      depth: 'Unos 25 a 30 cm de tierra.',
      substrate: 'Tierra común de jardín. Poco exigente.',
      sun: 'De pleno sol a media sombra. En veranos muy fuertes agradece sombra por la tarde.',
      watering: 'Medio, y abundante en los meses de calor.',
      germination:
        'Por semillas en primavera o, más fácil, por gajos: cortados en primavera enraízan rápido con sol y mucha agua.',
      tip: 'Requiere muy pocos cuidados. Podala al final del invierno para que rebrote tupida.',
    },
    balcony: {
      depth: 'Maceta de 20 a 25 cm de profundidad.',
      substrate: 'Sustrato universal con compost.',
      sun: 'Sol de mañana y sombra por la tarde es lo ideal.',
      watering: 'Frecuente en verano: no dejes que se marchite.',
      germination: 'Un gajo en una maceta chica, a la sombra y húmedo, ya es planta nueva en un mes.',
      tip: 'Ponela cerca de la baranda: los colibríes se animan a balcones altos si ven rojo.',
    },
  },
];

export const nectarPlants: Plant[] = [
  {
    id: 'salvia-azul',
    commonName: 'Salvia azul',
    otherNames: 'Salvia guaranítica',
    scientificName: 'Salvia guaranitica',
    family: 'Lamiáceas',
    origin: 'Nativa de Argentina',
    habit: 'Arbusto herbáceo',
    height: '1 a 1,5 m',
    bloom: 'Espigas azul violáceas de primavera a otoño',
    summary:
      'La flor del colibrí por excelencia: tubos azul intenso cargados de néctar durante meses. Si solo podés tener una planta para picaflores, que sea esta.',
    balconyFit: 'good',
    pollinators: ['hummingbirds', 'bumblebees', 'butterflies'],
    pollinatorNote: 'Alimenta sobre todo a colibríes. Los mangangás perforan la base de la flor para robar néctar.',
    garden: {
      depth: 'De 30 a 40 cm de tierra mullida.',
      substrate: 'Fértil y con materia orgánica. Agregá compost al plantar.',
      sun: 'Sol o media sombra.',
      watering: 'Abundante. Es de las que más agua pide en verano.',
      germination:
        'Por semillas nace en 2 a 3 semanas en primavera, pero lo más rápido es dividir la mata o hacer gajos en primavera.',
      tip: 'En invierno puede secarse la parte aérea: cortala al ras, rebrota desde la base.',
    },
    balcony: {
      depth: 'Maceta de 30 cm de profundidad (15 a 20 litros).',
      substrate: 'Sustrato universal con un tercio de compost.',
      sun: 'Sol de mañana. En balcones muy calurosos, media sombra por la tarde.',
      watering: 'Casi a diario en pleno verano. Si se cae de sed, se recupera al regarla.',
      germination: 'Conseguí un gajo o una división de mata: florece la misma temporada.',
      tip: 'Poné la maceta donde puedas mirarla desde adentro: los colibríes vuelven siempre a la misma hora.',
    },
  },
  {
    id: 'lantana',
    commonName: 'Lantana',
    otherNames: 'Camará, camará de jardín',
    scientificName: 'Lantana camara',
    family: 'Verbenáceas',
    origin: 'Nativa de Sudamérica',
    habit: 'Arbusto',
    height: '1 a 1,5 m',
    bloom: 'Cabezuelas amarillas, naranjas y rojas casi todo el año',
    summary:
      'El bar de las mariposas: flores chiquitas agrupadas en plataformas donde pueden posarse a libar. Cambian de color a medida que maduran.',
    balconyFit: 'good',
    pollinators: ['butterflies', 'hummingbirds', 'bees'],
    pollinatorNote: 'Es de las favoritas de las mariposas adultas. También cría orugas de las frotadoras.',
    garden: {
      depth: 'Hoyo de 30 a 40 cm.',
      substrate: 'Suelto y con materia orgánica, sin exceso de agua.',
      sun: 'Sol directo al menos 6 horas por día para florecer en abundancia.',
      watering: 'Moderado: solo cuando la tierra lo pida.',
      germination:
        'Quitá la pulpa del fruto maduro, remojá la semilla 24 h y sembrá a 3 mm con calor. Es lenta (4 a 8 semanas). Por gajos semileñosos es mucho más fácil.',
      tip: 'Los frutos verdes son tóxicos si se comen. Podala fuerte a fin de invierno.',
    },
    balcony: {
      depth: 'Maceta mediana a grande, de 30 cm o más, con buenos agujeros de drenaje.',
      substrate: 'Sustrato que no retenga demasiada agua: universal con perlita o arena.',
      sun: 'Pleno sol. En sombra da hojas pero no flores.',
      watering: 'Cuando la superficie esté seca. Sus raíces no soportan estar mojadas.',
      germination: 'Por gajos, en sustrato liviano, húmedo y con calor.',
      tip: 'Despuntá las ramas para que se mantenga compacta y dé más flores.',
    },
  },
  {
    id: 'verbena',
    commonName: 'Verbena',
    otherNames: 'Verbena de Buenos Aires',
    scientificName: 'Verbena bonariensis',
    family: 'Verbenáceas',
    origin: 'Nativa de Argentina',
    habit: 'Herbácea perenne',
    height: '1 a 1,5 m',
    bloom: 'Pompones lilas sobre tallos altos, de primavera a otoño',
    summary:
      'Tallos altos, finos y casi sin hojas, coronados de flores lilas que parecen flotar. Famosa en jardines de todo el mundo, y es nuestra.',
    balconyFit: 'good',
    pollinators: ['butterflies', 'bees', 'others'],
    pollinatorNote: 'Imán de mariposas y abejas. También cría orugas de la Claudina.',
    garden: {
      depth: 'Unos 25 cm de tierra.',
      substrate: 'Cualquiera con buen drenaje.',
      sun: 'Pleno sol.',
      watering: 'Escaso. Resiste heladas y sequía.',
      germination:
        'La semilla necesita luz y algo de frío: sembrá en superficie en otoño o a fines de invierno. Nace en 2 a 4 semanas.',
      tip: 'Se resiembra sola. Es transparente: plantala adelante, que deja ver lo que hay detrás.',
    },
    balcony: {
      depth: 'Maceta de 25 a 30 cm.',
      substrate: 'Sustrato universal con arena.',
      sun: 'El máximo sol posible.',
      watering: 'Una o dos veces por semana.',
      germination: 'En superficie, sin tapar la semilla, en los meses frescos.',
      tip: 'Sus tallos son altos y livianos: en balcones ventosos atala a un tutor o ubicala contra la pared.',
    },
  },
  {
    id: 'margarita-punzo',
    commonName: 'Margarita punzó',
    otherNames: 'Verbena roja',
    scientificName: 'Glandularia peruviana',
    family: 'Verbenáceas',
    origin: 'Nativa de Argentina',
    habit: 'Cubresuelo rastrero',
    height: '10 a 20 cm',
    bloom: 'Ramilletes rojo punzó de primavera a otoño',
    summary:
      'Alfombra de flores rojo intenso que cubre el suelo y cae de las macetas. Pequeña, dura y siempre en flor.',
    balconyFit: 'ideal',
    pollinators: ['butterflies', 'bees'],
    pollinatorNote: 'Muy visitada por mariposas chicas. También es hospedera de la Claudina.',
    garden: {
      depth: 'Con 15 a 20 cm alcanza. Ideal para bordes, canteros secos y entre piedras.',
      substrate: 'Suelos pobres y bien drenados.',
      sun: 'Pleno sol.',
      watering: 'Medio. Evitá el exceso.',
      germination:
        'Por semillas en primavera, o por gajos: los tallos echan raíces solos donde tocan la tierra, basta cortar y trasplantar.',
      tip: 'Un recorte liviano después de cada floración la mantiene compacta.',
    },
    balcony: {
      depth: 'Jardinera o maceta colgante de 15 a 20 cm.',
      substrate: 'Sustrato universal con arena. Sin abonos fuertes.',
      sun: 'Sol directo.',
      watering: 'Dos veces por semana en verano.',
      germination: 'Por gajos con raíz, que prenden en pocos días.',
      tip: 'Ponela en el borde de las macetas grandes: cubre la tierra y suma flores abajo.',
    },
  },
  {
    id: 'chilca',
    commonName: 'Chilca',
    otherNames: 'Chilca amarga',
    scientificName: 'Baccharis salicifolia',
    family: 'Asteráceas',
    origin: 'Nativa de Córdoba',
    habit: 'Arbusto',
    height: '2 a 3 m',
    bloom: 'Cabezuelas blancas y perfumadas, con pico en los meses frescos',
    summary:
      'El arbusto de las orillas de ríos y arroyos serranos. Florece cuando falta comida, y entonces se llena de mariposas, abejas y escarabajos.',
    balconyFit: 'large-pot',
    pollinators: ['butterflies', 'bees', 'others'],
    pollinatorNote: 'Néctar para muchísimos insectos. Es planta nutricia de la Claudina.',
    garden: {
      depth: 'Hoyo de 40 cm.',
      substrate: 'Cualquiera. Tolera suelos húmedos y también secos.',
      sun: 'Pleno sol.',
      watering: 'Escaso una vez establecida. Resiste heladas.',
      germination:
        'Semillas frescas con "plumerito": esparcilas en superficie, sin tapar, y mantené húmedo. Nacen en 1 a 3 semanas.',
      tip: 'Forma una mata globosa muy linda. Sirve como cerco vivo y refugio para aves.',
    },
    balcony: {
      depth: 'Solo en maceta muy grande: 40 a 50 cm de profundidad (40 litros).',
      substrate: 'Tierra fértil con arena.',
      sun: 'Pleno sol.',
      watering: 'Dos veces por semana.',
      germination: 'Igual que en jardín.',
      tip: 'Si tu balcón es chico, elegí carqueja: es su pariente en miniatura.',
    },
  },
  {
    id: 'carqueja',
    commonName: 'Carqueja',
    otherNames: 'Carquejilla',
    scientificName: 'Baccharis articulata',
    family: 'Asteráceas',
    origin: 'Nativa de las sierras de Córdoba',
    habit: 'Arbusto bajo',
    height: '0,5 a 1 m',
    bloom: 'Florcitas cremosas y perfumadas de fin de invierno a verano',
    summary:
      'Arbustito serrano sin hojas: sus tallos verdes y alados hacen la fotosíntesis. Una escultura viva que resiste todo y perfuma suavemente.',
    balconyFit: 'ideal',
    pollinators: ['bees', 'butterflies', 'others'],
    pollinatorNote: 'Néctar para abejas, mariposas adultas y escarabajos.',
    garden: {
      depth: 'De 25 a 30 cm. Perfecta para rocallas y canteros secos.',
      substrate: 'Pobre, pedregoso y bien drenado, como en la sierra.',
      sun: 'Sol directo.',
      watering: 'Escaso. Resiste heladas y sequía.',
      germination: 'Por semillas frescas en superficie, o por gajos en primavera.',
      tip: 'No la abones ni la riegues de más: se afloja y pierde la forma.',
    },
    balcony: {
      depth: 'Maceta de 25 a 30 cm.',
      substrate: 'Muy drenante: mitad sustrato universal, mitad arena gruesa y piedritas.',
      sun: 'El rincón más soleado.',
      watering: 'Cada 7 a 10 días.',
      germination: 'Por gajos en sustrato arenoso.',
      tip: 'Ideal para balcones altos, con viento y sol fuerte, donde casi nada más aguanta.',
    },
  },
  {
    id: 'mariposera',
    commonName: 'Mariposera',
    otherNames: 'Chilca de olor, doctorcito',
    scientificName: 'Austroeupatorium inulifolium',
    family: 'Asteráceas',
    origin: 'Nativa de Argentina',
    habit: 'Arbusto herbáceo',
    height: '1,5 m',
    bloom: 'Grandes ramilletes blancos muy perfumados en verano y otoño',
    summary:
      'Su nombre lo dice todo. Cuando florece, puede tener decenas de mariposas de distintas especies libando al mismo tiempo.',
    balconyFit: 'large-pot',
    pollinators: ['butterflies', 'bees', 'others'],
    pollinatorNote: 'La planta que más mariposas adultas convoca. También atrae abejas, moscas y escarabajos.',
    garden: {
      depth: 'Hoyo de 40 cm.',
      substrate: 'Se adapta a suelos secos y húmedos.',
      sun: 'Pleno sol.',
      watering: 'Medio.',
      germination: 'Semillas frescas en superficie a fines de invierno, o gajos en primavera.',
      tip: 'Brota en primavera y florece hacia el otoño: tenele paciencia. Podala a fin de invierno.',
    },
    balcony: {
      depth: 'Maceta de 35 a 40 cm de profundidad.',
      substrate: 'Sustrato universal con compost.',
      sun: 'Al menos 6 horas de sol.',
      watering: 'Dos o tres veces por semana en verano.',
      germination: 'Por gajos, más rápido que por semilla.',
      tip: 'Despuntala en primavera para que ramifique y quede más baja.',
    },
  },
  {
    id: 'vara-de-oro',
    commonName: 'Vara de oro',
    otherNames: 'Vara dorada, penacho amarillo',
    scientificName: 'Solidago chilensis',
    family: 'Asteráceas',
    origin: 'Nativa de Argentina',
    habit: 'Herbácea perenne con rizomas',
    height: '0,8 a 1,5 m',
    bloom: 'Plumeros amarillo oro de fines de verano a otoño',
    summary:
      'Varas erguidas que terminan en un penacho dorado. Florece al final del verano, cuando las abejas se preparan para el invierno.',
    balconyFit: 'good',
    pollinators: ['bees', 'butterflies', 'others'],
    pollinatorNote: 'Muy melífera: abejas, mariposas, escarabajos y moscas de las flores.',
    garden: {
      depth: 'Unos 30 cm. Se extiende por rizomas: dale su espacio o ponele un borde.',
      substrate: 'Poco exigente.',
      sun: 'Sol o media sombra.',
      watering: 'Escaso.',
      germination: 'Dividí los rizomas en invierno, o sembrá en superficie en primavera.',
      tip: 'Dejá las varas secas en invierno: sus semillas alimentan a las aves.',
    },
    balcony: {
      depth: 'Jardinera grande, de 30 cm de profundidad.',
      substrate: 'Sustrato universal.',
      sun: 'Sol directo.',
      watering: 'Una o dos veces por semana.',
      germination: 'Por división de rizomas.',
      tip: 'La maceta frena sus rizomas: acá no invade.',
    },
  },
  {
    id: 'chinita',
    commonName: 'Chinita del campo',
    otherNames: 'Flor de papel, zinnia silvestre',
    scientificName: 'Zinnia peruviana',
    family: 'Asteráceas',
    origin: 'Nativa de las sierras de Córdoba',
    habit: 'Herbácea anual',
    height: '0,5 a 0,9 m',
    bloom: 'Margaritas rojo anaranjadas en primavera y verano',
    summary:
      'La zinnia silvestre de nuestras sierras. Anual, rapidísima y fácil: ideal para sembrar con chicos y ver resultados en pocas semanas.',
    balconyFit: 'ideal',
    pollinators: ['butterflies', 'bees'],
    pollinatorNote: 'Una pista de aterrizaje perfecta para mariposas. Sus semillas alimentan aves.',
    garden: {
      depth: 'Unos 20 cm de tierra removida.',
      substrate: 'Tierra común. Queda muy bien en borduras y entre piedras.',
      sun: 'Pleno sol.',
      watering: 'Medio.',
      germination:
        'Siembra directa en primavera, pasadas las heladas, a 0,5 o 1 cm. Nace en 5 a 10 días y florece en unos dos meses.',
      tip: 'Dejá secar algunas flores en la planta y guardá las semillas para el año siguiente.',
    },
    balcony: {
      depth: 'Maceta de 20 cm.',
      substrate: 'Sustrato universal.',
      sun: 'Sol directo.',
      watering: 'Dos o tres veces por semana. Regá la tierra, no las hojas.',
      germination: 'Directo en la maceta, 3 o 4 semillas, y después dejá las dos plantas más fuertes.',
      tip: 'La mejor planta para empezar: del sobre de semillas a la primera mariposa en un verano.',
    },
  },
  {
    id: 'cedron-del-monte',
    commonName: 'Cedrón del monte',
    otherNames: 'Azahar del monte, palo amarillo',
    scientificName: 'Aloysia gratissima',
    family: 'Verbenáceas',
    origin: 'Nativa de las sierras y el espinal de Córdoba',
    habit: 'Arbusto',
    height: '2 a 3 m',
    bloom: 'Espigas blancas con perfume a vainilla, de primavera a otoño, después de cada lluvia',
    summary:
      'El perfume del monte cordobés. Después de cada lluvia se cubre de espigas blancas y zumba de abejas nativas. Además, sus hojas crían a las orugas de la Cuatro ojos y de la Cenicienta.',
    balconyFit: 'large-pot',
    pollinators: ['bees', 'butterflies', 'others'],
    pollinatorNote: 'Muy melífera. La visitan abejas nativas, mariposas y moscas de las flores.',
    garden: {
      depth: 'Hoyo de 40 a 50 cm.',
      substrate: 'Rústico: suelos secos, pedregosos y pobres.',
      sun: 'Pleno sol.',
      watering: 'Medio a escaso. Un riego profundo en verano dispara una floración.',
      germination: 'Por gajos semileñosos en primavera o verano, o por semillas.',
      tip: 'Florece en las puntas de las ramas: no lo podes en época de flor, sino a fin de invierno.',
    },
    balcony: {
      depth: 'Maceta grande, de 40 cm de profundidad.',
      substrate: 'Tierra fértil con un 30 % de arena.',
      sun: 'Pleno sol.',
      watering: 'Dos veces por semana en verano.',
      germination: 'Por gajos.',
      tip: 'Con una poda de formación cada invierno se mantiene en 1,2 m y perfuma todo el balcón.',
    },
  },
];

export const plants: Plant[] = [...hostPlants, ...nectarPlants];

export function getPlant(id: string): Plant {
  const plant = plants.find((candidate) => candidate.id === id);
  if (!plant) throw new Error(`Unknown plant id: ${id}`);
  return plant;
}
