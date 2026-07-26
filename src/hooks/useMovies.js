import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { getGenres, getMoviesByCategory, formatMovie } from "../API/api";

import { syncMovies, updateCart } from "../services/firebaseService";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL;

const useMovies = () => {
  const { user, setCartCount } = useAuth();
  const navigate = useNavigate();
  const genreMapRef = useRef({});

  // Home page movies
  const [movies, setMovies] = useState([]);

  // Watchlist page movies
  const [watchlist, setWatchlist] = useState([]);

  const [loading, setLoading] = useState(true);
  const [watchlistLoading, setWatchlistLoading] = useState(false);

  const [background, setBackground] = useState("");
  const [categories, setCategories] = useState("popular");

  const loadGenres = async () => {
    if (Object.keys(genreMapRef.current).length === 0) {
      genreMapRef.current = await getGenres();
    }
  };

  const loadMovies = useCallback(async () => {
    setLoading(true);

    try {
      await loadGenres();

      const fetchedMovies = await getMoviesByCategory(
        categories,
        genreMapRef.current,
      );

      const syncedMovies = await syncMovies(fetchedMovies, user?.uid);

      setMovies(syncedMovies);

      if (syncedMovies.length > 0) {
        const randomMovie =
          syncedMovies[Math.floor(Math.random() * syncedMovies.length)];

        setBackground(randomMovie.backdrop);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [categories, user]);

  const loadWatchlist = useCallback(async () => {
    if (!user) {
      setWatchlist([]);
      return;
    }

    setWatchlistLoading(true);

    try {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        setWatchlist([]);
        return;
      }

      const cart = snap.data().cart || [];

      const promises = cart.map(async (id) => {
        const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);

        if (!res.ok) return null;

        const movie = await res.json();

        return {
          ...formatMovie(movie, {}, "movie"),
          isInCart: true,
        };
      });

      const data = (await Promise.all(promises)).filter(Boolean);

      setWatchlist(data);
      setCartCount(data.length);
    } catch (err) {
      console.error(err);
    } finally {
      setWatchlistLoading(false);
    }
  }, [user, setCartCount]);

  const toggleCart = async (movie) => {
    if (!user) {
      alert("Please login to add movies to your Watchlist.");
      navigate("/login");
      return;
    }

    try {
      const isAdding = !movie.isInCart;

      const updatedCart = await updateCart(user.uid, movie.id, isAdding);

      setCartCount(updatedCart.length);

      // Update Home Page
      setMovies((prev) => {
        const exists = prev.some((m) => m.id === movie.id);

        if (exists) {
          return prev.map((m) =>
            m.id === movie.id ? { ...m, isInCart: isAdding } : m,
          );
        }

        return [
          ...prev,
          {
            ...movie,
            isInCart: isAdding,
          },
        ];
      });

      // Refresh Watchlist
      await loadWatchlist();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  useEffect(() => {
    loadWatchlist();
  }, [loadWatchlist]);

  return {
    movies,
    setMovies,

    watchlist,
    watchlistLoading,

    loading,
    background,
    setBackground,

    categories,
    setCategories,

    loadMovies,
    loadWatchlist,

    toggleCart,
  };
};

export default useMovies;
