import { Routes, Route } from "react-router-dom";
import { Button } from "./components/ui/button";
import AuthLayout from "./components/auth/Layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminProduct from "./pages/admin-view/products";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shoping-view/layout";
import NotFound from "./pages/not-found";
import ShoppngIndex from "./pages/shopping-view";
import Shoppincheckout from "./pages/shopping-view/checkout";
import ShoppingListing from "./pages/shopping-view/ShoppingListing";
import ShoppingAcccount from "./pages/shopping-view/acccount";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import AdminCategory from "./pages/admin-view/Category";
import AdminSubCategory from "./pages/admin-view/subcategory";
import ProductDetailTile from "./pages/shopping-view/ProductDetailTile";
import ShoppingAcccountAddress from "./pages/admin-view/ShoppingAcccountAddress";

function App() {
  const isAthonticated = true;
  const user = {
    name: "ajay",
    role: "user",
  };

  return (
    <div className="flex flex-col overview-hidden bh-white ">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAthonticated={isAthonticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProduct />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="category" element={<AdminCategory />} />
          <Route path="subcategory" element={<AdminSubCategory />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAthonticated={isAthonticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="product/:id" element={<ProductDetailTile/>}/>
          <Route path="home" element={<ShoppngIndex />} />
          <Route path="checkout" element={<Shoppincheckout />} />
          
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="account" element={<ShoppingAccount />}>
            <Route path="address" element={<ShoppingAcccountAddress />} />
          </Route>

        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/unauthpage" element={<UnauthPage />} />
      </Routes>
    </div>
  );
}

export default App;
