import imageMap from "../generated/image-map.json";

type ImageMap = Record<string, string>;

export function resolvePostImage(postId: string, image: string) {
  const map = imageMap as ImageMap;
  return map[postId] ?? image;
}
