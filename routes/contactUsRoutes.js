const contactRouter = require("express").Router();
/**Contact Us Route */
const {
  newContact,
  getAContact,
  DeleteContact,
  getAllContact,
} = require("../controllers/contactUsController");
contactRouter.post("/create", newContact);
contactRouter.get("/get", getAllContact);
contactRouter.get("/products/:id", getAContact);
contactRouter.delete("/delete/:id", DeleteContact);
module.exports = { contactRouter };
