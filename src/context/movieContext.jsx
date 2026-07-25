import { createContext, useContext } from "react";
import useMovies from "../hooks/useMovies";


const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const movie = useMovies();

  return (
 <MovieContext.Provider value={movie}>
    {children}
</MovieContext.Provider>
  );
};

export const useMovie = () => {
  return useContext(MovieContext);
};