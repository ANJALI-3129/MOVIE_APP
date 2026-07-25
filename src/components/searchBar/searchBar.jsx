import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./searchBar.css";
import useSearch from "../../hooks/useSearch";

const SearchBar = ({ background }) => {
  const {
    query,
    setQuery,
    results,
    setResults,
    loading,
  } = useSearch();

  const navigate = useNavigate();
  const containerRef = useRef();

  const handleClick = (movie) => {
    if (!movie?.id || !movie?.mediaType) return;

    setQuery("");
    setResults([]);

    navigate(`/${movie.mediaType}/${movie.id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && results.length > 0) {
      handleClick(results[0]);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () =>
      document.removeEventListener("mousedown", handleOutsideClick);
  }, [setResults]);

  return (
    <div
      className="search-Background"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1>Discover Your Next Favorite Movie</h1>
        <p>Search millions of Movies, TV Shows & K-Dramas</p>
      </div>

      <div className="search-container" ref={containerRef}>
        <input
          type="text"
          className="search-input"
          placeholder="Search movies, TV shows, K-dramas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {(query || loading) && (
          <div className="search-dropdown">
            {loading && (
              <p className="status">Searching...</p>
            )}

            {!loading &&
              query &&
              results.length === 0 && (
                <p className="status">
                  No results found.
                </p>
              )}

            {results.map((movie) => (
              <div
                key={`${movie.mediaType}-${movie.id}`}
                className="search-item"
                onClick={() => handleClick(movie)}
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                />

                <div className="search-info">
                  <h4>{movie.title}</h4>

                  <p>
                    {movie.mediaType === "movie"
                      ? "🎬 Movie"
                      : "📺 TV Series"}
                  </p>

                  <span>
                    {movie.releaseDate?.slice(0, 4)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;