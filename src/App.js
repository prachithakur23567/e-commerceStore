import { BrowserRouter } from "react-router-dom";
import RoutesConfig from "./routes";
import { ProductProvider } from "./context/ProductContext";

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <RoutesConfig />
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;