import { IMAGE_MANIFEST } from '../data/image-manifest';

/** Supply intrinsic dimensions and let the browser choose an appropriately sized WebP. */
export function imageProps(src: string | undefined, sizes: string) {
  const image = src ? IMAGE_MANIFEST[src] : undefined;
  if (!image) return {};
  return {
    width: image.width,
    height: image.height,
    srcSet: image.candidates.map(candidate => `${candidate.src} ${candidate.width}w`).join(', '),
    sizes,
  };
}
