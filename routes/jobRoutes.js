const jobRouter = require("express").Router();

const { loginAuth } = require("../middleware/loginAuth");
const {
  newJob,
  getAllJob,
  getJob,
  Updatejob,
  Deletejob,
} = require("../controllers/jobControllers");
newJob;
jobRouter.post("/create", loginAuth, newJob);
jobRouter.get("/getAll", getAllJob);
jobRouter.get("/GetOne", getJob);
jobRouter.post("/update/:id", loginAuth, Updatejob);
jobRouter.delete("/delete", Deletejob);

module.exports = {
  jobRouter,
};
