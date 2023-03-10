const mongoose = require("mongoose");
// const Url = require("mongoose-type-url");


const ProductSchema = new mongoose.Schema({
    title: {type: String, require:true, unique: true},
    desc: {type: String, require:true},
    imgLink: {type: String, require:true},
    category: {type: String, require:true},
    size: {type: String},
    color: {type: String},
    price: {type: Number, require:true},
 
}, 
    {timestamps: true}
);


module.exports = mongoose.model("Product", ProductSchema);