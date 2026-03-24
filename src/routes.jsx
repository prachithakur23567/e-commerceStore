import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader"; // optional but recommended
const ProductListPage = lazy(() => import("./pages/ProductListPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));

export default function RoutesConfig() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </Suspense>
  );
}