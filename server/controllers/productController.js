const Product = require("../models/productModel.js");
const ErrorHandler = require("../utils/errorhandler.js");
const ApiFeatures = require("../utils/apifeatures.js");
const cloudinary = require("cloudinary");

//Create Product ---Admin
const creatingProduct = async (req, res, next) => {
  try {
    let images = [];

    const imagesLink = [];

    for (let i = 0; i < req.files.length; i++) {
      imagesLink.push({
        public_id: "1234567890",
        url: `${process.env.IMAGE_URL}${req.files[i].filename}`,
      });
    }

    req.body.images = imagesLink;
    req.body.user = req.user;

    // req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};
//Get All Products
const getAllProducts = async (req, res, next) => {
  try {
    const resultPerPage = 20;

    const productCount = await Product.countDocuments();

    const apifeature2 = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter();

    let cont = await apifeature2.query;

    let filteredProductsCount = cont.length;

    const apifeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);

    const products = await apifeature.query;
    res.status(200).json({
      success: true,
      productCount,
      filteredProductsCount,
      resultPerPage,
      products,
    });
  } catch (error) {
    next(error);
  }
};
//Get All Admin Products
const getAdminProducts = async (req, res, next) => {
  try {
    const productCount = await Product.countDocuments();

    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
      productCount,
    });
  } catch (error) {
    next(error);
  }
};
//Update Product ---Admin
const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }
    ////Images Handling

    const imagesLink = [];

    for (let i = 0; i < req.files.length; i++) {
      imagesLink.push({
        public_id: "1234567890",
        url: `${process.env.IMAGE_URL}${req.files[i].filename}`,
      });
    }
    req.body.images = imagesLink;

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModift: false,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};
//Delete Product --Admin
const deleteProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }

    //Deleting product from cloudnary

    product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

///Get Single Product
const getSingleProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

// creating new review and updating review
const createProductReview = async (req, res, next) => {
  try {
    const { rating, comment, productId } = req.body;

    const review = {
      user: req.user.id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user.id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user.id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Review Added",
    });
  } catch (error) {
    next(error);
  }
};

//Get All Reviews
const getProductRevieews = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.id);

    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {}
};

//delte reviews
const deleteReview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.productId);

    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }

    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;
    reviews.forEach((rev) => {
      avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      { new: true, runValidators: true, useFindAndModift: false }
    );

    res.status(200).json({
      success: true,
      message: "Product review deleted Successe Fully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  creatingProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getProductRevieews,
  deleteReview,
  getAdminProducts,
};
