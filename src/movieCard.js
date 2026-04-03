function MovieCard(props) {
  const { movies, addStars, decStars, toggleFav, toggleCart } = props;
  const { title, plot, price, rating, stars, fav, isInCart, poster, genres } =
    props.movies;
  return (
    <>
      <div className="main">
        <div className="movie-card-container">
          <div className="movie-card">
            <div className="left">
              <img alt="movie poster" src={poster} className="movie-poster" />
            </div>
            <div className="right">
              <div className="movie-title">{title}</div>
              <div className="movie-genres">Genres: {genres.join(", ")}</div>
              <div className="movie-plot">{plot}</div>
              <div className="overview"></div>
              <div className="movie-price">Price: {price}</div>
              <div className="movie-footer">
                <div className="movie-rating">Rating:{rating}</div>
                <div className="movie-stars">
                  {stars.toFixed(1)}
                  <i
                    className="fa-solid fa-minus"
                    onClick={() => {
                      decStars(movies);
                    }}
                  ></i>
                  <i class="fa-solid fa-star"></i>
                  <i
                    class="fa-solid fa-plus"
                    onClick={() => {
                      addStars(movies);
                    }}
                  ></i>
                </div>
                <div className="movie-actions">
                  <button
                    className={fav ? "unfavourite-btn" : "favourite-btn"}
                    onClick={() => {
                      toggleFav(movies);
                    }}
                  >
                    {fav ? "unfavourite" : "favourite"}
                  </button>
                  <button
                    className={isInCart ? "Remove-from-cart" : "cart-btn"}
                    onClick={() => {
                      toggleCart(movies);
                    }}
                  >
                    {isInCart ? "Remove from cart" : "Add to cart"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieCard;
