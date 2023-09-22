import React from "react";

interface ProductInfo {
  name: string;
  price: string;
  rating?: string;
  noOfRatings?: string;
  link: string;
  website: string;
  _id: string;
}

interface ProductCardProps {
  product: ProductInfo;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="h-52 bg-white border rounded-lg shadow-lg p-4 m-4">
      <h3 className="text-xl font-semibold mb-2">
        {product.name.slice(0, 100)}
      </h3>
      <p className="text-gray-600">Price: {product.price}</p>
      {product.rating && (
        <p className="text-yellow-500">Rating: {product.rating}</p>
      )}
      {product.noOfRatings && (
        <p className="text-gray-600">No. of Ratings: {product.noOfRatings}</p>
      )}
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        View on {product.website}
      </a>
    </div>
  );
};

export default ProductCard;
