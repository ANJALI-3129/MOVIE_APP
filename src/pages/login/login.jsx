import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"

import {auth} from "./../../firebase"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) {
      return alert("Enter email & password");
    }

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      navigate("/"); // redirect after login

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSubmit}>
          {isSignup ? "Signup" : "Login"}
        </button>

        <p>
          {isSignup
            ? "Already have an account?"
            : "Don't have an account?"}
          <span
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? " Login" : " Signup"}
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;