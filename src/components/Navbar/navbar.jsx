
import "./navbar.css";

import SearchBar from "../searchBar/searchBar";

import { auth } from "../../firebase";

import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const Navbar = ({ cartCount, user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
  };

  const getInitials = (email) => {
    if (!email) return "U";
    return email.slice(0, 2).toUpperCase();
  };


  return (
    <div className="nav">
      <div className="head">

        <div className="logo" onClick={() => navigate("/")}>
          Movix
        </div>

        <SearchBar />

        <div className="right-section">

     
         <div
  className="cart-icon"
  onClick={() => navigate("/watchlist")}
>
  <i className="fa-solid fa-bookmark"></i>
  <span className="cart-count">{cartCount}</span>
</div>

    
          {!user ? (
            <button onClick={() => navigate("/login")}>
              Login
            </button>
          ) : (
            <div className="user-section">

              <button onClick={handleLogout}>
                Logout
              </button>

              <div className="avatar">
                {getInitials(user.email)}
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;