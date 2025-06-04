import { useRef, useState } from "react";
import style from "./login.module.scss";
// icons
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
// icons
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [open, setOpen] = useState(false);
  const emailRef = useRef();
  const parolRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = parolRef.current.value;

    try {
      const response = await axios.post("/api/login/", {
        email,
        password,
      });
      console.log(response, "XXXX");

      if (
        response.statusText ||
        response.status == 200 ||
        response.status == 201
      ) {
        console.log(response.data);
        localStorage.setItem("accessToken", response.data?.access);

        navigate("/");
        emailRef.current.value = "";
        parolRef.current.value = "";
      }
    } catch (error) {
      alert("Parolingiz yoki emailingiz to'g'ri kelmadi");
      console.error("Login xatolik ❌", error);
    }

    console.log(
      emailRef.current.value,
      "emailRef",
      parolRef.current.value,
      "parolRef"
    );
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
              ? { color: "white", backgroundColor: "#2BA3D5 " }
              : { color: "black", backgroundColor: "white" }
          }
          to="/registration"
        >
          Registratsiya
        </NavLink>
      </div>

      <h1>Kirish</h1>
      <form onSubmit={handleSubmit} className={style["form-validation"]}>
        <input ref={emailRef} placeholder="Email" type="text" />

        <div className={style.inputBox}>
          <input
            ref={parolRef}
            placeholder="Parol"
            type={open ? "text" : "password"}
          />
          {open ? (
            <VscEyeClosed
              onClick={() => setOpen(!open)}
              className={style.icon}
            />
          ) : (
            <VscEye onClick={() => setOpen(!open)} className={style.icon} />
          )}
        </div>

        <button type="submit">Kirish</button>

        <Link to="/forgotPassword">Parolni unitdingizmi</Link>
      </form>
    </div>
  );
};
export default Login;
