// Utility function to generate product images
function generateProductImages(category, index) {
  const baseWidth = 800;
  const baseHeight = 600;
  
  // Generate 4 images per product with different angles/views
  return [
    `https://picsum.photos/seed/${category}-${index}-1/${baseWidth}/${baseHeight}`,
    `https://picsum.photos/seed/${category}-${index}-2/${baseWidth}/${baseHeight}`,
    `https://picsum.photos/seed/${category}-${index}-3/${baseWidth}/${baseHeight}`,
    `https://picsum.photos/seed/${category}-${index}-4/${baseWidth}/${baseHeight}`
  ];
}

module.exports = { generateProductImages };