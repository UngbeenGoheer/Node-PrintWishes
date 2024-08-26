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
/**GetOne */
exports.getAorder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", minusUserPrivateFields)
      .populate("productId");
    if (!order) {
      res.status(200).json({
        success: true,
        message: "order  is not Found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Order fetched successfully.",
      data: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
/**Update Order */
exports.updateOrder = async (req, res) => {
  try {
    const updateorder = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateorder) {
      console.error("order  is not Found.");
      return res.status(200).json({
        success: true,
        message: "order  is not Found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Order Update successfully.",
      data: updateorder,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
/** Delete Order */
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete(req.params.id);
    if (order) {
      console.error("order  is not Found.");
      return res.status(200).json({
        success: true,
        message: "order  is not Found.",
      });

      return res.status(200).json({
        success: true,
        message: "Order Deleted successfully.",
        data: order,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
