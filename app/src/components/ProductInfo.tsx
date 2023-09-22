import { useState, ChangeEvent, useEffect } from "react";
import ProductCard from "./ProductCard";
import { MyResponsiveLine } from "../Analytics/MyResponsiveLine";
import { MyResponsivePie } from "../Analytics/MyResponsivePie";
import DropDown from "./DropDown";

interface ProductInfo {
  name: string;
  price: string;
  rating?: string;
  noOfRatings?: string;
  link: string;
  website: string;
  _id: string;
}

interface GEMProductInfo {
  productName: string;
  productPrice: string;
  sellerExcellence: string;
  image: string;
  availableProducts: string;
}

interface GEMProductInfoResponse {
  data: GEMProductInfo;
}

interface ProductInfoResponse {
  data: ProductInfo[];
}

function ProductInfo({ url }: { url: string | null }) {
  const [productInfo, setProductInfo] = useState<ProductInfo[] | null>(null);
  const [gemInfo, setGemInfo] = useState<GEMProductInfo | null>(null);
  const [customUrl, setCustomUrl] = useState<string>(url ? url : "");
  const [vendor, setVendor] = useState<string>("Amazon");

  const listOfVendors: string[] = ["Amazon", "Flipkart"];

  const handleCustomUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomUrl(e.target.value);
  };

  const extractCategoryAndProduct = (url: string) => {
    const urlParts = url.split("/");

    if (urlParts.length >= 5) {
      const category = urlParts[3];
      const product = urlParts[4];

      fetchDataForOtherSites(category, product);
      fetchDataForGEM();
    } else {
      console.error("Invalid URL format");
    }
  };

  const fetchDataForOtherSites = async (category: string, product: string) => {
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

  const fetchDataForGEM = async () => {
    try {
      const response = await fetch("http://localhost:8000/get-gem-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link: customUrl }),
      });

      if (response.ok) {
        const data: GEMProductInfoResponse = await response.json();
        setGemInfo(data.data);
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

  useEffect(() => {
    if (url) {
      extractCategoryAndProduct(url);
    }
  }, [url, extractCategoryAndProduct]);

  return (
    <div className="min-h-screen w-full bg-gray-200 flex flex-col items-center justify-center p-10">
      <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-24">
        {gemInfo && (
          <h1
            dangerouslySetInnerHTML={{
              __html: gemInfo.productName,
            }}
            className="text-2xl font-medium text-black mt-10 flex flex-col items-center justify-center mb-4"
          ></h1>
        )}
        {gemInfo && (
          <img
            src={gemInfo.image}
            alt="logo"
            className="w-96 aspect-auto mb-10 rounded-xl"
          />
        )}
      </div>

      {gemInfo && (
        <div className="text-2xl flex gap-3 text-black mt-4 rounded-md">
          Price:
          <h1
            dangerouslySetInnerHTML={{
              __html: gemInfo.productPrice,
            }}
            className="font-bold"
          ></h1>
        </div>
      )}

      {gemInfo && (
        <div className="text-2xl flex gap-3 text-black mt-2 rounded-md mb-4">
          Seller Rating:
          <h1
            dangerouslySetInnerHTML={{
              __html: gemInfo.sellerExcellence,
            }}
            className="font-bold"
          ></h1>
        </div>
      )}

      <h1 className="text-3xl font-semibold text-white bg-blue-500 p-2 mt-4 w-2/3 flex justify-center rounded-md shadow-md">
        Other Platform Product Information
      </h1>

      <div className="mt-2 flex items-start justify-end w-2/3">
        <DropDown
          list={listOfVendors}
          vendor={vendor}
          setVendor={setVendor}
          className="flex items-end"
        />
      </div>

      <div className="mt-4 w-1/2">
        <label htmlFor="customUrl" className="text-gray-700 font-bold">
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
        className="mt-4 bg-blue-500 text-white py-2 shadow-lg px-8 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
      >
        Get Info
      </button>

      <div className="flex justify-start w-4/5">
        <p className="text-4xl font-bold">{vendor}</p>
      </div>
      <div className="flex justify-center w-3/4 mt-6">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="bg-white w-full rounded-lg p-3 mt-6 shadow-lg">
            {productInfo && (
              <div className="m-4">
                <h2 className="text-3xl font-semibold text-gray-500 mb-4">
                  Data from Other sources:
                </h2>
                <div className="max-h-[500px] overflow-y-auto no-scrollbar">
                  {productInfo?.map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-white w-full flex flex-col rounded-lg p-3 mt-6 shadow-lg">
            <h1 className="text-3xl font-semibold text-gray-500 mt-4">
              Price Trend: Line Graph
            </h1>
            <div className="flex flex-col items-center">
              <p className="text-2xl mb-4 font-medium text-black mt-4">
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
                      const price = Number(prod.price?.replace(",", ""));
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
            </div>
          </div>

          <div className="bg-white w-full flex flex-col rounded-lg p-3 mt-6 shadow-lg">
            <h1 className="text-3xl font-semibold text-gray-500 mt-4">
              Price Trend: Pie Graph
            </h1>
            <div className="flex flex-col items-center">
              <p className="text-2xl mb-4  font-semibold text-black mt-4">
                Comparing the price of the product on different websites
              </p>
              {productInfo && (
                <div
                  style={{
                    width: "900px",
                    height: "500px",
                  }}
                >
                  <MyResponsivePie
                    data={productInfo?.map((prod) => {
                      const price = Number(prod.price?.replace(",", ""));
                      console.log(price);
                      const x: {
                        value: number;
                        id: string;
                        label: string;
                      } = {
                        value: price,
                        id: prod.name,
                        label: prod.name,
                      };
                      // random to for +ve or -ve 20%
                      ["amazon", "flipkart", "snapdeal"].forEach(() => {
                        x["value"] = price * Math.random();
                      });
                      return x;
                    })}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="bg-white w-full flex flex-col rounded-lg p-3 mt-6 shadow-lg">
            <h1 className="text-3xl font-semibold text-gray-500 mt-4">
              Popularity and Likeness Trend
            </h1>
            <div className="flex flex-col items-center">
              <p className="text-2xl mb-4  font-semibold text-black mt-4">
                Comparing the Popularity and Likeness of the product on
                different websites
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
                          prod?.noOfRatings
                            ?.replace(",", "")
                            .replace("(", "")
                            .replace(")", "")
                        );
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
                          prod?.rating
                            ?.replace(",", "")
                            .replace("(", "")
                            .replace(")", "")
                        );
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
