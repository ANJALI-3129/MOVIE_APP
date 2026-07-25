import "./footer.css";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <h2>Movix</h2>
          <p>
            Discover trending movies, TV shows, upcoming releases, and your
            personalized watchlist—all in one place.
          </p>
        </div>

        <div className="footer-links">
          <h3>Explore</h3>
          <a href="/">Home</a>
          <a href="/movies/popular">Popular</a>
          <a href="/movies/trending">Trending</a>
          <a href="/movies/tv">TV Shows</a>
        </div>

        <div className="footer-links">
          <h3>Categories</h3>
          <a href="/movies/top_rated">Top Rated</a>
          <a href="/movies/upcoming">Upcoming</a>
          <a href="/watchlist">Watchlist</a>
          <a href="/login">Login</a>
        </div>

        <div className="footer-social">
          <h3>Follow Us</h3>

          <div className="social-icons">
            <a href="#">
              <FaGithub />
            </a>

            <a href="#">
              <FaLinkedin />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Movix. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;