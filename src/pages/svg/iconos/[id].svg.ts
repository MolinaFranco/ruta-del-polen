import { POLLINATOR_VIEW_BOX, pollinatorIcons } from '../../../art/pollinatorIcons';
import { pollinators } from '../../../data/pollinators';
import type { PollinatorId } from '../../../data/pollinators';
import { svgFile } from '../../../utils/svgFile';

// Los archivos se nombran en castellano, para que la carpeta sea fácil de usar desde el diseño.
const fileNames: Record<PollinatorId, string> = {
  hummingbirds: 'colibries',
  butterflies: 'mariposas',
  bees: 'abejas',
  bumblebees: 'abejorros',
  others: 'otros-insectos',
};

export function getStaticPaths() {
  return Object.values(pollinators).map((pollinator) => ({ params: { id: fileNames[pollinator.id] }, props: { pollinator } }));
}

export function GET({ props }: { props: { pollinator: (typeof pollinators)[PollinatorId] } }) {
  const { pollinator } = props;
  return svgFile({
    viewBox: POLLINATOR_VIEW_BOX,
    width: 96,
    height: 96,
    title: pollinator.name,
    description: pollinator.note,
    markup: pollinatorIcons[pollinator.id],
  });
}
