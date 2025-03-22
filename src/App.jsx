import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import React, { Suspense, lazy } from "react";
import Loader from "./pages/Loader/Loader"; // Import the updated Loader Component
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";

// Lazy-load components
const Home = lazy(() => import("./pages/Home"));
const RealEstate = lazy(() => import("./pages/RealEstate"));
const Promotion_Marketing = lazy(() => import("./pages/Promotion_Marketing"));
const Listings = lazy(() => import("./pages/Listings"));
const Contacts = lazy(() => import("./pages/Contacts"));
const SignIn = lazy(() => import("./Components/SignIn/SignIn"));
const Admin_edit = lazy(() => import("./pages/Admin_edit"));

function App() {
  return (
    <div className="w-full lg:w-[90%] h-auto m-auto bg-bg max-w-screen-xl">
      <Router>
        <Navbar />
        <Suspense fallback={<Loader />}> {/* Show loader while the components load */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contacts />} />
            <Route path="/real-estate" element={<RealEstate />} />
            <Route path="/promotion-marketing" element={<Promotion_Marketing />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/admin/signin" element={<SignIn />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin/edit" element={<Admin_edit />} />
            </Route>
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
