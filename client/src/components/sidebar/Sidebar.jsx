import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  const Navigate = useNavigate();
  const cross = useRef();

  return (
    <div>
      <div
        style={{ zIndex: "10000000" }}
        className="offcanvas offcanvas-start bg-dark text-white"
        data-bs-backdrop="static"
        tabIndex="-1"
        id="staticBackdrop"
        aria-labelledby="staticBackdropLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="staticBackdropLabel">
            {/* Bin Yousaf */}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body nav-links">
          <div
            onClick={() => {
              Navigate("/");
            }}
          >
            HOME
          </div>
          <div
            onClick={() => {
              Navigate("/products");
            }}
          >
            PRODUCTS
          </div>
          <div
            onClick={() => {
              Navigate("/about");
            }}
          >
            ABOUT
          </div>
          <div
            onClick={() => {
              Navigate("/contact");
            }}
          >
            CONTACT
          </div>
          <div
            onClick={() => {
              Navigate("/login");
            }}
          >
            LOGIN
          </div>
          <div
            style={{ color: "orangered" }}
            onClick={() => {
              Navigate("/account");
            }}
          >
            ACCOUNT
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
