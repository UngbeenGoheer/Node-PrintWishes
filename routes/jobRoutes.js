const jobRouter = require("express").Router();
const {
  newJob,
  getAllJob,
  getJob,
  Updatejob,
  Deletejob,
} = require("../controllers/jobControllers");
newJob;
jobRouter.post("/create", newJob);
jobRouter.get("/getAll", getAllJob);
jobRouter.get("/GetOne", getJob);
jobRouter.post("/update/:id", Updatejob);
jobRouter.delete("/delete", Deletejob);

module.exports = {
  jobRouter,
};
