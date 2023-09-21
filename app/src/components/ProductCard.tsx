import React from "react";

interface ProductInfo {
  name: string;
  price: string;
  rating?: string;
  noOfRatings?: string;
  url: string;
  website: string;
  _id: string;
}

interface ProductCardProps {
  product: ProductInfo;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Price: {product.price}</p>
      {product.rating && <p>Rating: {product.rating}</p>}
      {product.noOfRatings && <p>No. of Ratings: {product.noOfRatings}</p>}
      <a href={product.url} target="_blank" rel="noopener noreferrer">
        View on {product.website}
      </a>
    </div>
  );
};

export default ProductCard;
