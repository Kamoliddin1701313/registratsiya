import style from "./layouts.module.scss";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const Layouts = () => {
  return (
    <div className={style.container}>
      <Navbar />

      <div className={style.wrapper}>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Layouts;
