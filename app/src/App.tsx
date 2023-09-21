import { MyResponsiveLine } from "./Analytics/MyResponsiveLine";
import ProductInfo from "./components/ProductInfo";
import { data } from "./components/productData";

function App() {
  
  return (
    <>
      <h1>Gem vs Amazon</h1>
      <ProductInfo />
      <div style={{height: 400, width: 800}}>
        <MyResponsiveLine data={data} />
      </div>
    </>
  );
}

export default App;
