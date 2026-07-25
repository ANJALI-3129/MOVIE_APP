import "./movieCard.css";
import { useNavigate } from "react-router-dom";
import { useMovie } from "../../context/movieContext";
const MovieCard=({ movie })=> {
  
  const navigate = useNavigate();
  const {toggleCart}= useMovie();
const {
  title,
  name,
  plot,
  rating,
  isInCart,
  poster,
  genres,
  id,
  mediaType,
} = movie;

 
  const movieName = title || name;

  return (
    <div className="main">
      <div className="movie-card-container">
        
      <div className="movie-card">
  <img
    src={poster}
    alt={movieName}
    className="movie-poster"
  />

  <div className="movie-info">
    <h2>{movieName}</h2>

    <span className="rating">⭐ {rating}</span>

    <p className="genres">
      {genres?.join(" • ")}
    </p>

    <p className="plot">
      {plot}
    </p>

    <div className="buttons">
      <button className="details-btn"
        onClick={() => navigate(`/${mediaType}/${id}`)}
      >
        View Details
      </button>

      <button
        className={
          isInCart
            ? "remove-watchlist-btn"
            : "watchlist-btn"
        }
        onClick={() => toggleCart(movie)}
      >
        {isInCart
          ? "✓ Watchlisted"
          : "+ Watchlist"}
      </button>
    </div>
  </div>
</div>
      </div>
    </div>
  );
}

export default MovieCard;