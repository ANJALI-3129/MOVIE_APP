import { Component } from "react";
import { Routes, Route } from "react-router-dom";
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

class App extends Component {
  state = {
    loading: true,
    movies: [],
    cartCount: 0,
    user: null,
  };

  genreMap = {};

  componentDidMount() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.setState({ user });
        await this.loadUserData(user.uid);
      } else {
        this.setState({ user: null, cartCount: 0 });
      }

      await this.init();
    });
  }

  init = async () => {
    try {
      this.genreMap = await getGenres();

      const movies = await getPopularMovies(this.genreMap);

      const synced = await this.syncMovies(movies);

      this.setState({
        movies: synced,
        loading: false,
      });
    } catch (err) {
      console.error("Init Error:", err);
      this.setState({ loading: false });
    }
  };

  loadUserData = async (uid) => {
    try {
      const ref = doc(db, "users", uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        this.setState({
          cartCount: snap.data().cart?.length || 0,
        });
      } else {
        await setDoc(ref, { cart: [] });
      }
    } catch (err) {
      console.error(err);
    }
  };

  syncMovies = async (movies) => {
    const { user } = this.state;
    if (!user) return movies;

    try {
      const ref = doc(db, "users", user.uid);
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

  handleAddToCart = async (movie) => {
    const { user, movies } = this.state;

    if (!user) return alert("Login first");

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

    this.setState({
      movies: updated,
      cartCount: cart.length,
    });
  };

  render() {
    const { movies, loading, cartCount, user } = this.state;

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
                <MovieList movies={movies} toggleCart={this.handleAddToCart} />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/tv/:id" element={<MovieDetails />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </>
    );
  }
}

export default App;
