import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCSRM3bh-Htj9RpWdyGYEApeIy9hmI4gvc",
  authDomain: "registratsiya-320d5.firebaseapp.com",
  projectId: "registratsiya-320d5",
  storageBucket: "registratsiya-320d5.firebasestorage.app",
  messagingSenderId: "672152082948",
  appId: "1:672152082948:web:e40f67377960e981b8f351",
  measurementId: "G-BXT3SZN9MK",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
