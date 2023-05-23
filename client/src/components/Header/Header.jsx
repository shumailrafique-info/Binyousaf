import React, { Fragment } from "react";
import "./Header.scss";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../images/logo.png";
import { FaUserAlt } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { ImSearch } from "react-icons/im";
import { AiOutlineBars } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Fragment>
      <div className="container-fluid header">
        <div
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#staticBackdrop"
          aria-controls="staticBackdrop"
          className="menu"
        >
          <span>Menu</span>
          <AiOutlineBars />
        </div>
        <Link to={"/"} className="logo">
          <img src={logo} alt="logo" />
        </Link>
        <div className="icons">
          <Link to={"/search"}>
            <ImSearch />
          </Link>
          <Link to={"/cart"}>
            <FiShoppingBag />
          </Link>
          <Link
            target="_blank"
            to={"https://www.facebook.com/binyousafclothing"}
          >
            <BsFacebook />
          </Link>
          <Link
            target="_blank"
            to={"https://www.instagram.com/binyousafclothing/"}
          >
            <BsInstagram />
          </Link>
        </div>
      </div>
    </Fragment>

    // <ReactNavbar
    //   burgerColor="#eb4034"
    //   burgerColorHover="#eb4034"
    //   logo={logo}
    //   logoWidth={`${window.innerWidth <= 600 ? "5vmax" : "20vmax"}`}
    //   navColor1="white"
    //   logoHoverSize="10px"
    //   logoHoverColor="#eb4034"
    //   link1Text="Home"
    //   link2Text="Products"
    //   link3Text="Contact"
    //   link4Text="About"
    //   link1Url="/"
    //   link2Url="/products"
    //   link3Url="/contact"
    //   link4Url="/about"
    //   link1Size="1.2vmax"
    //   link1Color="rgba(35,35,35,0.8)"
    //   nav1justifyContent="flex-end"
    //   nav2justifyContent="flex-end"
    //   nav3justifyContent="flex-start"
    //   nav4justifyContent="flex-start"
    //   link1ColorHover="#eb4034"
    //   link1Margin="1vmax"
    //   profileIcon={true}
    //   profileIconUrl="/login"
    //   ProfileIconElement={FaUserAlt}
    //   profileIconColor="rgba(35,35,35,0.8)"
    //   profileIconSize="2vmax"
    //   profileIconColorHover="#eb4034"
    //   profileIconMargin="1vmax"
    //   cartIcon={true}
    //   CartIconElement={FiShoppingBag}
    //   cartIconColor="rgba(35,35,35,0.8)"
    //   cartIconColorHover="#eb4034"
    //   cartIconMargin="1vmax"
    //   searchIcon={true}
    //   SearchIconElement={ImSearch}
    //   searchIconColor="rgba(35,35,35,0.8)"
    //   searchIconColorHover="#eb4034"
    //   searchIconMargin="1vmax"
    // />
  );
}

export default Header;
