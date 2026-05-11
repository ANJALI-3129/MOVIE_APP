import MovieCard from "../moviecard/movieCard";
function MovieList(props) {
  const { movies, toggleCart } = props;
  return (
    <>
      <div className="movie-list">
        {movies.length === 0 ? (
          <div className="no-movies">No movies found</div>
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movies={movie}
            
              toggleCart={toggleCart}
            />
          ))
        )}
      </div>
    </>
  );
}

export default MovieList;
