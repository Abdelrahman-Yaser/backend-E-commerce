# E-commerce API Documentation

## Products

### Get All Products
- **GET** `/api/products`
- **Query Parameters**:
  - `category`: Filter by category (e.g., clothes, shoes, electronics)
  - `brand`: Filter by brand name
  - `minPrice`: Minimum price filter
  - `maxPrice`: Maximum price filter
  - `search`: Search term for product name, description, or brand
  - `sort`: Sorting options
    - `price-asc`: Price low to high
    - `price-desc`: Price high to low
    - `name-asc`: Name A to Z
    - `name-desc`: Name Z to A
- **Response**:
  ```json
  [
    {
      "id": 1,
      "name": "Product Name",
      "category": "electronics",
      "brand": "Brand Name",
      "price": 299.99,
      "description": "Product description",
      "stock": 50,
      "images": [
        "image-url-1",
        "image-url-2",
        "image-url-3",
        "image-url-4"
      ],
      "features": [
        "Feature 1",
        "Feature 2"
      ],
      "specifications": {
        "color": "Black",
        "size": "Medium",
        "weight": "1.5kg"
      },
      "ratings": [4, 5, 3],
      "reviews": [
        {
          "userId": 1,
          "rating": 4,
          "comment": "Great product",
          "date": "2023-11-20"
        }
      ]
    }
  ]
  ```

### Get Featured Products
- **GET** `/api/products/featured`
- Returns 8 random in-stock products
- Uses same response format as Get All Products

### Get Products by Category
- **GET** `/api/products/category/:category`
- **Parameters**:
  - `category`: Category name (clothes, shoes, food, laptops, cars, electronics)
- Returns all products in specified category
- Uses same response format as Get All Products

### Get Product by ID
- **GET** `/api/products/:id`
- **Parameters**:
  - `id`: Product ID
- **Response**: Single product object with detailed information
  ```json
  {
    "id": 1,
    "name": "Product Name",
    "category": "electronics",
    "brand": "Brand Name",
    "price": 299.99,
    "description": "Product description",
    "stock": 50,
    "images": [
      "image-url-1",
      "image-url-2",
      "image-url-3",
      "image-url-4"
    ],
    "features": [
      "Feature 1",
      "Feature 2"
    ],
    "specifications": {
      "color": "Black",
      "size": "Medium",
      "weight": "1.5kg"
    },
    "ratings": [4, 5, 3],
    "reviews": [
      {
        "userId": 1,
        "rating": 4,
        "comment": "Great product",
        "date": "2023-11-20"
      }
    ]
  }
  ```

### Get Related Products
- **GET** `/api/products/:id/related`
- **Parameters**:
  - `id`: Product ID
- Returns 4 related products from same category
- Uses same response format as Get All Products

## Product Features

### Images
- Each product includes multiple high-quality images
- Image dimensions: 800x600 pixels
- Four views per product:
  - Front view
  - Back view
  - Side view
  - Detail view

### Specifications
- Detailed product specifications vary by category
- Common specifications:
  - Color
  - Size
  - Weight
  - Material
  - Dimensions

### Ratings & Reviews
- Product ratings (1-5 stars)
- Average rating calculation
- User reviews with:
  - Rating
  - Comment
  - Date
  - User ID

### Stock Management
- Real-time stock tracking
- In-stock status
- Stock quantity

### Categories
Available product categories:
- Clothes
- Shoes
- Food
- Laptops
- Cars
- Electronics

### Sorting & Filtering
- Price range filtering
- Category filtering
- Brand filtering
- Text search across:
  - Product name
  - Description
  - Brand
- Multiple sorting options:
  - Price (ascending/descending)
  - Name (ascending/descending)