import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./login.css"

import {auth} from "./../../firebase"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";



const Login = ({background}) => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName]= useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword]=useState("");
const [error , setErrors]= useState({});

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const newError = {};
   if (isSignup) {
  if (!name.trim())newError.name="Full Name required";
  if (!email.trim()) newError.email="Email iss required";

  if (!password.trim()) newError.password="Password is required";
  if ( !confirmPassword.trim()) {newError.confirmPassword="Confirm Password is required"}

else if (password!==confirmPassword){
  newError.confirmPassword="Password & confirmPassword should match";
}
}else {

    if (!email.trim()) {
      newError.email = "Email is required";
    }

    if (!password) {
      newError.password = "Password is required";
    }
}
  if (Object.keys(newError).length > 0) {
    setErrors(newError);
    return;
  }

  setErrors({});
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(
          auth,
          email,
          password, 
    

         
        );
      } else {
        await signInWithEmailAndPassword(
          auth,
          email,
          password,
        
        );
      }

      navigate("/"); // redirect after login

    } catch (err) {
    setErrors({
      firebase:err.message,
    })
    }
   
  ;
  };

 
  return (
    <div className="login-page" style={{
        backgroundImage: `url(${background})`,
      }}
>
      
      <div className="login-card">

        <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>
     
        {isSignup && (
          <>
  <input
    type="text"
    placeholder="Full Name"
    value={name}
    onChange={(e) => {
    setName(e.target.value);
    setErrors({ ...error, name: "" });
  }}
  />

{error.name &&(
   <p className="error">{error.name}</p>
)}
  </>
)}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors({ ...error, email:""});
          }}
          
        />
        {error.email && (
  <p className="error">{error.email}</p>
)}
   
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {setPassword(e.target.value)
        setErrors({ ...error, password:""});
        }}

        />
{error.password&&(
  <p className="error">{error.password}</p>
)}
        {isSignup && (
          <>
  <input
    type="password"
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={(e) => {setConfirmPassword(e.target.value)
      setErrors({ ...error, confirmPassword:""});
    }}
  />

  {error.confirmPassword && (
  <p className="error">
    {error.confirmPassword}
  </p>
)}

</>
)}

        <button onClick={handleSubmit}>
          {isSignup ? "Signup" : "Login"}
        </button>

        <p>
          {isSignup
            ? "Already have an account?"
            : "Don't have an account?"}
          <span
            onClick={() => {setIsSignup(!isSignup)
              setName("");
              setEmail("");
              setPassword("");
              setConfirmPassword("");
              setErrors("");

            }}
          >
            {isSignup ? " Login" : " Signup"}
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;