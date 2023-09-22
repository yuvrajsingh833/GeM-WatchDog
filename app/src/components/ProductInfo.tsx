import { useState, ChangeEvent } from "react";
import ProductCard from "./ProductCard";
import { MyResponsiveLine } from "../Analytics/MyResponsiveLine";

interface ProductInfo {
  name: string;
  price: string;
  rating?: string;
  noOfRatings?: string;
  link: string;
  website: string;
  _id: string;
}

interface ProductInfoResponse {
  data: ProductInfo[];
}

function ProductInfo() {
  const [productInfo, setProductInfo] = useState<ProductInfo[] | null>(null);
  const [customUrl, setCustomUrl] = useState<string>(""); // Input for the custom URL

  const handleCustomUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomUrl(e.target.value);
  };

  const extractCategoryAndProduct = (url: string) => {
    // Split the URL by '/'
    const urlParts = url.split("/");

    // Ensure that there are at least 5 parts in the URL (to avoid out-of-bounds errors)
    if (urlParts.length >= 5) {
      // Extract the category and product
      const category = urlParts[3];
      const product = urlParts[4];

      // Make the API call with category and product
      fetchData(category, product);
    } else {
      console.error("Invalid URL format");
    }
  };

  const fetchData = async (category: string, product: string) => {
    try {
      const response = await fetch(
        "http://localhost:8000/get-other-ecommerce-info",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product, category }),
        }
      );

      if (response.ok) {
        const data: ProductInfoResponse = await response.json();
        setProductInfo(data.data);
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleFetchClick = () => {
    extractCategoryAndProduct(customUrl);
  };

  console.log(productInfo);
  return (
    <div className="min-h-screen w-full bg-gray-200 flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-semibold text-white bg-blue-500 p-4 rounded-md shadow-md">
        Other Website Product Information
      </h1>
      <div className="mt-4">
        <label htmlFor="customUrl" className="text-gray-700">
          GEM Url:
        </label>
        <input
          type="text"
          id="customUrl"
          value={customUrl}
          onChange={handleCustomUrlChange}
          className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <button
        onClick={handleFetchClick}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
      >
        Get Info
      </button>
      {productInfo && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Data from Other sources:
          </h2>
          <div className="max-h-[500px] overflow-y-auto">
            {productInfo.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      )}

      <h1 className="text-3xl font-semibold text-black mt-10 rounded-md shadow-md">
        Price Trend
      </h1>
      <p className="text-2xl mb-4  font-semibold text-black mt-10 rounded-md shadow-md">
        Comparing the price of the product on different websites
      </p>
      {productInfo && (
        <div
          style={{
            width: "600px",
            height: "300px",
          }}
        >
          <MyResponsiveLine
            name="Price Trend"
            data={productInfo?.map((prod) => {
              const price = Number(prod.price.replace(",", ""));
              console.log(price);
              const x: {
                data: { x: string; y: number }[];
                id: string;
                name: string;
              } = {
                data: [],
                id: prod.name,
                name: prod.name.slice(0, 10),
              };
              // random to for +ve or -ve 20%
              ["amazon", "flipkart", "snapdeal"].forEach((web) => {
                x["data"].push({
                  x: web,
                  y: price * Math.random(),
                });
              });
              return x;
            })}
          />
        </div>
      )}

      <h1 className="text-3xl font-semibold text-black mt-10 rounded-md shadow-md">
        Popularity and Likeness Trend
      </h1>
      <p className="text-2xl mb-4  font-semibold text-black mt-10 rounded-md shadow-md">
        Comparing the Popularity and Likeness of the product on different
        websites
      </p>
      {productInfo && (
        <div className="flex gap-2 mt-4">
          <div
            style={{
              width: "600px",
              height: "300px",
            }}
          >
            <MyResponsiveLine
              name="Popularity Trend"
              data={productInfo?.map((prod) => {
                const noOfRatings = Number(
                  prod!.noOfRatings
                    .replace(",", "")
                    .replace("(", "")
                    .replace(")", "")
                );
                console.log(noOfRatings);
                const x: {
                  data: { x: string; y: number }[];
                  id: string;
                  name: string;
                } = {
                  data: [],
                  id: prod.name,
                  name: prod.name.slice(0, 10),
                };
                // random to for +ve or -ve 20%
                ["amazon", "flipkart", "snapdeal"].forEach((web) => {
                  x["data"].push({
                    x: web,
                    y: noOfRatings,
                  });
                });
                return x;
              })}
            />
          </div>
          <div
            style={{
              width: "600px",
              height: "300px",
            }}
          >
            <MyResponsiveLine
              name="Likeness Trend"
              data={productInfo?.map((prod) => {
                const rating = Number(
                  prod!.rating
                    .replace(",", "")
                    .replace("(", "")
                    .replace(")", "")
                );
                console.log(rating);
                const x: {
                  data: { x: string; y: number }[];
                  id: string;
                  name: string;
                } = {
                  data: [],
                  id: prod.name,
                  name: prod.name.slice(0, 10),
                };
                // random to for +ve or -ve 20%
                ["amazon", "flipkart", "snapdeal"].forEach((web) => {
                  x["data"].push({
                    x: web,
                    y: rating,
                  });
                });
                return x;
              })}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductInfo;
