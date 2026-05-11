import "./movieCard.css";
import { useNavigate } from "react-router-dom";

function MovieCard({ movies, toggleCart }) {
  
  const navigate = useNavigate();

  const {
    title,
    name,
    plot,
    rating,
    isInCart,
    poster,
    genres,
    id,
  } = movies;

 
  const movieName = title || name;

  return (
    <div className="main">
      <div className="movie-card-container">
        
        <div className="movie-card">

       
          <div className="left">
            <img
              alt={movieName}
              src={poster}
              className="movie-poster"
            />
          </div>

          <div className="right">

            <div className="movie-title">
              {movieName}
            </div>

            <div className="movie-genres">
             Genre: {genres?.join(" • ")}
            </div>

            <div className="movie-rating">
              Rating:  {rating}
            </div>

            <div className="movie-plot">
              {plot}
            </div>

            <div className="movie-actions">

              <button
                className="details-btn"
                onClick={() => navigate(`/movie/${id}`)}
              >
                View Details
              </button>

              <button
                className={
                  isInCart
                    ? "remove-watchlist-btn"
                    : "watchlist-btn"
                }
                onClick={() => toggleCart(movies)}
              >
                {isInCart
                  ? "Remove Watchlist"
                  : "Add Watchlist"}
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default MovieCard;