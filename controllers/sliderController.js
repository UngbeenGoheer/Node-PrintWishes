const { Slider } = require("../models/sliderModels");

/**CreateSlider */

exports.newSlider = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!(title && description)) {
      console.error("title and Description are required fields.");
      return res.status(400).json({
        success: false,
        message: "title and Description are required fields.",
      });
    }

    console.log("req.fielessssssssssssssss: ", req.files);
    if (req.files.length === 0) {
      console.error("At least one image is required");
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    images = req.files.map((file) => "/" + file.path.replace(/\\/g, "/"));
    req.body.images = images;

    const newSlider = await Slider.create(req.body);
    res.status(201).json({
      success: true,
      message: "Slider created successfully.",
      data: newSlider,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
/** GetAll details */
exports.getALLSlider = async (req, res) => {
  try {
    const sliders = await Slider.find({});

    if (sliders.length === 0) {
      res.status(200).json({
        success: true,
        message: "Slider collection is empty.",
        data: sliders,
      });
    }
    res.status(200).json({
      success: true,
      message: "Slider collection fetched successfully.",
      data: sliders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
/**Get One */
exports.getOneSlider = async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.id);
    if (!slider) {
      return res
        .status(404)
        .json({ success: true, message: "Slider not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Slider found successfully.",
      data: slider,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
/**Update Slider */
exports.UpdateSlider = async (req, res) => {
  try {
    // trimObjects(req.body);
    const slider = await Slider.findOne({ _id: req.params.id });

    if (!slider) {
      console.error("Slider not found");
      return res
        .status(404)
        .json({ success: false, message: "Slider not found" });
    }

    if (req?.body?.title) {
      slider.title = req.body.name;
    }

    if (req?.body?.description) {
      slider.description = req.body.description;
    }
    if (req?.files.length !== 0) {
      slider.images = req.files.map(
        (file) => "/" + file.path.replace(/\\/g, "/")
      );
    }

    slider.save();

    res
      .status(200)
      .json({ success: true, message: "Slider Updated Successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/**Delete Slider */
exports.DeleteSlider = async (req, res) => {
  try {
    const slider = await Slider.findByIdAndDelete(req.params.id);

    if (!slider)
      return res
        .status(404)
        .json({ success: false, error: "Slider not found" });

    res.status(200).json({ success: true, message: "Slider deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
