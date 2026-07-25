import MovieCard from "../moviecard/movieCard";
import "./movieList.css";

const MovieList=({ movies, categories }) =>{
  const headings = {
  popular: "Most Popular Movies",
  trending: "Trending Now",
  tv: "Top TV Shows",
  top_rated: "Top Rated Movies",
  upcoming: "Upcoming Movies",

  india: "Trending in India",
    hollywood: "Explore Hollywood Movies",
    bollywood: "Explore Bollywood Movies",
};

const heading = headings[categories] ?? "Explore Movies";

console.log(movies.map((movie) => movie.id));

  return (
    <div className="movies-list-page">
      <div className="heading">
        <h2>{heading}</h2>
        <p>Discover the best entertainment picked just for you.</p>
      </div>

      <div className="movie-list-row">
        {movies.length === 0 ? (
          <div className="no-movies">No movies found</div>
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            
            />
          ))
        )}
      </div>
    </div>
  );
}

export default MovieList;