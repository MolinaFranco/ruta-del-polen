export interface Cpc {
  id: string;
  name: string;
  address: string;
  zone: string;
  lat: number;
  lng: number;
}

// Los 14 CPC de la ciudad de Córdoba. Coordenadas tomadas de OpenStreetMap.
export const cpcs: Cpc[] = [
  { id: 'centro-america', name: 'CPC Centro América', address: 'Av. Florencio Parravicini, Bº Centro América', zone: 'Norte', lat: -31.37379, lng: -64.17554 },
  { id: 'monsenor-pablo-cabrera', name: 'CPC Monseñor Pablo Cabrera', address: 'Av. Monseñor Pablo Cabrera', zone: 'Norte', lat: -31.36115, lng: -64.20458 },
  { id: 'arguello', name: 'CPC Argüello', address: 'Av. Rafael Núñez esq. Ricardo Rojas', zone: 'Noroeste', lat: -31.34166, lng: -64.25409 },
  { id: 'colon', name: 'CPC Colón', address: 'Av. Colón 5300', zone: 'Oeste', lat: -31.39577, lng: -64.25162 },
  { id: 'ruta-20', name: 'CPC Ruta 20', address: 'Av. Fuerza Aérea 4320', zone: 'Oeste', lat: -31.43285, lng: -64.24436 },
  { id: 'villa-el-libertador', name: 'CPC Villa El Libertador', address: 'Av. Armada Argentina 1650', zone: 'Sudoeste', lat: -31.46702, lng: -64.22507 },
  { id: 'empalme', name: 'CPC Empalme', address: 'Av. Amadeo Sabattini 4560', zone: 'Sudeste', lat: -31.43836, lng: -64.12937 },
  { id: 'pueyrredon', name: 'CPC Pueyrredón', address: 'Gavilán 850', zone: 'Este', lat: -31.40328, lng: -64.15444 },
  { id: 'rancagua', name: 'CPC Rancagua', address: 'Av. Rancagua 2900, Villa Corina', zone: 'Nordeste', lat: -31.37658, lng: -64.14777 },
  { id: 'mercado-de-la-ciudad', name: 'CPC Mercado de la Ciudad', address: 'Oncativo 50, Centro', zone: 'Centro', lat: -31.40934, lng: -64.18046 },
  { id: 'guinazu', name: 'CPC Guiñazú', address: 'Bº Guiñazú', zone: 'Periferia norte', lat: -31.31246, lng: -64.17743 },
  { id: 'san-vicente', name: 'CPC Centro Cultural San Vicente', address: 'San Jerónimo 2850, San Vicente', zone: 'Centro este', lat: -31.4234, lng: -64.14783 },
  { id: 'chalet-san-felipe', name: 'CPC Chalet San Felipe', address: 'Diego de Torres 2731, José Ignacio Díaz', zone: 'Sudeste', lat: -31.44268, lng: -64.13868 },
  { id: 'jardin', name: 'CPC Jardín', address: 'Bº Jardín', zone: 'Sur', lat: -31.45814, lng: -64.16961 },
];
