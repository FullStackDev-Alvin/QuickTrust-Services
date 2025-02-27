import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./pages/Home";
import Footer from "./Components/Footer/Footer";
import RealEstate from "./pages/RealEstate";
import Promotion_Marketing from "./pages/Promotion_Marketing";
import Listings from "./pages/Listings";
import Contacts from "./pages/Contacts";
import SignIn from "./Components/SignIn/SignIn";
import Admin_edit from "./pages/Admin_edit";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";

function App() {
  return (
    <div class="w-full lg:w-[90%] h-auto m-auto bg-bg max-w-screen-xl">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/contact" element={<Contacts/>} />
          <Route path="/real-estate" element={<RealEstate/>} />
          <Route path="/promotion-marketing" element={<Promotion_Marketing/>} />
          <Route path="/listings" element={<Listings/>} />
          <Route path="/admin/signin" element={<SignIn/>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/edit" element={<Admin_edit/>} />
          </Route>
        </Routes>
        <Footer/>
      </Router>    
    </div>
  );
}

export default App;
