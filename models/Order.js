const mongoose = require("mongoose");

const OderSchema = new mongoose.Schema({

    userId: {type: String, require: true},
    products: [

        {
            productId:{
                type: String
            },
            quantity:{
                type: Number,
                default: 1,

            },

        }
    ],
    amount: {type: Number, required: true},
    address: {type: Object},
    status: {type: String, default: "pending"},
 
},
    {timestamps: true}
);


module.exports = mongoose.model("Order", OderSchema);