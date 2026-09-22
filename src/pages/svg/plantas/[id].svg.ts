import { PLANT_VIEW_BOX, plantSceneMarkup } from '../../../art/plantScene';
import { plants } from '../../../data/plants';
import { svgFile } from '../../../utils/svgFile';

export function getStaticPaths() {
  return plants.map((plant) => ({ params: { id: plant.id }, props: { plant } }));
}

export function GET({ props }: { props: { plant: (typeof plants)[number] } }) {
  const { plant } = props;
  return svgFile({
    viewBox: PLANT_VIEW_BOX,
    width: 400,
    height: 480,
    title: `${plant.commonName} (${plant.scientificName}), en tierra`,
    description: plant.summary,
    markup: plantSceneMarkup(plant.id, 'ground'),
  });
}
