import ProductInfo from "./components/ProductInfo";

function App() {
  const query = new URLSearchParams(window.location.search);
  const url = query.get("url");
  console.log(url);
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen h-fit bg-gray-700">
      <h1 className="text-5xl font-bold text-white mt-10 mb-10">
        Price Tracker and Visual Analytics
      </h1>
      <ProductInfo url={url} />
    </div>
  );
}

export default App;
