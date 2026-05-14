import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const containerRef = useRef();


  useEffect(() => {
    const delay = setTimeout(() => {
      const fetchSearch = async () => {
        try {
          if (!query.trim()) {
            setResults([]);
            return;
          }

          setLoading(true);

          const res = await fetch(
            `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`
          );

          const data = await res.json();

      
          const filtered = data.results.filter(
            (item) =>
              (item.media_type === "movie" ||
                item.media_type === "tv") &&
              (item.poster_path || item.backdrop_path)
          );

        
          const uniqueResults = filtered.filter(
            (item, index, self) =>
              index ===
              self.findIndex(
                (m) =>
                  m.id === item.id &&
                  m.media_type === item.media_type
              )
          );

          setResults(uniqueResults);
        } catch (err) {
          console.error("Search Error:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchSearch();
    }, 1000);

    return () => clearTimeout(delay);
  }, [query]);

  
  const handleClick = (item) => {
    if (!item?.id || !item?.media_type) return;

    setQuery("");
    setResults([]);

    navigate(`/${item.media_type}/${item.id}`);
  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter" && results.length > 0) {
      handleClick(results[0]); // go to first result
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
  }, []);

  return (
    <div className="search-container" ref={containerRef}>
   
      <input
        type="text"
        className="search-input"
        placeholder="Search movies, K-drama, series..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />

   
      {(query || loading) && (
        <div className="search-dropdown">
          
      
          {loading && <p className="status">Searching...</p>}

      
          {!loading && query && results.length === 0 && (
            <p className="status">No results found</p>
          )}

        
          {results.map((item) => (
            <div
              key={`${item.media_type}-${item.id}`}
              className="search-item"
              onClick={() => handleClick(item)}
            >
          
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                    : "https://via.placeholder.com/50x75?text=No+Image"
                }
                alt={item.title || item.name}
              />

         
              <div className="search-info">
                <h4>{item.title || item.name}</h4>

                <p>
                  {item.media_type === "movie"
                    ? "🎬 Movie"
                    : "📺 TV Series"}
                </p>

          
                <span>
                  {(
                    item.release_date ||
                    item.first_air_date ||
                    ""
                  ).slice(0, 4)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;