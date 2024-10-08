const { minusUserPrivateFields } = require("../constants");
const { Product } = require("../models/productModels");
const { trimObjects } = require("../utils/trimObjects");

/** Create Prodcut */
exports.createProduct = async (req, res) => {
  try {
    trimObjects(req.body);

    const { id } = req.user;
    const { name, discription, priceBeforeDiscount, sliderId, categoryId } =
      req.body;

    if (!name) {
      console.error("Name is required fields.");
      return res.status(400).json({
        success: false,
        message: "Name is required fields.",
      });
    }

    if (!discription) {
      console.error("Discription is required field.");
      return res.status(400).json({
        success: false,
        message: "Discription is required field.",
      });
    }
    if (!priceBeforeDiscount) {
      console.error("priceBeforeDiscount is required field.");
      return res.status(400).json({
        success: false,
        message: "priceBeforeDiscount is required field.",
      });
    }
    if (!sliderId) {
      console.error("sliderId is required field.");
      return res.status(400).json({
        success: false,
        message: "sliderId is required field.",
      });
    }
    if (!categoryId) {
      console.error("categoryId is required field.");
      return res.status(400).json({
        success: false,
        message: "categoryId is required field.",
      });
    }

    if (req.files.length === 0) {
      console.error("At least one image is required");
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    images = req.files.map((file) => "/" + file.path.replace(/\\/g, "/"));
    req.body.images = images;

    if (req?.body?.discount) {
      const discountAmount = priceBeforeDiscount * (req.body.discount / 100);

      const finalPrice = priceBeforeDiscount - discountAmount;

      req.body.priceAfterDiscount = finalPrice;
    } else {
      req.body.priceAfterDiscount = priceBeforeDiscount;
    }

    req.body.userId = id;

    const newProduct = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      data: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/** Get All Products */
exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("User", minusUserPrivateFields)
      .populate("Slider")
      .populate("Category");

    if (products.length === 0) {
      res.status(200).json({
        success: true,
        message: "Products collection is empty.",
        data: products,
      });
    }

    res.status(200).json({
      success: true,
      message: "Products collection fetched successfully.",
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/** Get Product Details */
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("User", minusUserPrivateFields)
      .populate("Slider")
      .populate("Category");
    if (!product) {
      return res
        .status(404)
        .json({ success: true, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product found successfully.",
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/** Update Product */
exports.updateProduct = async (req, res) => {
  try {
    trimObjects(req.body);
    const { id } = req.user;
    const product = await Product.findOne({
      _id: req.params.id,
      userId: id,
      sliderId: id,
      categoryId: id,
    });

    if (!product) {
      console.error("Product not found");
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    if (req?.body?.name) {
      product.name = req.body.name;
    }

    if (req?.body?.discription) {
      product.discription = req.body.discription;
    }

    if (req?.body?.priceBeforeDiscount) {
      product.priceBeforeDiscount = req.body.priceBeforeDiscount;

      const discountAmount =
        product.priceBeforeDiscount * (product.discount / 100);

      const finalPrice = (product.priceBeforeDiscount = discountAmount);

      product.priceAfterDiscount = finalPrice;
    }

    if (req?.files.length !== 0) {
      product.images = req.files.map(
        (file) => "/" + file.path.replace(/\\/g, "/")
      );
    }

    await product.save();

    res
      .status(200)
      .json({ success: true, message: "Product Updated Successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/** Delete Product */
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.user;
    const PrDct = await Product.findOneAndDelete({
      _id: req.params.id,
      userId: id,
      sliderId: id,
      categoryId: id,
    });

    if (!PrDct)
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/** Discount */
exports.discount = async (req, res) => {
  try {
    // Distructuring `productId` from params object
    const { id } = req.user;
    const { productId } = req.params;
    const { discount } = req.body;

    if (!discount) {
      console.error("Discount is required filed.");
      return res.status(400).json({
        success: false,
        message: "Discount is required filed.",
      });
    }

    const product = await Product.findOne({
      _id: productId,
      userId: id,
      sliderId: id,
      categoryId: id,
    });

    if (!product) {
      console.error("Invalid product id.");
      return res.status(400).json({
        success: false,
        message: "Invalid product id.",
      });
    }

    const discountAmount = product.priceBeforeDiscount * (discount / 100);

    const finalPrice = product.priceBeforeDiscount - discountAmount;

    product.discount = discount;
    product.priceAfterDiscount = finalPrice;

    await product.save();

    return res.status(201).json({
      success: true,
      message: "Discount applied successfully.",
    });
  } catch (error) {
    console.error("An error occurred while providing discount.", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while providing discount.",
    });
  }
};

/** Set Product Featured  */
exports.setProductFeatured = async (req, res) => {
  try {
    const { id } = req.user;
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, userId: id, sliderId: id, categoryId: id },
      { $set: { featuredProduct: true } },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: true, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product set as feature successfully.",
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**  Get All Featured Products */
exports.getAllFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({
      featuredProduct: true,
    })
      .populate("User", minusUserPrivateFields)
      .populate("Slider")
      .populate("Category");
    if (featuredProducts.length === 0) {
      res
        .status(404)
        .json({ success: false, message: "Feature_Product not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Feature_Product Updated Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/** Set Product Featured */
exports.setProductNewArrival = async (req, res) => {
  try {
    const { id } = req.user;
    const newArrival = await new newArrival.findOneAndUpdate(
      { _id: req.params.id, userId: id, sliderId: id, categoryId: id },
      { $set: { newArrival: true } },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );
    if (!newArrival) {
      return res
        .status(404)
        .json({ success: true, message: "Product not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Product set as New_Arrivals successfully.",
      data: newArrival,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/** Get All New Arrival Products  */
exports.getAllNewArrivalProducts = async (req, res) => {
  try {
    const newArrivals = await Product.find({ newArrival: true });
    if (newArrivals.length === 0) {
      res
        .status(404)
        .json({ success: false, message: "New Arrivals not found" });
    }

    newArrivals.save();

    res.status(200).json({ success: true, message: "New arrival" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
