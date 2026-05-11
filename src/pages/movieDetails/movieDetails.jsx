import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./movieDetails.css";
import { getDetails } from "../../API/api";

const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const [data, setData] = useState(null);
  const [providers, setProviders] = useState([]);

  const type = location.pathname.includes("/tv") ? "tv" : "movie";

  useEffect(() => {
    fetchDetails();
    fetchProviders();
  }, [id, type]);

  const fetchDetails = async () => {
    try {
      const result = await getDetails(type, id);

      const extraRes = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=credits,videos`
      );

      const extraData = await extraRes.json();

      setData({ ...result, ...extraData });
    } catch (err) {
      console.error("Details Fetch Error:", err);
    }
  };

  const fetchProviders = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/watch/providers?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      );

      const data = await res.json();

      setProviders(data.results?.IN?.flatrate || []);
    } catch (err) {
      console.error("Provider Error:", err);
    }
  };

  if (!data) return <h2 className="loading">Loading...</h2>;

  const title = data.title || data.name;
  const releaseDate = data.release_date || data.first_air_date;
  const duration = data.runtime || data.episode_run_time?.[0];

  const trailer = data.videos?.results?.find(
    (vid) => vid.type === "Trailer"
  );

  const director =
    type === "movie"
      ? data.credits?.crew?.find((c) => c.job === "Director")
      : null;

  const seasons = data.number_of_seasons;
  const episodes = data.number_of_episodes;

  const tagline = data.tagline;
  const status = data.status;
  const languages = data.spoken_languages?.map(l => l.english_name).join(", ");
  const production = data.production_companies?.map(p => p.name).slice(0, 3);
  const country = data.production_countries?.map(c => c.name).join(", ");

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
          className="movie-poster"
          src={
            data.poster_path
              ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
              : "https://via.placeholder.com/300x450"
          }
          alt={title}
        />

        <div className="movie-info">

          <h1 className="movie-title">{title}</h1>

          {tagline && <h3 className="tagline">"{tagline}"</h3>}

       
          <div className="movie-meta">
            <span className="movie-rating">
              Rating:  {data.vote_average?.toFixed(1) || "N/A"}
            </span>

            <span className="movie-genres">
              {data.genres?.map((g) => g.name).join(", ")}
            </span>
          </div>

          <p><strong>Release:</strong> {releaseDate || "N/A"}</p>
          <p><strong>Status:</strong> {status || "N/A"}</p>

          <p><strong>Duration:</strong> {duration || "N/A"} mins</p>

          {type === "tv" && (
            <>
              <p><strong>Seasons:</strong> {seasons || "N/A"}</p>
              <p><strong>Episodes:</strong> {episodes || "N/A"}</p>
            </>
          )}

          {director && (
            <p><strong>Director:</strong> {director.name}</p>
          )}

          <p><strong>Languages:</strong> {languages || "N/A"}</p>
          <p><strong>Country:</strong> {country || "N/A"}</p>
          <p><strong>Production:</strong> {production?.join(", ") || "N/A"}</p>

   
          <p className="movie-overview">
            {data.overview || "No description available."}
          </p>

      
          <h3 className="section-title">Top Cast</h3>
          <div className="cast-grid">
            {data.credits?.cast?.slice(0, 10).map((c) => (
              <div key={c.id} className="cast-card">
                <img
                  src={
                    c.profile_path
                      ? `https://image.tmdb.org/t/p/w200${c.profile_path}`
                      : "https://via.placeholder.com/100x140"
                  }
                  alt={c.name}
                />
                <p>{c.name}</p>
              </div>
            ))}
          </div>

       
          {providers.length > 0 && (
            <>
              <h3 className="section-title">Watch On</h3>

              <div className="platforms">
                {providers.map((p) => (
                  <img
                    key={p.provider_id}
                    src={`https://image.tmdb.org/t/p/w200${p.logo_path}`}
                    alt={p.provider_name}
                    title={p.provider_name}
                  />
                ))}
              </div>
            </>
          )}

    
          {trailer && (
            <div className="trailer">
              <h3 className="section-title">Trailer</h3>

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