const { minusUserPrivateFields } = require("../constants");
const { Order } = require("../models/orderModels");
/**Create Order */
exports.newOrder = async (req, res) => {
  try {
    const { userId, productId, Price, Status } = req.body;
    if (!(userId && productId && Price && Status)) {
      console.error("Require all fields");
      return res.status(400).json({
        success: false,
        message: "Require all fields",
      });
    }
    const newOrder = await Order.create(req.body);
    res.status(201).json({
      success: true,
      message: "Order created successfully.",
      data: newOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
/**GetAll */
exports.allOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", minusUserPrivateFields)
      .populate("productId");
    if (orders.length === 0) {
      res.status(200).json({
        success: true,
        message: "order collection is empty.",
        data: orders,
      });
    }
    res.status(200).json({
      success: true,
      message: "Orders collection fetched successfully.",
      data: orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
