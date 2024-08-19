const { Apply_now } = require("../models/applyModels");
/**Create */
exports.Apply_now = async (req, res) => {
  try {
    const { Your_Name, Phone_Number, Postition_Applied_for, Email } = req.body;
    if (!(Your_Name && Phone_Number && Postition_Applied_for && Email)) {
      console.error("All fields are required fields.");
      return res.status(400).json({
        success: false,
        message: "All fields are required fields.",
      });
    }
    if (!req?.file) {
      console.error("Please upload file");
      return res.status(400).josn({
        success: false,
        message: "Please upload file",
      });
    }
    Choosefile = req.file.path.replace(/\\/g, "/");
    req.body.Choosefile = Choosefile;
    const newApply = await Apply_now.create(req.body);
    res.status(201).json({
      success: true,
      message: "Apply successfully.",
      data: newApply,
      jobs: jobs.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
/**GetAll */
exports.GetAllApplicants = async (req, res) => {
  try {
    const allApplicants = await Apply_now.find().populate("Job");
    if (allApplicants.length === 0) {
      res.status(404).josn({
        success: true,
        message: "Empty",
        data: allApplicants,
      });
      res.status(200).josn({
        success: true,
        message: "All Data fetched successfully",
        data: allApplicants,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
/**Get One  */
exports.getOneApplicant = async (req, res) => {
  try {
    const applicant = await Apply_now(req.params.id).populate("Job");
    if (!applicant) {
      return res
        .status(404)
        .json({ success: true, message: "Applicant not found" });
    }
    res.status(200).josn({
      success: true,
      message: "Applicant found successfully",
      data: applicant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
/**Update Applicant  */
exports.updateApplicant = async (req, res) => {
  try {
    const applicant = await Apply_now.findOne({
      _id: req.params.id,
    });
    if (!applicant) {
      console.error("Applicant not found");
      return res
        .status(404)
        .json({ success: flase, message: "Applicant not found" });
    }
    if (req?.body?.Your_Name) {
      applicant.Your_Name = req.body.Your_Name;
    }
    if (req?.body?.Phone_Number) {
      applicant.Phone_Number = req.body.Phone_Number;
    }
    if (req?.body?.Email) {
      applicant.Email = req.body.Email;
    }
    if (req?.file.length !== 0) {
      applicant.Choosefile = req.file.path.replace(/\\/g, "/");
    }
    await applicant.save();
    res
      .status(200)
      .json({ success: true, message: "Information updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
/**Delete applicant  */
exports.deleteapplicant = async (req, res) => {
  try {
    const applicant = await Apply_now.findByIdAndDelete(req.params.id);
    if (!applicant) {
      return res
        .status(404)
        .json({ success: false, error: "Applicant not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Applicant deleted", data: applicant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
