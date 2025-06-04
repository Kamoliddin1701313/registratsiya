import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import googleIcon from "./google-brand.png";
import style from "./registration.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
const Registration = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    // const { name, value } = e.target;
    setRegister((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/register/",
        register

        // {
        //   username: register.username,
        //   email: register.email,
        //   password: register.password,
        //   password2: register.password2,
        // }
      );
      if (response.status == 201) {
        alert(response.data.msg);
        console.log("Server javobi:", response);
        navigate("/login");
      }
    } catch (error) {
      console.log("POST xatolik:", error);
    }
  };

  console.log(register, "register");

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google bilan login bo‘ldi ✅", user);
      alert(`Xush kelibsiz, ${user.displayName}`);
    } catch (error) {
      console.error("Google bilan login qilishda xatolik ❌", error);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.link_page}>
        <NavLink
          style={({ isActive }) =>
            isActive
              ? { color: "white", backgroundColor: "#2BA3D5" }
              : { color: "black", backgroundColor: "white" }
          }
          to="/login"
        >
          Kirish
        </NavLink>

        <NavLink
          style={({ isActive }) =>
            isActive
              ? { color: "white", backgroundColor: "#2BA3D5" }
              : { color: "black", backgroundColor: "white" }
          }
          to="/registration"
        >
          Registratsiya
        </NavLink>
      </div>

      <h1>Ro'yxatdan o'ting!</h1>

      <form onSubmit={handleSubmit} className={style["form-validation"]}>
        <input
          type="text"
          required
          name="username"
          value={register?.username}
          onChange={handleChange}
          placeholder="Foydalanuvchi nomi"
        />

        <input
          type="text"
          required
          name="email"
          value={register?.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          type="text"
          required
          name="password"
          value={register?.password}
          onChange={handleChange}
          placeholder="Parol"
        />

        <input
          type="text"
          required
          name="password2"
          value={register?.password2}
          onChange={handleChange}
          placeholder="Parolni tasdiqlash"
        />

        <button type="submit">Registratsiyadan o'tish</button>
      </form>

      <div className={style["google-account"]}>
        <h2>Google orqali ro'yxatdan o'ting</h2>
        <button onClick={handleGoogleRegister}>
          <img src={googleIcon} alt="google icon" />
          <span>Google orqali ro'yxatdan o'tish</span>
        </button>
      </div>
    </div>
  );
};

export default Registration;
