import { Link } from "react-router-dom";
import "./horizontalRow.css";
import useHorizontalRow from "../../hooks/useHorizontalRow";

const HorizontalRow = ({ title, endpoint, viewAll }) => {
  const movies = useHorizontalRow(endpoint);

  return (
    <section className="row-section">
      <div className="row-header">
        <h2>{title}</h2>

        <Link to={viewAll} className="view-all">
        
          View All →
        </Link>
      </div>

      <div className="Hori-movie-row">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/${movie.mediaType}/${movie.id}`}
            className="Hori-movieCard"
          >
            <img src={movie.poster} alt={movie.title} />

            <p>{movie.title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HorizontalRow;