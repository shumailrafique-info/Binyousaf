import React from "react";
import playStore from "../../images/playstore.png";
import appStore from "../../images/Appstore.png";
import "./Footer.scss"

const Footer = () => {
  return (
    <footer id="footer" className="container-fluid">
      <div className="leftFooter">
        <h4>SIGN UP TO OUR WEBSITE</h4>
        <button >Sign up</button>
        <hr style={{color:"white",height:"2px",width:"100%"}} />
        <h4>DOWNLOAD OUR APP FROM</h4>
        <img src={playStore} alt="" />
        <img src={appStore} alt="" />
      </div>
      <div className="midFooter">
        <h1>SHUMAIL STORE</h1>
        <p>Copyrigths 2023 &copy; ShumailSandhu</p>
      </div>
      <div className="rigthFooter">
        <h4>Follow us</h4>
        <a href="Instagram.com">Instagram</a>
        <a href="Youtube.com">Youtube</a>
        <a href="Facebook.com">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
