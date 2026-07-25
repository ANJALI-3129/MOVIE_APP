import { useState, useEffect } from "react";
import { getHorizontalMovies } from "../API/api";

const useHorizontalRow = (endpoint) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await getHorizontalMovies(endpoint);
        setMovies(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadMovies();
  }, [endpoint]);

  return movies;
};

export default useHorizontalRow;
