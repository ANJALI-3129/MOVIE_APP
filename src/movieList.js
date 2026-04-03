import MovieCard from "./movieCard";
function MovieList(props) {
  const { movies, addStars, decStars, toggleFav, toggleCart } = props;
  return (
    <>
      {movies.map((movie) => (
        <MovieCard
          movies={movie}
          addStars={addStars}
          decStars={decStars}
          toggleCart={toggleCart}
          toggleFav={toggleFav}
          key={movie.id}
        />
      ))}
    </>
  );
}

export default MovieList;
