import React from "react";
import "./Contact.scss"
import { Link } from "react-router-dom";

const Contact = () => {
  return <div className="ContactContainer">
           <h1>Contact Page is in Working</h1>
           <p>Will be Avalible Soon</p>
           <p style={{color:"black"}}>Our Email : Shumailrafique.info@gmail.com</p>
           <Link to={"/"}>Go Home Page</Link>
          </div>;
};

export default Contact;
