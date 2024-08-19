const orderRouter = require("express").Router();
const {
  newOrder,
  readAll,
  readOne,
  updateOrder,
  dltOrder,
} = require("../controllers/orderController");
orderRouter.post("/create", newOrder);
orderRouter.get("/readAll", readAll);
orderRouter.get("/readOne/:id", readOne);
orderRouter.post("update/:id", updateOrder);
orderRouter.delete("/delete/:id", dltOrder);

module.exports = { orderRouter };
