import HorizontalRow from "../../components/horizontalCards/horizontalRow";
// import MovieList from "../../components/movielist/movieList";
import SearchBar from "../../components/searchBar/searchBar";
import "./home.css";
const Home=({background})=> {

  return (
    <div className="home-layout">
    <SearchBar background={background} />

<HorizontalRow
  title="Top Rated"
  endpoint="movie/top_rated"
viewAll="/movies/topRated"
/>

<HorizontalRow
  title="Trending In Worldwide"
  endpoint="trending/all/week"
  viewAll="/movies/trending"
/>

<HorizontalRow
  title="Indian Trending Movies"
  endpoint="discover/movie?with_origin_country=IN&sort_by=popularity.desc"
  viewAll="/movies/india"
/>

<HorizontalRow
  title="Best of Hollywood"
  endpoint="discover/movie?with_original_language=en&sort_by=vote_average.desc&vote_count.gte=500"
  viewAll="/movies/hollywood"
/>

<HorizontalRow
  title="Best of Bollywood"
  endpoint="discover/movie?with_original_language=hi&sort_by=vote_average.desc&vote_count.gte=200"
  viewAll="/movies/bollywood"
/>

<HorizontalRow
  title="Upcoming Trailers"
  endpoint="movie/upcoming"
  viewAll="/movies/upcoming"
/>
    </div>
  );
}

export default Home;