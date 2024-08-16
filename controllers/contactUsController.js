const { Contact_Us } = require("../models/contactUsModels");

exports.newContact = async (req, res) => {
  try {
    trimObjects(req.body);
    const { name, email, message } = req.body;
    if (!(name && email && message)) {
      console.error("name, email and message are required fields.");
      return res.status(400).json({
        success: false,
        message: "name, email and  message are required fields.",
      });
    }
    const contact = new Contact_Us.create({
      name,
      email,
      message,
    });

    await contact.save();
    res
      .status(201)
      .json({ success: true, message: "Contact message received" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An Error occured while receiving contact message",
      error,
    });
  }
};
/**GetAll details */
exports.getAllContact = async (req, res) => {
  try {
    const contact = await Contact_Us.find();
    res.status(200).json({ success: true, message: contact });
    if (contact.length === 0) {
      res.status(200).json({
        success: true,
        message: "Contact collection is empty.",
        data: contact,
      });
    }
    res.status(200).json({
      success: true,
      message: "Contact collection fetched successfully.",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
// Get A contact

exports.getAContact = async (req, res) => {
  try {
    const contact = await Contact_Us.findById(req.params.id);
    if (!contact) {
      return res
        .status(404)
        .json({ success: true, message: "Contact not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Contact found successfully.",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
/**DeleteContact */
exports.DeleteContact = async (req, res) => {
  try {
    const contact = await Contact_Us.findByIdAndDelete(req.params.id);
    if (!contact)
      return res
        .status(404)
        .json({ success: false, error: "Contact not found" });

    res.status(200).json({ success: true, message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
