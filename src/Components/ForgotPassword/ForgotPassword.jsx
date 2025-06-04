import { useNavigate } from "react-router-dom";
import style from "./forgotPassword.module.scss";
import { useRef, useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [error, setError] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);

  const [codeError, setCodeError] = useState(false);
  const [codeErrorLength, setCodeErrorLength] = useState(false);
  const [newParolError, setNewParolError] = useState(false);
  const [newParol2Error, setNewParol2Error] = useState(false);

  const navigate = useNavigate();
  const emailRef = useRef();
  const codeRef = useRef();
  const newParolRef = useRef();
  const newParol2Ref = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value.trim();
    const regEX = /^[a-zA-Z0-9._%+-]{1,}@gmail\.com$/;
    const result = regEX.test(email);

    if (email.length === 0) {
      alert("Iltimos emailingizni kiriting!");
    } else if (email.length > 45) {
      alert("Email juda uzun! va 45 tadan oshmasin ❌");
      emailRef.current.value = "";
    } else if (email.length < 11) {
      alert("Email juda qisqa! ❌");
    } else if (!result) {
      setError(true);
      alert("Email noto‘g‘ri formatda yozdingiz ❌");
    } else {
      setError(false);
      try {
        const response = await axios.post("/api/forgot-password/", {
          email: email,
        });

        if (response.status === 200 || response.status === 201) {
          alert("Parolni tiklash kodingiz emailingizga yuborildi ✅");
          setShowCodeInput(true);
          emailRef.current.disabled = true;
        } else {
          alert("Email topilmadi yoki xatolik yuz berdi");
        }
      } catch (error) {
        alert("Xatolik yuz berdi: " + error.message);
        console.log("Xatolik:", error);
      }
    }
  };

  // const handleCodeCheck = async (e) => {
  //   e.preventDefault();

  //   const enteredCode = codeRef.current.value.trim();

  //   const expectedCode = "890776";
  //   if (enteredCode.length > 0) {
  //     if (enteredCode == expectedCode) {
  //       if (newParolRef.current.value.trim().length >= 8) {
  //         if (
  //           newParolRef.current.value.trim() ==
  //           newParol2Ref.current.value.trim()
  //         ) {
  //           setNewParol2Error(false);

  //           try {
  //             const response = await axios.post("/api/set-new-password/", {
  //               verification_code: codeRef.current.value.trim(),
  //               new_password: newParolRef.current.value.trim(),
  //               confirm_password: newParol2Ref.current.value.trim(),
  //             });
  //             console.log(response, "yes");

  //             if (response.status === 200 || response.status === 201) {
  //               alert("Parolni tiklash kodingiz emailingizga yuborildi ✅");
  //             } else {
  //               alert("Email topilmadi yoki xatolik yuz berdi");
  //             }
  //           } catch (error) {
  //             alert("Xatolik yuz berdi: " + error.message);
  //             console.log("Xatolik:", error);
  //           }

  //           navigate("/login");
  //         } else {
  //           setNewParol2Error(true);
  //         }
  //         setNewParolError(false);
  //       } else {
  //         setNewParolError(true);
  //       }
  //       setCodeError(false);
  //     } else {
  //       setCodeError(true);
  //     }
  //     setCodeErrorLength(false);
  //   } else {
  //     setCodeErrorLength(true);
  //   }
  // };

  const handleCodeCheck = async (e) => {
    e.preventDefault();

    const code = codeRef.current.value.trim();
    const newPassword = newParolRef.current.value.trim();
    const confirmPassword = newParol2Ref.current.value.trim();

    if (code.length === 0) {
      setCodeErrorLength(true);
      return;
    }
    setCodeErrorLength(false);

    if (newPassword.length < 8) {
      setNewParolError(true);
      return;
    }
    setNewParolError(false);

    if (newPassword !== confirmPassword) {
      setNewParol2Error(true);
      return;
    }
    setNewParol2Error(false);

    try {
      const response = await axios.post("/api/set-new-password/", {
        verification_code: code,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      if (response.status === 200 || response.status === 201) {
        alert("Parolingiz yangilandi ✅");
        navigate("/login");
      } else {
        setCodeError(true); 
      }
    } catch (error) {
      setCodeError(true); 
      console.log("Xatolik:", error);
      alert("Xatolik yuz berdi: " + error.message);
    }
  };

  return (
    <div className={style.container}>
      {!showCodeInput ? (
        <div>
          <h1>Emailingizni kiriting</h1>

          <form onSubmit={handleSubmit} className={style["form-validation"]}>
            <input
              autoComplete="email"
              ref={emailRef}
              placeholder="Email"
              type="text"
            />
            {error && (
              <span className={style.error}>
                Email noto‘g‘ri formatda kiritilgan
              </span>
            )}
            <button type="submit">Emailingizni kiriting</button>
          </form>
        </div>
      ) : (
        <form onSubmit={handleCodeCheck} className={style["form-validation"]}>
          <h2>Parolni tiklash</h2>
          <input
            ref={codeRef}
            placeholder="Emailga kelgan kodni kiriting"
            type="text"
          />
          {codeError && (
            <span className={style.error}>Kod noto‘g‘ri kiritilgan ❌</span>
          )}

          {codeErrorLength && (
            <span className={style.error}>Emailingizdagi codni kiriting</span>
          )}

          <input
            ref={newParolRef}
            placeholder="Yangi parol kiriting"
            type="text"
          />
          {newParolError && (
            <span className={style.error}>
              Yangi kod kamida 8 tadan ko'p bo'lishi kerak
            </span>
          )}

          <input
            ref={newParol2Ref}
            placeholder="Yangi parolni qayta kiriting"
            type="text"
          />

          {newParol2Error && (
            <span className={style.error}>Parollar mos emas ❌</span>
          )}
          <button type="submit">Tasdiqlash</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
