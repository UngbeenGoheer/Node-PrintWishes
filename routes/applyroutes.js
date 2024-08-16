const applyRouter = require("express").Router();
const { upload } = require("../utils/uploads");
const {
  Apply_now,
  GetAllApplicants,
  getOneApplicant,
  deleteapplicant,
} = require("../controllers/applyController");

applyRouter.post("/create", upload.single("Choosefile"), Apply_now);
applyRouter.get("/getAll", GetAllApplicants);
applyRouter.get("/getOne/:id", getOneApplicant);
applyRouter.post("/Update/:id", upload.single("Choosefile"), deleteapplicant),
  applyRouter.delete("/Delete/:id", deleteapplicant);

module.exports = { applyRouter };
