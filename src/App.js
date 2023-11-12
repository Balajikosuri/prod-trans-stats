import "./App.css";
import ProductTransactions from "./components/ProductTransactions";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ProductTransactions />
    </BrowserRouter>
  );
}

export default App;
