import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import Layouts from "./Layouts/Layouts";
import Home from "./Layouts/Home/Home";
import Login from "./Components/Login/Login";
import Registration from "./Components/Registration/Registration";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import { useEffect } from "react";
import About from "./Components/About/About";
import Services from "./Components/Services/Services";

axios.defaults.baseURL = "http://register.digitallaboratory.uz/";

const App = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [token]);
  return (
    <div>
      <Routes>
        {/* <Route path="/registration" element={<Registration />} /> */}
        <Route element={<Layouts />}>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          services
        </Route>
      </Routes>
    </div>
  );
};
export default App;
