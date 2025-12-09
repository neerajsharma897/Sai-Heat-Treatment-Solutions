// List of images placed under public/Website gallery
// Build encoded public URLs so filenames with spaces/parentheses work reliably

export const galleryFolder = 'Website gallery';

export const galleryFiles: string[] = [
  "IMG_001.jpg",
  "IMG_002.jpg",
  "IMG_003.jpg",
  "IMG_004.jpg",
  "IMG_005.jpg",
  "IMG_006.jpg",
  "IMG_007.jpg",
  "IMG_008.jpg",
  "IMG_009.jpg",
  "IMG_010.jpg",
  "IMG_011.jpg",
  "IMG_012.jpg",
  "IMG_013.jpg",
  "IMG_014.jpg",
  "IMG_015.jpg",
  "IMG_016.jpg",
  "IMG_017.jpg",
  "IMG_018.jpg",
  "IMG_019.jpg",
  "IMG_020.jpg",
  "IMG_021.jpg",
  "IMG_022.JPG",
  "IMG_023.JPG",
  "IMG_024.JPG",
  "IMG_025.jpg",
  "IMG_026.jpg",
  "IMG_027.jpeg",
  "IMG_028.jpeg",
  "IMG_029.jpeg",
  "IMG_030.jpeg",
  "IMG_031.jpeg",
  "IMG_032.jpeg",
  "IMG_033.jpeg",
  "IMG_034.jpeg",
];

export const toPublicUrl = (file: string) =>
  '/' + [galleryFolder, file].map(encodeURIComponent).join('/');

export type GalleryImage = {
  src: string;
  alt: string;
};

export const galleryImages: GalleryImage[] = galleryFiles.map((f) => ({
  src: toPublicUrl(f),
  alt: f,
}));
