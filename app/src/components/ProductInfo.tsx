import { useState, ChangeEvent } from 'react';
import ProductCard from './ProductCard';

interface ProductInfo {
  name: string;
  price: string;
  rating?: string;
  noOfRatings?: string;
  url: string;
  website: string;
  _id: string;
}

interface ProductInfoResponse {
  data: ProductInfo[];
}

function ProductInfo() {
  const [productInfo, setProductInfo] = useState<ProductInfo[] | null>(null);
  const [customUrl, setCustomUrl] = useState<string>(''); // Input for the custom URL

  const handleCustomUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomUrl(e.target.value);
  };

  const extractCategoryAndProduct = (url: string) => {
    // Split the URL by '/'
    const urlParts = url.split('/');

    // Ensure that there are at least 5 parts in the URL (to avoid out-of-bounds errors)
    if (urlParts.length >= 5) {
      // Extract the category and product
      const category = urlParts[3];
      const product = urlParts[4];

      // Make the API call with category and product
      fetchData(category, product);
    } else {
      console.error('Invalid URL format');
    }
  };

  const fetchData = async (category: string, product: string) => {
    try {
      const response = await fetch('http://localhost:8000/get-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product, category }),
      });

      if (response.ok) {
        const data: ProductInfoResponse = await response.json();
        setProductInfo(data.data);
      } else {
        console.error('Error fetching data');
      }
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleFetchClick = () => {
    extractCategoryAndProduct(customUrl);
  };

  return (
    <div>
      <h1>Product Information</h1>
      <div>
        <label htmlFor="customUrl">Custom URL:</label>
        <input
          type="text"
          id="customUrl"
          value={customUrl}
          onChange={handleCustomUrlChange}
        />
      </div>
      <button onClick={handleFetchClick}>Get Info</button>
      {productInfo && (
        <div>
          <h2>Data from API:</h2>
          <div className="product-list">
            {productInfo.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductInfo;
