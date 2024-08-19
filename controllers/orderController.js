const { Order } = require("../models/orderModel");
/**Create */
exports.newOrder = async (req, res) => {
  try {
    const { productId, userId, productQuantity, shippingFee, totalAmount } =
      req.body;

    if (
      !(productId && userId && productQuantity && shippingFee && totalAmount)
    ) {
      console.log("All feild are required");
      return res.status(400).json({
        success: false,
        message: "All feild are required",
      });
    }
    const newOrder = await new Order.create(req.body);
    return res.status(200).json({
      success: true,
      message: "Order Placed ",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
/**ReadAll */
exports.readAll = async (req, res) => {
  try {
    const order = await Order.find().populate("User");
    if (!order) {
      console.log("No Order Found");
      return res.status(400).json({
        success: false,
        message: "Don't find any order",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Fetched All orders",
      data: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
/**Read An Order */
exports.readOne = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("User");
    if (!order) return res.status(404).json({ error: "Order not found" });

    res
      .status(200)
      .json({ success: true, message: "Order find succesfully", data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
// Update an order
exports.updateOrder = async (req, res) => {
  try {
    const [updated] = await Order.findOne(req.body, {
      where: { orderId: req.params.id },
    });
    if (!updated) {
      res.status(200).json({ success: false, message: "Order not found" });
    }
    if (req?.body?.productId) {
      updated.productId = req.body.productId;
    }
    if (req?.body?.orderId) {
      updated.orderId = req.body.orderId;
    }
    if (req?.body?.productQuantity) {
      updated.productQuantity = req.body.productQuantity;
    }
    if (req?.body?.shippingFee) {
      updated.shippingFee = req.body.shippingFee;
    }
    if (req?.body?.totalAmount) {
      updated.totalAmount = req.body.totalAmount;
    }
    await updated.save();
    return res
      .status(200)
      .json({ success: true, message: "Order Updated", data: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
/**Delete Order */
exports.dltOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "Order deleted Successfully",
        data: deleted,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
