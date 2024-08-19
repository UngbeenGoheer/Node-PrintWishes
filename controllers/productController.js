const { Product } = require("../models/productModels");

/** Create Prodcut */
exports.newProduct = async (req, res) => {
  try {
    // trimObjects(req.body);

    const {
      name,
      description,
      priceBeforeDiscount,
      featured_product,
      product_new_arrival,
    } = req.body;

    if (
      !(
        name &&
        description &&
        priceBeforeDiscount &&
        featured_product &&
        product_new_arrival
      )
    ) {
      console.error("Name, Description and Price are required fields.");
      return res.status(400).json({
        success: false,
        message: "Name, Description and Price are required fields.",
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

    const newProduct = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      data: newProduct,
      users: user.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/** GetAll details */
exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find().populate("User");

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
    const product = await Product.findById(req.params.id).populate("User");
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

/** UpdateProduct */
exports.UpdateProduct = async (req, res) => {
  try {
    trimObjects(req.body);
    const product = await Product.findOne({ _id: req.params.id });

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

      if (product.discount !== 0) {
        const discountAmount =
          product.priceBeforeDiscount * (product.discount / 100);

        const finalPrice = (product.priceBeforeDiscount = discountAmount);

        product.priceAfterDiscount = finalPrice;
      }
    }

    if (req?.files.length !== 0) {
      product.images = req.files.map(
        (file) => "/" + file.path.replace(/\\/g, "/")
      );
    }

    product.save();

    res
      .status(200)
      .json({ success: true, message: "Product Updated Successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/** DeleteProduct */
exports.DeleteProduct = async (req, res) => {
  try {
    const PrDct = await Product.findByIdAndDelete(req.params.id);

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
    const { productId } = req.params;
    const { discount } = req.body;

    if (!discount) {
      console.error("Discount is required filed.");
      return res.status(400).json({
        success: false,
        message: "Discount is required filed.",
      });
    }

    const product = await Product.findOne({ _id: productId });

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
// Get all featured products
exports.featuredProduct = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ featured_product: true });
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
/**Feature Updating  */
exports.makeProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: { featured_product: true } },
      {
        new: true,
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

/**New_Arrivals  */
exports.newArrivals = async (req, res) => {
  try {
    const newArrivals = await Product.find({ product_new_arrival: true });
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
/**Feature Updating  */
exports.makeArrivals = async (req, res) => {
  try {
    const newArrival = await new product_new_arrival.findByIdAndUpdate(
      req.params.id,
      { $set: { product_new_arrival: true } },
      {
        new: true,
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
