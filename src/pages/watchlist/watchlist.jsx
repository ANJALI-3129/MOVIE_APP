import { useEffect, useState } from "react";
import "./watchlist.css";

import { db, auth } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import MovieCard from "../../components/moviecard/movieCard";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL;

const Watchlist = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);



useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      fetchWatchlist(user);
    } else {
      setMovies([]);
      setLoading(false);
    }
  });

  return () => unsubscribe();
}, []);

const fetchWatchlist = async (user) => {
  try {
    const ref = doc(db, "users", user.uid);

    const snap = await getDoc(ref);

    const cart = snap.data()?.cart || [];

    console.log("Cart:", cart);

    const moviePromises = cart.map((id) =>
      fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
        .then((res) => res.json())
    );

    const results = await Promise.all(moviePromises);

    const formatted = results.map((movie) => ({
      id: movie.id,

      title: movie.title,

      plot: movie.overview,

      rating: movie.vote_average?.toFixed(1),

      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500",

      genres: movie.genres?.map((g) => g.name),

      isInCart: true,
    }));

    setMovies(formatted);

  } catch (err) {
    console.error("Watchlist Error:", err);
  } finally {
    setLoading(false);
  }
};
  

  if (loading) return <h2 className="status">Loading...</h2>;

  return (
    <div className="watchlist-page">

      <h1>Your Watchlist</h1>

      {movies.length === 0 ? (
        <p className="status">No movies added yet</p>
      ) : (
        <div className="watchlist-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movies={movie}
              toggleCart={() => {}}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default Watchlist;