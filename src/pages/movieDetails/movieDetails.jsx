import { useLocation, useParams } from "react-router-dom";
import "./movieDetails.css";
import useMovieDetails from "../../hooks/useMovieDetails";
import {useMovie } from "../../context/movieContext"
const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const type = location.pathname.includes("/tv") ? "tv" : "movie";
  const { data, providers, watchLink } = useMovieDetails(type, id);
const { movies, toggleCart } = useMovie();
  if (!data) return <h2 className="loading">Loading...</h2>;

  const title = data.title || data.name;
  const releaseDate = data.release_date || data.first_air_date;
  const duration = data.runtime || data.episode_run_time?.[0];
  const currentMovie = movies.find((m) => m.id === data.id);

const isInCart = currentMovie?.isInCart ?? false;
  const trailer = data.videos?.results?.find(
    (video) => video.type === "Trailer"
  );

  const director =
    type === "movie"
      ? data.credits?.crew?.find(
          (person) => person.job === "Director"
        )
      : null;

  const seasons = data.number_of_seasons;
  const episodes = data.number_of_episodes;

  const tagline = data.tagline;
  const status = data.status;

  const languages = data.spoken_languages
    ?.map((language) => language.english_name)
    .join(", ");

  const production = data.production_companies
    ?.map((company) => company.name)
    .slice(0, 3);

  const country = data.production_countries
    ?.map((country) => country.name)
    .join(", ");

  return (
    <div className="movie-details">
      <div
        className="movie-backdrop"
        style={{
          backgroundImage: data.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`
            : "none",
        }}
      />

      <div className="movie-overlay"></div>

      <div className="movie-content">
        <img
          className="movie-details-poster"
          src={
            data.poster_path
              ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
              : "https://via.placeholder.com/300x450"
          }
          alt={title}
        />

        <div className="movie-details-info">
          <h1 className="movie-details-title">{title}</h1>

          {tagline && (
            <h3 className="tagline">
              "{tagline}"
            </h3>
          )}

          <div className="movie-details-meta">
            <span className="movie-details-rating">
              Rating: {data.vote_average?.toFixed(1) || "N/A"}
            </span>

            <span className="movie-details-genres">
              {data.genres?.map((genre) => genre.name).join(", ")}
            </span>
          </div>

          <p>
            <strong>Release:</strong> {releaseDate || "N/A"}
          </p>

          <p>
            <strong>Status:</strong> {status || "N/A"}
          </p>

          <p>
            <strong>Duration:</strong> {duration || "N/A"} mins
          </p>

          {type === "tv" && (
            <>
              <p>
                <strong>Seasons:</strong> {seasons || "N/A"}
              </p>

              <p>
                <strong>Episodes:</strong> {episodes || "N/A"}
              </p>
            </>
          )}

          {director && (
            <p>
              <strong>Director:</strong> {director.name}
            </p>
          )}

          <p>
            <strong>Languages:</strong> {languages || "N/A"}
          </p>

          <p>
            <strong>Country:</strong> {country || "N/A"}
          </p>

          <p>
            <strong>Production:</strong>{" "}
            {production?.join(", ") || "N/A"}
          </p>

          <p className="movie-overview">
            {data.overview || "No description available."}
          </p>
<button
  className={
    isInCart
      ? "remove-watchlist-btn"
      : "watchlist-btn"
  }
  onClick={() =>
    toggleCart({
      ...data,
      mediaType: type,
      isInCart,
    })
  }
>
  {isInCart ? "Remove Watchlist" : "Add Watchlist"}
</button>
          <h3 className="section-title">Top Cast</h3>

          <div className="cast-grid">
            {data.credits?.cast?.slice(0, 10).map((cast) => (
              <div
                key={cast.id}
                className="cast-card"
              >
                <img
                  src={
                    cast.profile_path
                      ? `https://image.tmdb.org/t/p/w200${cast.profile_path}`
                      : "https://via.placeholder.com/100x140"
                  }
                  alt={cast.name}
                />

                <p>{cast.name}</p>
              </div>
            ))}
          </div>

          {providers.length > 0 && (
            <>
              <h3 className="section-title">
                Watch On
              </h3>

              <div className="platforms">
                {providers.map((provider) => (
                  <img
                    key={provider.provider_id}
                    src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`}
                    alt={provider.provider_name}
                    title={`Watch on ${provider.provider_name}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (watchLink) {
                        window.open(watchLink, "_blank");
                      }
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {trailer && (
            <div className="trailer">
              <h3 className="section-title">
                Trailer
              </h3>

              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Trailer"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;