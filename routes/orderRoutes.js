const orderRoutes = require("express").Router();
const { newOrder, allOrders } = require("../controllers/orderController");
orderRoutes.post("/create", newOrder);
orderRoutes.get("/getall/:id", allOrders);
module.exports = { orderRoutes };
