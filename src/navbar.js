import { Component } from "react";
import "./navbar.css";
class Navbar extends Component {
  render() {
    const { cartCount } = this.props;
    const { LikeCount } = this.props;
    return (
      <>
        <div className="nav">
          <div className="head">
            MOVIE_APP
            <div className="cart-container">
              <div className="like-icon">
                <i class="fa-regular fa-thumbs-up"></i>
              </div>
              <div className="like-count">{LikeCount}</div>
              <div className="cart-icon">
                <i class="fa-solid fa-cart-shopping"></i>
              </div>

              <div className="cart-count">{cartCount}</div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Navbar;
