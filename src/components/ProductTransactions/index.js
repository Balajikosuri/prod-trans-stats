import { Route, Routes } from "react-router-dom";
import LoginForm from "../Login";
import "./index.css";
import ProductTransactionsDashboard from "../ProductTransactionsDashboard";

function ProductTransactions() {
  return (
    <Routes>
      <Route exact path="/login" element={<LoginForm />}></Route>
      <Route exact path="/" element={<ProductTransactionsDashboard />}></Route>
    </Routes>
  );
}

export default ProductTransactions;
