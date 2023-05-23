import React, { Fragment, useEffect, useState } from "react";
import "./Products.scss";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../redux/actions/productAction";
import Loading from "../Loading/Loading";
import Product from "../Home/Product";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from "react-alert";
import MetaData from "../Metadata/MetaData.jsx";

const categories = [
  "Boski",
  "Wash-and-Wear",
  "Kurta",
  "Men-Shawel",
  "Cotton",
  "Karandi",
  "All Others",
];

const Products = () => {
  const Alert = useAlert();
  const { keyword } = useParams();

  const cat = useSelector((state) => state.category);

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState(cat.category);
  const [rating, setRating] = useState(0);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.Products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      return Alert.error(error);
    }
    window.scrollTo(0, 0);
    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [dispatch, keyword, currentPage, price, category, rating, error, Alert]);

  let count = filteredProductsCount;

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- Shumail Store" />
          {/* <div className="ProductsHeaading">
            <p>Products</p>
          </div> */}

          <div className="container-fluid products-section">
            <div className="row">
              <div className="left col-12 col-md-3">
                <Typography>Categories</Typography>
                <ul className="categoryBox">
                  {categories.map((item) => (
                    <li
                      className="category-link"
                      key={item}
                      onClick={() => setCategory(item)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <Typography>Price</Typography>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-Slider"
                  min={0}
                  max={25000}
                />

                <fieldset className="ratings-pro">
                  <Typography component="legend">Rating Above</Typography>
                  <Slider
                    value={rating}
                    onChange={(e, newRating) => {
                      setRating(newRating);
                    }}
                    aria-labelledby="continuous-slider"
                    min={0}
                    max={5}
                    valueLabelDisplay="auto"
                  />
                </fieldset>
              </div>
              <div className="right col-12 col-md-9">
                <div className="products-container">
                  {products.length === 0 ? (
                    <div className="not-found-div">
                      No products were found matching your selection.
                    </div>
                  ) : (
                    products.map((item) => (
                      <Product key={item._id} product={item} />
                    ))
                  )}
                </div>
                {resultPerPage < count && (
                  <div className="paginationBox">
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={resultPerPage}
                      totalItemsCount={productsCount}
                      onChange={setCurrentPageNo}
                      nextPageText={"Next"}
                      prevPageText={"Prev"}
                      firstPageText={"1st"}
                      lastPageText={"Last"}
                      itemClass="page-item"
                      linkClass="page-link"
                      activeClass="pageItemActive"
                      activeLinkClass="pageLinkActive"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
