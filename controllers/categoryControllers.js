const { Category } = require("../models/categoryModels");

/**Create category */
exports.newCategory = async (req, res) => {
  try {
    trimObjects(req.body);
    const { title, description } = req.body;
    if (!(title && description)) {
      console.error("title and Description are required fields.");
      return res.status(400).json({
        success: false,
        message: "title and Description are required fields.",
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

    const newCategory = await Category.create(req.body);
    res.status(201).json({
      success: true,
      message: "Category created successfully.",
      data: newCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
/**GetAll */
exports.getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find().populate("Slider");
    if (categories.length === 0) {
      res.status(200).json({
        success: true,
        message: "Category collection is empty.",
        data: categories,
      });
    }
    res.status(200).json({ success: true, message: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
/**GetOne  */
exports.getOnecategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate("Slider");
    if (!category) return res.status(404).json({ error: "Category not found" });

    res.status(200).json({ success: true, message: category });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
/**UpdateCategory */
exports.UpdateCategory = async (req, res) => {
  try {
    trimObjects(req.body);
    const { title, description } = req.body;
    const category = await Category.findOne({ _id: req.params.id });

    if (!category) {
      console.error("Category not found");
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    if (req?.body?.title) {
      category.title = req.body.name;
    }

    if (req?.body?.description) {
      category.description = req.body.description;
    }
    if (req?.files.length !== 0) {
      category.images = req.files.map(
        (file) => "/" + file.path.replace(/\\/g, "/")
      );
    }

    category.save();

    res
      .status(200)
      .json({ success: true, message: "Category Updated Successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/**DeleteCategory */
exports.DeleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category)
      return res
        .status(404)
        .json({ success: false, error: "Category not found" });

    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
