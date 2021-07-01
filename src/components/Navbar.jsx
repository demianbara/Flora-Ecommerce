import React from "react";
import "../styles/Navbar.css";
import "../assets/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import axios from "axios";
import { message } from "antd";
import { setUser } from "../state/user";

function Navbar() {
  const [search, setSearch] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${search}`);
  };

  const handleLogout = (e) => {
    axios
      .post("/api/users/logout")
      .then((res) => {
        message.success("Logout successfully");
        dispatch(setUser({}));
        history.push("/");
        return res;
      })
      .catch((err) => err);
  };

  const user = useSelector((state) => state.user);
  return (
    <div className="topnav">
      <Link to="/">
        <img
          className="logo"
          src="https://i.imgur.com/fmEwXEc.png"
          alt="logo"
        />
      </Link>
      <div className="search">
        <form onSubmit={handleSubmit}>
          <img
            className="png"
            src="https://www.clipartmax.com/png/full/279-2795130_search-magnifying-glass-search-icon-transparent.png"
            alt="searchImg"
          />

          <input
            className="searchInput"
            onChange={handleChange}
            type="text"
            placeholder="What are you looking for?"
          />
        </form>
      </div>
      <div className="links">
        {!user.nick && (
          <Link to="/login">
            <img
              className="png"
              src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              alt="searchImg"
            />
            <h3>- Log in</h3>
          </Link>
        )}

        {!user.nick && (
          <Link to="/register">
            <img
              className="png"
              src="https://freepikpsd.com/media/2019/10/register-icon-png-4-Transparent-Images.png"
              alt="searchImg"
            />
            <h3>- Register</h3>
          </Link>
        )}

        {user.nick && (
          <Link to="/register">
            <img
              className="png"
              src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              alt="searchImg"
            />
            <h3>- {user.nick}</h3>
          </Link>
        )}

        {user.nick && (
          <div onClick={handleLogout} style={{ cursor: "pointer" }}>
            <img
              className="png"
              src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              alt="searchImg"
            />
            <h3>- Log out</h3>
          </div>
        )}

        <Link to={`/cart`}>
          <img
            className="png"
            src="https://pngimg.com/uploads/shopping_cart/shopping_cart_PNG38.png"
            alt="searchImg"
          />
          <h3>- My cart</h3>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
