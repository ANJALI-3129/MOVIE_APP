import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieList from "../../components/movielist/movieList";
import { useMovie } from "../../context/movieContext";

const MoviePage = () => {
  const { category } = useParams();

  const {
    movies,
    setCategories,
  } = useMovie();

  useEffect(() => {
    setCategories(category);
  }, [category, setCategories]);

  return (
    <MovieList
      movies={movies}
      categories={category}
    />
  );
};

export default MoviePage;