const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

if (!CLOUD_NAME) {
  throw new Error("Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME");
}

export function cldVideo(
  publicId: string,
  transforms = "q_auto,f_auto,w_1280"
) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${transforms}/${publicId}.mp4`;
}
