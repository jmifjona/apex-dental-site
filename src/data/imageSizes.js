// Intrinsic pixel size [width, height] of every image the pages show, for the width/height
// attributes on <img> (the browser reserves the right aspect ratio before the file arrives; CSS still
// sets the displayed size). Read from the files on 15 Oct 2026 - update an entry if an image is replaced.
export const IMAGE_SIZES = {
  '/images/A1.jpg': [1920, 1077],
  '/images/A2.jpg': [1920, 1280],
  '/images/A3.jpg': [1920, 1281],
  '/images/A4.jpg': [1920, 1480],
  '/images/AB1.jpg': [1920, 1080],
  '/images/AB2.jpg': [1920, 1080],
  '/images/AB3.jpg': [1920, 1080],
  '/images/C1.jpg': [1920, 1280],
  '/images/C2.jpg': [1920, 789],
  '/images/C3.jpg': [1920, 1280],
  '/images/C4.jpg': [1920, 789],
  '/images/COMPLIANCE.jpg': [1282, 1906],
  '/images/CT1.jpg': [1920, 1080],
  '/images/CT2.jpg': [1920, 1080],
  '/images/CT3.jpg': [905, 608],
  '/images/H1.jpg': [469, 892],
  '/images/H10.jpg': [1920, 1080],
  '/images/H2.jpg': [1920, 1080],
  // H2.jpg resized for phones and 1x screens (same photo, 74 KB instead of 162 KB); the homepage hero
  // offers both through srcset.
  '/images/H2-1280.jpg': [1280, 720],
  '/images/H3.jpg': [1920, 1080],
  '/images/H4.jpg': [1920, 1080],
  '/images/H5.jpg': [1920, 1080],
  '/images/H6.jpg': [1920, 1080],
  '/images/H7.jpg': [1920, 1082],
  '/images/H8.jpg': [905, 608],
  '/images/H9.jpg': [1920, 1440],
  '/images/I1.jpg': [1920, 1630],
  '/images/I2.jpg': [1920, 935],
  '/images/I3.jpg': [1536, 1024],
  '/images/I4.jpg': [1536, 1024],
  '/images/orislogo.png': [711, 375],
  '/images/straumann.jpg': [864, 580],
};
