export type PortraitSeries =
  | 'Editorial'
  | 'Studio'
  | 'Tailored'
  | 'Monochrome'
  | 'Botanical'
  | 'Golden Hour';

export interface PortraitFrame {
  id: number;
  frameNum: string;
  src: string;
  thumbSrc: string;
  srcSet: string;
  label: string;
  series: PortraitSeries;
  alt: string;
}

const makeFrame = (
  id: number,
  label: string,
  series: PortraitSeries,
  alt: string,
): PortraitFrame => {
  const num = String(id).padStart(2, '0');
  const thumbSm = `/images/portraits/thumb-sm/udith-${num}.webp`;
  const thumb = `/images/portraits/thumb/udith-${num}.webp`;
  return {
    id,
    frameNum: num,
    src: `/images/portraits/udith-${num}.webp`,
    thumbSrc: thumb,
    srcSet: `${thumbSm} 240w, ${thumb} 320w`,
    label,
    series,
    alt,
  };
};

export const PORTRAIT_FRAMES: PortraitFrame[] = [
  makeFrame(
    1,
    'Pinstripe & Rimless Shades',
    'Editorial',
    'Udith Babu K N close-up editorial portrait in striped collared shirt, dark tie, vest, and rimless tinted sunglasses against a slate backdrop',
  ),
  makeFrame(
    2,
    'Monochrome Profile',
    'Monochrome',
    'Udith Babu K N warm monochrome side-profile portrait wearing a black mandarin-collar kurta and silver chain outdoors',
  ),
  makeFrame(
    3,
    'Monochrome Front',
    'Monochrome',
    'Udith Babu K N warm monochrome front portrait in a black buttoned kurta, silver chain, and dark sunglasses',
  ),
  makeFrame(
    4,
    'Forest & Sienna',
    'Botanical',
    'Udith Babu K N portrait wearing a textured brown striped shirt, green-dial watch, and rimless shades framed by deep green foliage',
  ),
  makeFrame(
    5,
    'Monochrome Detail',
    'Monochrome',
    'Udith Babu K N monochrome portrait adjusting rimless sunglasses in a dark kurta with silver chain bracelet',
  ),
  makeFrame(
    6,
    'Studio Espresso I',
    'Studio',
    'Udith Babu K N minimal studio portrait in an espresso brown crewneck sweater and black pleated trousers against a pale stone wall',
  ),
  makeFrame(
    7,
    'Studio Espresso II',
    'Studio',
    'Udith Babu K N studio portrait in an espresso sweater looking right with silver bracelet against a concrete wall',
  ),
  makeFrame(
    8,
    'Studio Espresso III',
    'Studio',
    'Udith Babu K N direct-gaze studio portrait in a deep brown sweatshirt and dark trousers against a light plaster wall',
  ),
  makeFrame(
    9,
    'Knit & Navy Layer',
    'Studio',
    'Udith Babu K N casual portrait wearing a striped knit beanie, navy zip hoodie, and rimless sunglasses',
  ),
  makeFrame(
    10,
    'Tailored Aubergine Blazer',
    'Tailored',
    'Udith Babu K N formal portrait in a tailored dark plum blazer with pocket brooch, white shirt, and rimless glasses',
  ),
  makeFrame(
    11,
    'Waistcoat & Blazer Drape',
    'Tailored',
    'Udith Babu K N portrait in a black waistcoat and white shirt with tailored jacket draped over the shoulder',
  ),
  makeFrame(
    12,
    'Golden Hour Denim I',
    'Golden Hour',
    'Udith Babu K N golden-hour portrait sitting in warm sunlight wearing a light denim jacket and brown corduroy pants',
  ),
  makeFrame(
    13,
    'Tailored Waistcoat',
    'Tailored',
    'Udith Babu K N formal portrait looking forward in a black waistcoat, crisp white shirt, and tailored jacket over arm',
  ),
  makeFrame(
    14,
    'Golden Hour Denim II',
    'Golden Hour',
    'Udith Babu K N sunlit golden-hour portrait in a pale denim jacket and brown corduroy trousers facing the camera',
  ),
];
