const sliderRouter = require("express").Router();
const { upload } = require("../utils/uploads");
const {
  newSlider,
  getALLSlider,
  getOneSlider,
  UpdateSlider,
  DeleteSlider,
} = require("../controllers/sliderController");
sliderRouter.post("/create", upload.any("images"), newSlider);
sliderRouter.get("/getAll", getALLSlider);
sliderRouter.get("/get/:id", getOneSlider);
sliderRouter.post("/Update/:id", upload.any("images"), UpdateSlider);
sliderRouter.delete("/delete/:id", DeleteSlider);
module.exports = { sliderRouter };
