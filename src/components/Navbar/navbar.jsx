import "./navbar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { useMovie } from "../../context/movieContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, cartCount } = useAuth();
  const { setCategories } = useMovie();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  };

  const handleCategory = (category) => {
    setCategories(category);
    setMenuOpen(false);
    navigate(`/movies/${category}`);
      window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  };

  const getInitials = (email) => {
    if (!email) return "U";
    return email.slice(0, 2).toUpperCase();
  };

  return (
    <nav className="nav">
      <div className="head">
        <div
          className="logo"
          onClick={() => {
            setMenuOpen(false);
            navigate("/");
          }}
        >
          Movix
        </div>

        {/* Mobile Menu */}
      

        {/* Navigation */}
        <ul className={menuOpen ? "Movie active" : "Movie"}>
          <li onClick={() => handleCategory("trending")}>
            Trending Movies
          </li>

          <li onClick={() => handleCategory("popular")}>
            Popular Movies
          </li>

          <li onClick={() => handleCategory("tv")}>
            TV Shows
          </li>
        </ul>

        <div className="right-section">
            <div
          className="menu-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </div>
          <div
            className="cart-icon"
            onClick={() => {
              setMenuOpen(false);
              navigate("/watchlist");
            }}
          >
            <i className="fa-solid fa-bookmark"></i>

            <span className="cart-count">{cartCount}</span>
          </div>

          {!user ? (
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/login");
              }}
            >
              Login
            </button>
          ) : (
            <div className="user-section">
              <button onClick={handleLogout}>Logout</button>

              <div className="avatar">
                {getInitials(user.email)}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;