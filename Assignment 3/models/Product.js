const mongoose = require("mongoose");

let productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    // sku: {
    //     type: String,
    //     required: true,
    // },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

let productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
























