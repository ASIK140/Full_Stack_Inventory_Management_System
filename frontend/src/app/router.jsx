import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "./store";
import LoginPage from "../features/auth/pages/LoginPage";
import DashboardShell from "../components/layout/DashboardShell";
import DashboardPage from "../pages/DashboardPage";
import NotFound from "../pages/NotFound";
import ProductsPage from "../features/products/pages/ProductsPage";
import CategoryPage from "../features/categories/pages/CategoryPage";
import BillingPage from "../features/billing/pages/BillingPage";

function ProtectedRoute({ children }) {
  const auth = useSelector(selectAuth);
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />
        {/* Protected Route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardShell />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="categories" element={<CategoryPage />} />
          <Route path="billing" element={<BillingPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
