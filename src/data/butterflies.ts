export interface Butterfly {
  id: string;
  commonName: string;
  scientificName: string;
  family: string;
  wingspan: string;
  season: string;
  summary: string;
  appearance: string;
  caterpillar: string;
  behavior: string;
  hostPlantId: string;
  otherHostPlants: string;
  favoriteNectarIds: string[];
}

// Primeras diez mariposas diurnas del listado de la ciudad de Córdoba (hasta Bataraza),
// cada una con su planta nutricia principal.
export const butterflies: Butterfly[] = [
  {
    id: 'limonera-grande',
    commonName: 'Limonera grande',
    scientificName: 'Heraclides thoas',
    family: 'Papiliónidos',
    wingspan: '8 a 11 cm',
    season: 'Primavera a otoño, en varias generaciones',
    summary: 'Una de las más grandes de la ciudad: negra, cruzada por una banda amarilla y con dos colas en las alas traseras.',
    appearance:
      'Alas negras cruzadas en diagonal por una ancha banda de manchas amarillas, que va de cerca de la punta del ala delantera hasta el centro del ala trasera. Cerca del borde tiene una hilera de medialunas amarillas, y las alas traseras terminan en dos colas en forma de cuchara con el centro amarillo. Por debajo es casi toda amarilla.',
    caterpillar:
      'Imita un excremento de pájaro: marrón oliva con manchas blancas y aspecto húmedo. Si se la molesta, asoma detrás de la cabeza unos "cuernitos" anaranjados con olor fuerte, que son inofensivos. La crisálida parece una ramita seca.',
    behavior:
      'Vuelo fuerte y veloz. Liba sin dejar de aletear y los machos se juntan a tomar agua en el barro húmedo. Por sus orugas en los naranjos, en el campo la llaman "perro de los naranjos".',
    hostPlantId: 'ruda',
    otherHostPlants: 'Limonero, naranjo, mandarino y pomelo, y árboles nativos del género Zanthoxylum, como el coco de las sierras de Córdoba.',
    favoriteNectarIds: ['lantana', 'salvia-azul', 'verbena'],
  },
  {
    id: 'bordes-de-oro',
    commonName: 'Bordes de oro',
    scientificName: 'Battus polydamas',
    family: 'Papiliónidos',
    wingspan: '8 a 10 cm',
    season: 'Primavera a otoño, en varias generaciones',
    summary: 'La más grande del barrio: negra, con una hilera de manchas doradas en el borde.',
    appearance:
      'Alas negras con reflejos verdosos y una banda de manchas amarillas cerca del borde. No tiene "colitas" como otras de su familia. Por debajo, las alas traseras llevan una hilera de medialunas rojas.',
    caterpillar:
      'Oscura, pardo rojiza, con tubérculos carnosos anaranjados. De chicas viven en grupo. Si se las molesta, asoman detrás de la cabeza un órgano naranja con olor fuerte. Guardan las toxinas de la planta y por eso los pájaros las evitan.',
    behavior: 'Liba sin dejar de aletear, como un colibrí. Las hembras recorren las medianeras buscando patitos donde desovar.',
    hostPlantId: 'patito',
    otherHostPlants: 'Otras Aristolochia, como el milhombres (Aristolochia macroura).',
    favoriteNectarIds: ['lantana', 'verbena', 'mariposera'],
  },
  {
    id: 'monarca-del-sur',
    commonName: 'Monarca del sur',
    scientificName: 'Danaus erippus',
    family: 'Ninfálidos',
    wingspan: '9 a 11 cm',
    season: 'Todo el año, más abundante en verano y otoño',
    summary: 'Nuestra monarca: prima hermana de la famosa viajera de Norteamérica.',
    appearance:
      'Naranja intenso con venas negras bien marcadas y borde negro salpicado de puntos blancos. Se separó de la monarca del norte hace unos dos millones de años; se distingue porque el borde inferior del ala delantera es naranja y no negro.',
    caterpillar:
      'Inconfundible: anillada en blanco, negro y amarillo, con dos pares de filamentos negros. La crisálida es una joya verde jade con puntos dorados.',
    behavior:
      'Vuela planeando, sin apuro: sus colores avisan a los pájaros que es tóxica. Hace desplazamientos estacionales en otoño y primavera.',
    hostPlantId: 'tasi',
    otherHostPlants: 'Yerba de la víbora (Asclepias mellodora), plumerillo (Oxypetalum) y bandera española (Asclepias curassavica).',
    favoriteNectarIds: ['lantana', 'mariposera', 'verbena'],
  },
  {
    id: 'espejito',
    commonName: 'Espejito',
    scientificName: 'Agraulis vanillae',
    family: 'Ninfálidos',
    wingspan: '6 a 7,5 cm',
    season: 'Primavera a otoño',
    summary: 'Naranja por arriba, y por abajo un vitral de manchas plateadas que espejean al sol.',
    appearance:
      'Alas alargadas de color naranja vivo con marcas negras y tres puntitos blancos rodeados de negro en el ala delantera. El reverso es castaño, con grandes manchas plateadas: de ahí su nombre.',
    caterpillar:
      'Anaranjada o gris violácea, cubierta de espinas negras ramificadas que impresionan pero son blandas e inofensivas. La crisálida imita una hoja seca retorcida.',
    behavior: 'Es de las más comunes en la ciudad: donde hay un mburucuyá, hay espejitos dando vueltas.',
    hostPlantId: 'mburucuya',
    otherHostPlants: 'Otras pasionarias (Passiflora).',
    favoriteNectarIds: ['lantana', 'chinita', 'verbena'],
  },
  {
    id: 'hortensia',
    commonName: 'Hortensia',
    scientificName: 'Euptoieta hortensia',
    family: 'Ninfálidos',
    wingspan: '4 a 6 cm',
    season: 'Primavera a otoño',
    summary: 'Leonada y veloz, vuela a media altura sobre pastizales, baldíos y senderos.',
    appearance:
      'Naranja leonado con un dibujo fino de líneas en zigzag y una hilera de puntos negros cerca del borde. El reverso es castaño jaspeado, sin manchas plateadas: así se la distingue del Espejito.',
    caterpillar: 'Rojiza, con líneas claras a lo largo y espinas negras ramificadas.',
    behavior: 'Vuelo rápido y nervioso. Le gustan los espacios abiertos y soleados, con pasto y flores silvestres.',
    hostPlantId: 'peine-de-mono',
    otherHostPlants: 'Violetas, lino silvestre, mburucuyá y verdolagas.',
    favoriteNectarIds: ['verbena', 'margarita-punzo', 'vara-de-oro'],
  },
  {
    id: 'cenicienta',
    commonName: 'Cenicienta',
    scientificName: 'Anartia jatrophae',
    family: 'Ninfálidos',
    wingspan: '4,5 a 5,5 cm',
    season: 'Primavera a otoño',
    summary: 'Blanca y nacarada, con ocelos negros y bordes anaranjados: parece espolvoreada de ceniza.',
    appearance:
      'Alas blanco nacarado cruzadas por finas líneas pardas, con el borde anaranjado y festoneado. Tiene un ocelo negro en cada ala delantera y dos en cada ala trasera, que despistan a los pájaros.',
    caterpillar: 'Negra, con hileras de puntitos plateados, espinas ramificadas y dos "cuernitos" largos en la cabeza.',
    behavior:
      'Vuela bajo y se posa con las alas abiertas. Los machos defienden un territorio de unos 15 metros alrededor de sus plantas y espantan a otros insectos. Le gustan los claros húmedos y las orillas de ríos y arroyos.',
    hostPlantId: 'cedron-del-monte',
    otherHostPlants: 'Ruellias, verbenas rastreras (Phyla), lippias y bacopa.',
    favoriteNectarIds: ['lantana', 'margarita-punzo', 'chilca'],
  },
  {
    id: 'cuatro-ojos',
    commonName: 'Cuatro ojos',
    scientificName: 'Junonia genoveva',
    family: 'Ninfálidos',
    wingspan: '4,5 a 6 cm',
    season: 'Todo el año, con grandes oleadas en verano y otoño',
    summary: 'Cuatro grandes "ojos" que miran fijo para asustar a los pájaros.',
    appearance:
      'Parda, con ocelos negros y azulados rodeados de naranja, bandas ocres y dos barritas naranjas en el ala delantera. El macho tiene reflejos azul verdosos; la hembra es más marrón.',
    caterpillar: 'Negra con espinas ramificadas, base azulada tornasolada y cabeza anaranjada.',
    behavior:
      'Vuela bajo, planeando entre aleteos, y se posa en el suelo con las alas abiertas al sol. Es migradora: algunos años pasa por la ciudad en enjambres.',
    hostPlantId: 'cedron-del-monte',
    otherHostPlants: 'Verbenas, lantana, ruellias, llantén y boquita de campo (Agalinis).',
    favoriteNectarIds: ['verbena', 'lantana', 'chilca'],
  },
  {
    id: 'dama-pintada',
    commonName: 'Dama pintada',
    scientificName: 'Vanessa braziliensis',
    family: 'Ninfálidos',
    wingspan: '4,5 a 5,5 cm',
    season: 'Todo el año',
    summary: 'Rosada y naranja, con la punta de las alas negra salpicada de blanco.',
    appearance:
      'Naranja rosado con la punta del ala delantera negra y manchas blancas. Se la reconoce por los dos ocelos grandes y azulados del ala trasera. Es la versión sudamericana de la famosa dama pintada (Vanessa cardui), que no vive en nuestra región.',
    caterpillar:
      'Oscura, con espinas y una línea clara a los costados. Vive escondida en un refugio que arma uniendo hojas con seda.',
    behavior: 'Toma sol con las alas abiertas sobre el suelo y las piedras. Muy territorial: vuelve siempre al mismo lugar.',
    hostPlantId: 'malva',
    otherHostPlants: 'Marcelas y vira-viras (Achyrocline, Gamochaeta) y cardos.',
    favoriteNectarIds: ['chilca', 'verbena', 'cedron-del-monte'],
  },
  {
    id: 'dama-manchada',
    commonName: 'Dama manchada',
    scientificName: 'Vanessa carye',
    family: 'Ninfálidos',
    wingspan: '4 a 5 cm',
    season: 'Todo el año, incluso en días soleados de invierno',
    summary: 'La mariposa de todos los días: la que ves en la plaza, en la vereda y en el cantero.',
    appearance:
      'Muy parecida a la Dama pintada, pero con una hilera de cuatro ocelos chicos de centro azul en el ala trasera, y la barra de la punta del ala delantera anaranjada en vez de blanca.',
    caterpillar: 'Oscura y espinosa. Pliega las hojas de las malvas con seda para esconderse adentro.',
    behavior:
      'Se adapta como ninguna a la ciudad. Vive desde Colombia hasta la Patagonia, y llegó incluso a la Isla de Pascua.',
    hostPlantId: 'malva-blanca',
    otherHostPlants: 'Otras malváceas, ortigas y sunchillo.',
    favoriteNectarIds: ['lantana', 'carqueja', 'margarita-punzo'],
  },
  {
    id: 'bataraza',
    commonName: 'Bataraza',
    scientificName: 'Ortilia ithra',
    family: 'Ninfálidos',
    wingspan: '3 a 4 cm',
    season: 'Primavera a otoño',
    summary: 'Pequeña y moteada como una gallina bataraza, siempre cerca del suelo.',
    appearance:
      'Pardo oscura con manchas blancas y cremas en el ala delantera y una banda clara que cruza el ala trasera, con pequeñas medialunas anaranjadas cerca del borde.',
    caterpillar: 'Oscura y espinosa, con líneas claras. Las orugas suelen comer en grupo bajo las hojas.',
    behavior: 'Vuelo bajo, lento e irregular. Le gustan los lugares frescos, los bordes de arboleda y la cercanía del agua.',
    hostPlantId: 'canario-rojo',
    otherHostPlants: 'Ruellias y justicias (otras acantáceas).',
    favoriteNectarIds: ['mariposera', 'chilca', 'margarita-punzo'],
  },
];

export function getButterfly(id: string): Butterfly {
  const butterfly = butterflies.find((candidate) => candidate.id === id);
  if (!butterfly) throw new Error(`Unknown butterfly id: ${id}`);
  return butterfly;
}
