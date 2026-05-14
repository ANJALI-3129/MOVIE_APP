import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Watchlist from "./pages/watchlist/watchlist";
import Navbar from "./components/Navbar/navbar";
import MovieList from "./components/movielist/movieList";
import Loader from "./components/Loader/loader";
import MovieDetails from "./pages/movieDetails/movieDetails";
import Login from "./pages/login/login";
import { db, auth } from "./firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { getGenres, getPopularMovies } from "./API/api";

import "./index.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const genreMapRef = useRef({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await loadUserData(firebaseUser.uid);
      } else {
        setUser(null);
        setCartCount(0);
      }

      await init(firebaseUser);
    });

    return () => unsubscribe();
  });

  const loadUserData = async (uid) => {
    try {
      const ref = doc(db, "users", uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setCartCount(snap.data().cart?.length || 0);
      } else {
        await setDoc(ref, { cart: [] });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const syncMovies = async (movies, firebaseUser) => {
    if (!firebaseUser) return movies;

    try {
      const ref = doc(db, "users", firebaseUser.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) return movies;

      const { cart = [] } = snap.data();

      return movies.map((m) => ({
        ...m,
        isInCart: cart.includes(m.id),
      }));
    } catch (err) {
      console.error(err);
      return movies;
    }
  };

  const init = async (firebaseUser) => {
    try {
      genreMapRef.current = await getGenres();

      const fetchedMovies = await getPopularMovies(genreMapRef.current);

      const synced = await syncMovies(fetchedMovies, firebaseUser);

      setMovies(synced);
      setLoading(false);
    } catch (err) {
      console.error("Init Error:", err);
      setLoading(false);
    }
  };

  const handleAddToCart = async (movie) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    let cart = snap.data()?.cart || [];

    const updated = movies.map((m) =>
      m.id === movie.id ? { ...m, isInCart: !m.isInCart } : m,
    );

    const updatedMovie = updated.find((m) => m.id === movie.id);

    if (updatedMovie.isInCart) {
      cart.push(movie.id);
    } else {
      cart = cart.filter((id) => id !== movie.id);
    }

    await updateDoc(ref, { cart });

    setMovies(updated);
    setCartCount(cart.length);
  };

  return (
    <>
      <Navbar cartCount={cartCount} user={user} />

      <Routes>
        <Route
          path="/"
          element={
            loading ? (
              <Loader />
            ) : (
              <MovieList movies={movies} toggleCart={handleAddToCart} />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/tv/:id" element={<MovieDetails />} />
        <Route
          path="/watchlist"
          element={
            <Watchlist cartCount={cartCount} setCartCount={setCartCount} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
