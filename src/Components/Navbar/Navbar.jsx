import { Link, useNavigate } from "react-router-dom";
import style from "./navbar.module.scss";
const Navbar = () => {
  const navigate = useNavigate();

  const Logout = () => {
    navigate("/login");
  };
  return (
    <div className={style.container}>
      <div className={style.navbar}>
        <Link to="/">Logo</Link>

        <nav>
          <Link to="/about">Biz haqimizda</Link>
          <Link to="/services">Xizmatlar</Link>
          <Link to="/contact">Aloqa</Link>
          <Link to="/blog">Blog</Link>
        </nav>

        <button className={style.logoutBtn} onClick={Logout}>
          Hisobdan chiqish
        </button>
      </div>
    </div>
  );
};

export default Navbar;
