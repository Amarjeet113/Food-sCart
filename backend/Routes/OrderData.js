const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
  let data = req.body.order_data;
  console.log(req.body);

  // Add the order date to the beginning of the data array
  data.unshift({ Order_date: req.body.order_date });

  try {
    let order = await Order.findOne({ email: req.body.email });
    if (!order) {
      // If no order exists for the email, create a new order
      await Order.create({
        email: req.body.email,
        order_data: [data],
      });
      res.json({ success: true, message: "Order created successfully" });
    } else {
      // If an order exists, update the order_data
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );
      res.json({ success: true, message: "Order updated successfully" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ success: false, message: "Server Error", error: error.message });
  }
});

router.post('/myorderData', async (req, res) => {
  try {
    let myData = await Order.findOne({ email: req.body.email });
    if (myData) {
      res.json({ order_data: myData.order_data });
    } else {
      res.status(404).json({ message: "No orders found for this email" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ success: false, message: "Server Error", error: error.message });
  }
});

module.exports = router;
