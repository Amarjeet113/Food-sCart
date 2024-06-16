const mongoose = require('mongoose');

const { Schema } = mongoose;
const OrderSchema = new Schema({
  email: {
    type: String,
    ref:"user",

  },
  order_data: {
    type: Array,
    required: true,
  },
});

const Order = mongoose.model('Order', OrderSchema); // Creating a model named 'Order' based on OrderSchema
module.exports = Order; // Exporting the Order model
