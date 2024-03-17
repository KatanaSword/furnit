import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
const Wishlist = React.lazy(() => import("./pages/Wishlist"));
const Checkout = React.lazy(() => import("./pages/Checkout"));
const Shop = React.lazy(() => import("./pages/Shop"));
const Homepage = React.lazy(() => import("./pages/Homepage"));
const Cart = React.lazy(() => import("./pages/Cart"));
const Aboutus = React.lazy(() => import("./pages/Aboutus"));
const Contactus = React.lazy(() => import("./pages/Contactus"));
const Team = React.lazy(() => import("./pages/Team"));
const DetailReview = React.lazy(() => import("./pages/DetailReview"));
const ShopDetailDescription = React.lazy(
  () => import("./pages/ShopDetailDescription")
);
const SignUp = React.lazy(() => import("./pages/SignUp"));
const LogIn = React.lazy(() => import("./pages/LogIn"));
const UserProfile = React.lazy(() => import("./pages/UserProfile"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));
const Order = React.lazy(() => import("./pages/Order"));
const ProjectRoutes = () => {
  return (
    <React.Suspense
      fallback={
        <div className="h-screen flex justify-center items-center">
          <h1>Loading...</h1>
        </div>
      }
    >
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/shop" element={<Shop />} />
          <Route
            path="/shopdetaildescription"
            element={<ShopDetailDescription />}
          />
          <Route path="/detailreview" element={<DetailReview />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order" element={<Order />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/aboutus" element={<Aboutus />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
