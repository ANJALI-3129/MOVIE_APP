import "./watchlist.css";
import MovieCard from "../../components/moviecard/movieCard";
import { useMovie } from "../../context/movieContext";

const Watchlist = () => {
  const {
    watchlist,
    watchlistLoading,
  } = useMovie();

  if (watchlistLoading) {
    return <h2 className="status">Loading...</h2>;
  }

  return (
    <div className="watchlist-page">
      <h1>Your Watchlist</h1>

      {watchlist.length === 0 ? (
        <p className="status">No movies added yet.</p>
      ) : (
        <div className="watchlist-grid">
          {watchlist.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;