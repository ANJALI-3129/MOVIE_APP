const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL;

//   Movie Categories

const MOVIE_ENDPOINTS = {
  popular: {
    path: "/movie/popular",
    pages: 3,
    mediaType: "movie",
  },

  trending: {
    path: "/trending/all/week",
    pages: 1,
    mediaType: null,
  },

  tv: {
    path: "/tv/popular",
    pages: 3,
    mediaType: "tv",
  },

  topRated: {
    path: "/movie/top_rated",
    pages: 3,
    mediaType: "movie",
  },
  india: {
    path: "/discover/movie?with_origin_country=IN&sort_by=popularity.desc",
    pages: 3,
    mediaType: "movie",
  },

  upcoming: {
    path: "/movie/upcoming",
    pages: 3,
    mediaType: "movie",
  },

  hollywood: {
    path: "/discover/movie?with_original_language=en&sort_by=vote_average.desc&vote_count.gte=500",
    pages: 3,
    mediaType: "movie",
  },

  bollywood: {
    path: "/discover/movie?with_original_language=hi&sort_by=popularity.desc",
    pages: 3,
    mediaType: "movie",
  },
};

//  Helper Functions

export const formatMovie = (movie, genreMap, defaultMediaType) => ({
  id: movie.id,

  mediaType: movie.media_type || defaultMediaType,

  title: movie.title || movie.name,

  name: movie.name,

  plot: movie.overview,

  rating: movie.vote_average ? movie.vote_average.toFixed(1) : "N/A",
  releaseDate: movie.release_date || movie.first_air_date || "",
  poster: movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500",

  backdrop: movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null,

  genres: movie.genres
    ? movie.genres.map((genre) => genre.name)
    : movie.genre_ids?.map((id) => genreMap[id] || "Unknown") || [],

  isInCart: false,
});

const fetchMovies = async (endpoint, genreMap, pages, mediaType) => {
  const movies = [];

  for (let page = 1; page <= pages; page++) {
    const separator = endpoint.includes("?") ? "&" : "?";

    const response = await fetch(
      `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}&page=${page}`,
    );

    const data = await response.json();

    movies.push(
      ...data.results.map((movie) => formatMovie(movie, genreMap, mediaType)),
    );
  }

  // Remove duplicate movies
  return Array.from(new Map(movies.map((movie) => [movie.id, movie])).values());
};

//  Public APIs

export const getMoviesByCategory = async (category, genreMap) => {
  const config = MOVIE_ENDPOINTS[category];

  if (!config) {
    throw new Error(`Invalid category: ${category}`);
  }

  return fetchMovies(config.path, genreMap, config.pages, config.mediaType);
};

export const getGenres = async () => {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`,
  );

  const data = await response.json();

  const genreMap = {};

  data.genres.forEach((genre) => {
    genreMap[genre.id] = genre.name;
  });

  return genreMap;
};

export const getMovieDetails = async (type, id) => {
  const response = await fetch(
    `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&append_to_response=credits,videos`,
  );

  return await response.json();
};
export const searchMovies = async (query) => {
  if (!query.trim()) return [];

  const response = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
  );

  const data = await response.json();

  return data.results
    .filter(
      (item) =>
        (item.media_type === "movie" || item.media_type === "tv") &&
        (item.poster_path || item.backdrop_path),
    )
    .map((item) => ({
      ...formatMovie(item, {}, item.media_type),
      releaseDate: item.release_date || item.first_air_date,
    }));
};

export const getHorizontalMovies = async (endpoint) => {
  const separator = endpoint.includes("?") ? "&" : "?";

  const response = await fetch(
    `${BASE_URL}/${endpoint}${separator}api_key=${API_KEY}`,
  );

  const data = await response.json();

  return data.results
    .slice(0, 10)
    .map((movie) => formatMovie(movie, {}, movie.media_type || "movie"));
};

export const getWatchProviders = async (type, id) => {
  const response = await fetch(
    `${BASE_URL}/${type}/${id}/watch/providers?api_key=${API_KEY}`,
  );

  return await response.json();
};
