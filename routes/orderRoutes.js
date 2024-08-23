const orderRoutes = require("express").Router();
const {
  newOrder,
  allOrders,
  getAorder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
orderRoutes.post("/create", newOrder);
orderRoutes.get("/getall/:id", allOrders);
orderRoutes.get("/getOne/:id", getAorder);
orderRoutes.post("/update/:id", updateOrder);
orderRoutes.delete("/delete/:id", deleteOrder);
module.exports = { orderRoutes };
