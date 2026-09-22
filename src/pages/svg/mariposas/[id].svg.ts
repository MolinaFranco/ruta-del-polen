import { BUTTERFLY_VIEW_BOX, butterflyMarkup } from '../../../art/butterflyScene';
import { butterflies } from '../../../data/butterflies';
import { svgFile } from '../../../utils/svgFile';

export function getStaticPaths() {
  return butterflies.map((butterfly) => ({ params: { id: butterfly.id }, props: { butterfly } }));
}

export function GET({ props }: { props: { butterfly: (typeof butterflies)[number] } }) {
  const { butterfly } = props;
  return svgFile({
    viewBox: BUTTERFLY_VIEW_BOX,
    width: 472,
    height: 344,
    title: `${butterfly.commonName} (${butterfly.scientificName})`,
    description: butterfly.appearance,
    markup: butterflyMarkup(butterfly.id, butterfly.id),
  });
}
