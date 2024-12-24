class Product {
  constructor({
    id,
    name,
    category,
    brand,
    price,
    description,
    stock,
    images,
    features = [],
    specifications = {},
    ratings = [],
    reviews = []
  }) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.brand = brand;
    this.price = price;
    this.description = description;
    this.stock = stock;
    this.images = images;
    this.features = features;
    this.specifications = specifications;
    this.ratings = ratings;
    this.reviews = reviews;
  }

  getAverageRating() {
    if (this.ratings.length === 0) return 0;
    return this.ratings.reduce((sum, rating) => sum + rating, 0) / this.ratings.length;
  }

  isInStock() {
    return this.stock > 0;
  }
}

module.exports = Product;