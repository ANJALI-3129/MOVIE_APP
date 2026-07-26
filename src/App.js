// import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Watchlist from "./pages/watchlist/watchlist";
import Navbar from "./components/Navbar/navbar";
import Home from "./pages/homepage/home";
import Loader from "./components/Loader/loader";
import MovieDetails from "./pages/movieDetails/movieDetails";
import Login from "./pages/login/login";
import MoviePage from "./pages/movies/moviepage";
import Footer from "./components/footer/footer";

// import { auth } from "./firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import {
//   getGenres,
//   getPopularMovies,
//   getTrendingMovies,
//   getTVShows,
// } from "./API/api";
import "./index.css";
import ProtectedRoute from "./components/protectedroute/protectedRoute";
import { useMovie } from "./context/movieContext";
const App = () => {
  // const [cartCount, setCartCount] = useState(0);
  // const [user, setUser] = useState(null);

  const { movies, loading, background, setCategories } = useMovie();
  // const { user, cartCount, setCartCount } = useAuth();
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
  //     if (firebaseUser) {
  //       setUser(firebaseUser);
  //       const cart = await loadUserData(firebaseUser.uid);
  //       setCartCount(cart.length);
  //     } else {
  //       setUser(null);
  //       setCartCount(0);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);

  // useEffect(() => {
  //   loadMovies(user);
  // }, [categories, user]);

  // const loadGenres = async () => {
  //   if (Object.keys(genreMapRef.current).length === 0) {
  //     genreMapRef.current = await getGenres();
  //   }
  // };
  // const categoryAPI = {
  //   popular: getPopularMovies,
  //   trending: getTrendingMovies,
  //   tv: getTVShows,
  // };
  // // const loadMovies = async (firebaseUser) => {
  //   setLoading(true);

  //   try {
  //     await loadGenres();

  //     const fetchedMovies = await categoryAPI[categories](genreMapRef.current);

  //     const syncedMovies = await syncMovies(fetchedMovies, firebaseUser?.uid);

  //     setMovies(syncedMovies);

  //     if (syncedMovies.length) {
  //       const randomIndex = Math.floor(Math.random() * syncedMovies.length);

  //       setBackground(syncedMovies[randomIndex].backdrop);
  //     }
  //   } catch (err) {
  //     console.error("Failed to load movies:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleAddToCart = async (movie) => {
  //   if (!user) {
  //     navigate("/login");

  //     return;
  //   }
  //   const isAdding = !movie.isInCart;
  //   const updatedMovies = movies.map((m) =>
  //     m.id === movie.id ? { ...m, isInCart: isAdding } : m,
  //   );
  //   const cart = await updateCart(user.uid, movie.id, isAdding);

  //   setMovies(updatedMovies);

  //   setCartCount(cart.length);
  // };
  return (
    <>
      <Navbar setCategories={setCategories} />

      <Routes>
        <Route
          path="/"
          element={
            loading ? (
              <Loader />
            ) : (
              <Home
                movies={movies}
                background={background}
                setCategories={setCategories}
              />
            )
          }
        />
        <Route path="/login" element={<Login background={background} />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/tv/:id" element={<MovieDetails />} />
        <Route
          path="/movies/:category"
          element={
            <MoviePage /*toggleCart={handleAddToCart} categories={categories}*/
            />
          }
        />
        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <Watchlist />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
