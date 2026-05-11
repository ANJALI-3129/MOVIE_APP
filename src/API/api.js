// src/api/tmdb.js

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL;
// get genre
export const getGenres = async () => {
  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const data = await res.json();

  const map = {};
  data.genres.forEach((g) => {
    map[g.id] = g.name;
  });

  return map;
};
// get movies
export const getPopularMovies = async (genreMap) => {
  const allMovies = [];

  for (let page = 1; page <= 3; page++) {
    const res = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`,
    );

    const data = await res.json();

    const formatted = data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      plot: movie.overview,
      rating: movie.vote_average?.toFixed(1) || "N/A",
      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500",
      genres: movie.genre_ids.map((id) => genreMap[id] || "Unknown"),
      isInCart: false,
    }));

    allMovies.push(...formatted);
  }

  return allMovies;
};

// get details
export const getDetails = async (type, id) => {
  const res = await fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}`);

  return await res.json();
};
