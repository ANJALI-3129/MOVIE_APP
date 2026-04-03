import { Component } from "react";
import MovieList from "./movieList";
// import { movies } from "./movieData";
import Navbar from "./navbar";
import "./index.css";

const API_KEY = "644ccadadcacdab7824000208e60f417";
class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      cartCount: 0,
      LikeCount: 0,
    };
  }
  // to fetch movies through APIS
  componentDidMount() {
    this.fetchMovies();
    this.fetchGenres();
  }

  genreMap = {}; // Global in your component

  fetchGenres = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
    );
    const data = await res.json();
    data.genres.forEach((g) => {
      this.genreMap[g.id] = g.name;
    });
  };

  fetchMovies = async () => {
    const allMovies = [];

    for (let page = 1; page <= 3; page++) {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
      );
      const data = await res.json();
      const formatted = data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        plot: movie.overview,
        price: Math.floor(Math.random() * 200) + 100,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        rating: movie.vote_average.toFixed(1),
        stars: 0,
        fav: false,
        isInCart: false,
        genres: movie.genre_ids.map((id) => this.genreMap[id] || "Unknown"),
      }));
      allMovies.push(...formatted);
    }

    this.setState({ movies: allMovies });
  };

  addStars = (movie) => {
    const { movies } = this.state;
    const mid = movies.indexOf(movie);
    if (movies[mid].stars >= 5) return;
    movies[mid].stars += 0.5;
    this.setState({ movies });
  };

  decStars = (movie) => {
    const { movies } = this.state;
    const mid = movies.indexOf(movie);
    if (movies[mid].stars <= 0) return;
    movies[mid].stars -= 0.5;
    this.setState({ movies });
  };

  handleFav = (movie) => {
    let { movies, LikeCount } = this.state;
    const mid = movies.indexOf(movie);
    movies[mid].fav = !movies[mid].fav;
    this.setState({ movies });
    if (movies[mid].fav) {
      LikeCount += 1;
    } else {
      LikeCount -= 1;
    }
    this.setState({ movies, LikeCount });
    console.log(LikeCount);
  };

  handleAddToCart = (movie) => {
    let { movies, cartCount } = this.state;
    const mid = movies.indexOf(movie);
    movies[mid].isInCart = !movies[mid].isInCart;
    // Update cart count correctly
    if (movies[mid].isInCart) {
      cartCount += 1;
    } else {
      cartCount -= 1;
    }
    this.setState({ movies, cartCount });
  };

  render() {
    const { movies } = this.state;
    return (
      <>
        <Navbar
          cartCount={this.state.cartCount}
          LikeCount={this.state.LikeCount}
        />

        <MovieList
          movies={movies}
          addStars={this.addStars}
          decStars={this.decStars}
          toggleFav={this.handleFav}
          toggleCart={this.handleAddToCart}
        />
      </>
    );
  }
}

export default App;
