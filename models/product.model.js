const mongoose = require("mongoose");

const productSchema = new mongooseSchema({
    name: String,
    category: {
        type: String,
        enum: ["Vegetables", "Fruits", "Beef", "Poultry", "Fishery", "Cereals", "Other"],
    },
    quantity: Number,
    price: Number,
    likes: {
        type: Boolean,
        enum: [true, false], 
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
    
});

const Product = mongoose.model("product", productSchema);

module.exports = Product; 