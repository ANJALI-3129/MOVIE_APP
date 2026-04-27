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
            Movix
            <div className="cart-container">
              <div className="like-icon">
                <i class="fa-regular fa-thumbs-up"></i>
                <span className="like-count">{LikeCount}</span>
              </div>

              <div className="cart-icon">
                <i className="fa-solid fa-cart-shopping"></i>
                <span className="cart-count">{cartCount}</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Navbar;
