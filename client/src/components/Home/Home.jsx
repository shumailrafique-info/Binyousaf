import React, { Fragment } from "react";
import { RiMouseLine } from "react-icons/ri";
import Product from "./Product.jsx";
import Loading from "../Loading/Loading.jsx";
import "./Home.scss";
import MetaData from "../Metadata/MetaData.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { getProducts } from "../../redux/actions/productAction.js";
import { useEffect } from "react";
import Slider from "../Slider/Slider.jsx";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();
  const { products, error, loading } = useSelector((state) => state.Products);

  const homepics = [
    {
      name: "Boski",
      image:
        "https://binyousaf.pk/wp-content/uploads/2022/11/Boski-1367x2048.jpg",
      type: "Boski",
    },
    {
      name: "Wash-and-Wear",
      image:
        "https://binyousaf.pk/wp-content/uploads/2022/11/Wash-and-wear-1367x2048.jpg",
      type: "Wash-and-Wear",
    },
    {
      name: "Kurta",
      image:
        "https://binyousaf.pk/wp-content/uploads/2022/11/kurta-1367x2048.jpg",
      type: "Kurta",
    },
    {
      name: "Men-Shawel",
      image:
        "https://binyousaf.pk/wp-content/uploads/2022/11/shawls-1367x2048.jpg",
      type: "Men-Shawel",
    },
    {
      name: "Cotton",
      image:
        "https://binyousaf.pk/wp-content/uploads/2022/11/cotton-1367x2048.jpg",
      type: "Cotton",
    },
    {
      name: "Karandi",
      image:
        "https://binyousaf.pk/wp-content/uploads/2022/11/karandi-1367x2048.jpg",
      type: "Karandi",
    },
  ];

  useEffect(() => {
    if (error) {
      return Alert.error(error);
    }
    dispatch(getProducts());
  }, [dispatch, error, Alert]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title="Shumail Store | Home" />

          {/* <div className="banner">
            <p>Welcome to Shumail Store</p>
            <h1>ALL TYPE OF PRODUCTS</h1>
            <a href="#container">
              <button>
                Scroll <RiMouseLine />{" "}
              </button>
            </a>
          </div> */}

          <Slider />

          <h2 className="heading-home">Featured Products</h2>

          <div className="product-container" id="container">
            {homepics &&
              homepics.map((pro) => (
                <Link
                  // onClick={() => dispatch({ type: `${pro.type}` })}
                  to={`/products?category=${pro.type}`}
                  key={pro.name}
                  className="productCart"
                >
                  <img src={pro.image} alt="" />
                  <p
                    style={{
                      textAlign: "center",
                      fontFamily: "'Russo One', sans-serif",
                    }}
                  >
                    {pro.name}
                  </p>
                  {/* <div>
                    <Rating
                      {...{
                        value: pro.ratings,
                        readOnly: true,
                        precision: 0.5,
                      }}
                    />{" "}
                    <span className="productCardSpan">
                      ({pro.reviews.length} Reviews)
                    </span>
                  </div> */}
                  {/* <span>{`Rs ${pro.price}`}</span> */}
                </Link>
              ))}
          </div>
        </Fragment>
      )}
    </>
  );
};

export default Home;
