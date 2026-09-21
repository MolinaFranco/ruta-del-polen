export type PollinatorId = 'hummingbirds' | 'butterflies' | 'bees' | 'bumblebees' | 'others';

export interface Pollinator {
  id: PollinatorId;
  name: string;
  note: string;
}

export const pollinators: Record<PollinatorId, Pollinator> = {
  hummingbirds: { id: 'hummingbirds', name: 'Colibríes', note: 'Buscan flores tubulares, rojas o azules, con mucho néctar.' },
  butterflies: { id: 'butterflies', name: 'Mariposas', note: 'Prefieren flores chicas agrupadas donde posarse a libar.' },
  bees: { id: 'bees', name: 'Abejas nativas', note: 'Juntan polen y néctar; muchas son solitarias y no pican.' },
  bumblebees: { id: 'bumblebees', name: 'Abejorros', note: 'Mangangás y abejorros hacen vibrar la flor para soltar el polen.' },
  others: { id: 'others', name: 'Otros insectos', note: 'Moscas de las flores, escarabajos y avispas que también polinizan.' },
};
