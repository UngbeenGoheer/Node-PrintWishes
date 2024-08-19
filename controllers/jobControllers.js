const { Job } = require("../models/jobModels");
/** Create job */
exports.newJob = async (req, res) => {
  try {
    trimObjects(req.body);

    const {
      title,
      location,
      date,
      designation,
      description,
      responsibilities,
      applyId,
    } = req.body;
    if (
      !(
        title &&
        location &&
        date &&
        designation &&
        description &&
        responsibilities &&
        applyId
      )
    ) {
      console.log("All fields are required");
    }
    const newjob = await Job.create(req.body);

    res.status(201).json({
      success: true,
      message: " job created successfully.",
      data: newjob,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
/** GetAll details */
exports.getAllJob = async (req, res) => {
  try {
    const jobs = await Job.find({}).populate("Apply_now");

    if (Job.length === 0) {
      res.status(200).json({
        success: true,
        message: " jobs collection is empty.",
        data: jobs,
      });
    }
    res.status(200).json({
      success: true,
      message: "All jobs fetched successfully.",
      data: jobs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
/** Get Job Details */
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("Apply_now");
    if (!job) {
      return res.status(404).json({ success: true, message: "Job not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Job found successfully.",
      data: job,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
/**Updatejob */
exports.Updatejob = async (req, res) => {
  try {
    trimObjects(req.body);
    const job = await Job.findOne({ _id: req.params.id, applyId: id });
    if (!user) {
      console.error("Job not found");
      return res.status(404).json({ success: false, message: "JOb not found" });
    }
    if (req?.body?.title) {
      user.title = req.body.title;
    }
    if (req?.body?.location) {
      user.location = req.body.location;
    }
    if (req?.body?.date) {
      user.date = req.body.date;
    }
    if (req?.body?.designation) {
      user.designation = req.body.designation;
    }
    if (req?.body?.description) {
      user.description = req.body.description;
    }
    if (req?.body?.responsibilities) {
      user.responsibilities = req.body.responsibilities;
    }

    await job.save();
    res
      .status(200)
      .json({ success: true, message: "Job Updated Successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/**DeleteUser */
exports.Deletejob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete({
      _id: req.params.id,
      applyId: id,
    });
    if (!job)
      return res.status(404).json({ success: false, error: "Job not found" });

    res.status(200).json({ success: true, message: "Job deleted", data: job });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
