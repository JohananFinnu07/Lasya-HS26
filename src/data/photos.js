// Any images you drop in src/assets/photos are picked up automatically,
// sorted by file name: lasya-1.jpg, lasya-2.jpg, ...
// The FIRST image is used as the full-screen cover photo.
const modules = import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
})

export const found = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, url]) => url)
