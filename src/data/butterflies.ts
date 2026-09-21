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
    scientificName: 'Phoebis sennae',
    family: 'Piéridos',
    wingspan: '5 a 6,5 cm',
    season: 'Primavera a otoño',
    summary: 'Un relámpago amarillo limón que cruza la ciudad volando alto y rápido.',
    appearance:
      'El macho es amarillo limón, liso y brillante. La hembra puede ser amarilla o blanquecina, con puntitos oscuros en el borde y una mancha en el ala delantera. Con las alas cerradas parece una hoja amarillenta.',
    caterpillar:
      'Verde amarillenta, con una franja lateral amarilla y puntitos oscuros. Las que comen flores del sen se vuelven amarillas. La crisálida es curva y puntiaguda, verde o rosada.',
    behavior:
      'Es gran voladora y migradora. Prefiere flores tubulares de colores cálidos, a las que llega con su larga espiritrompa.',
    hostPlantId: 'sen-del-campo',
    otherHostPlants: 'Otras Senna nativas, como la pichana (Senna aphylla).',
    favoriteNectarIds: ['lantana', 'salvia-azul', 'chinita'],
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
    hostPlantId: 'bandera-espanola',
    otherHostPlants: 'Yerba de la víbora o plumerillo (Asclepias mellodora), tasi (Araujia) y otras asclepias.',
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
    hostPlantId: 'violeta',
    otherHostPlants: 'Lino silvestre (Linum), mburucuyá (Passiflora) y verdolagas (Portulaca).',
    favoriteNectarIds: ['verbena', 'margarita-punzo', 'vara-de-oro'],
  },
  {
    id: 'cenicienta',
    commonName: 'Cenicienta',
    scientificName: 'Leptotes cassius',
    family: 'Licénidos',
    wingspan: '2 a 3 cm',
    season: 'Primavera a otoño',
    summary: 'Diminuta y delicada: cabe en una uña y por arriba es azul lila.',
    appearance:
      'El macho es azul lilacino por arriba; la hembra, blanquecina con azul en la base. Por debajo es blanca con bandas grisáceas atigradas y dos ocelos negros con brillo metálico cerca del borde.',
    caterpillar:
      'Pequeña y aplanada, verde o rojiza, muy bien camuflada entre los pimpollos. Suele estar acompañada por hormigas, que la cuidan a cambio de una gotita azucarada.',
    behavior: 'Vuela bajo y a los saltitos alrededor del jazmín del cielo. Se junta a beber en el barro húmedo.',
    hostPlantId: 'jazmin-del-cielo',
    otherHostPlants: 'Plumbago nativo (Plumbago scandens) y leguminosas como las crotalarias.',
    favoriteNectarIds: ['margarita-punzo', 'lantana', 'carqueja'],
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
    hostPlantId: 'ruellia',
    otherHostPlants: 'Verbenas, lantana, llantén y boquita de campo (Agalinis).',
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
    favoriteNectarIds: ['chilca', 'verbena', 'azahar-del-monte'],
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
    hostPlantId: 'malvavisco',
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
