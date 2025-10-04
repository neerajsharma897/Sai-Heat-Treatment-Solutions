// List of images placed under public/Website gallery
// Build encoded public URLs so filenames with spaces/parentheses work reliably

export const galleryFolder = 'Website gallery';

export const galleryFiles: string[] = [
  '2013914162633.jpg',
  '28042013023.jpg',
  '2014710210418.jpg',
  '2014710210436.jpg',
  '28042013024.jpg',
  '20141231065331.jpg',
  '2014203100828.jpg',
  '2014323183828.jpg',
  '2014331191449.jpg',
  '2014331191509.jpg',
  '2014331191548.jpg',
  '2014503225611.jpg',
  '01082007178.jpg',
  '2013914162724.jpg',
  '03082007182.jpg',
  '16072007068.jpg',
  '2014710210020.jpg',
  '20150413085947.jpg',
  '20150413131448.jpg',
  '20150414084912.jpg',
  '27062012004.jpg',
  '27062012005.jpg',
  '27062012012.jpg',
  '28042013020.jpg',
  '28042013022.jpg',
  '31072007156.jpg',
  'Image(275).jpg',
  'Image(276).jpg',
  'Image(328).jpg',
  'IMG-20160614-WA0002.jpg',
  'IMG-20160614-WA0003.jpg',
  'IMG-20160614-WA0004.jpg',
  'IMG-20160614-WA0005.jpg',
  'IMG_0007.JPG',
  'IMG_0066.JPG',
  'IMG_0071.JPG',
  'IMG_20160403_020811.jpg',
  'IMG_20160406_175521.jpg',
  'WhatsApp Image 2022-10-20 at 12.51.46 PM.jpeg',
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
