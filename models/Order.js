const mongoose = require("mongoose");

const OderSchema = new mongoose.Schema({

    userId: {type: String, require:TextTrackCueList},
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


module.exports = mongoose.model("Oder", OderSchema);