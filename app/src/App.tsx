import ProductInfo from "./components/ProductInfo";

function App() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen h-fit bg-gray-700">
      <h1 className="text-5xl font-bold text-white mt-10 mb-10">
        Price Tracker and Visual Analytics
      </h1>
      <ProductInfo />
    </div>
  );
}

export default App;
