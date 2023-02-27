const router = require("express").Router();
const Product = require("../models/Product");
const { verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("./verifyToken");


//CREATE
router.post("/", async (req,res)=>{
               console.log("hello")
        const newProduct = new Product(req.body);


    try {
        const saveProduct =await newProduct.save();
        res.status(200).json(saveProduct);
        console.log(saveProduct);
        
    } catch (err) {
        res.status(500).json(err);
    }

});


// /UPDATE 
router.put("/:id",  async (req, res)=>{

    try{
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {$set: req.body },  
         {new:true}
        );
        res.status(200).json(updatedProduct);
    }catch(err){
        res.status(500).json(err)
    }

});
//DELETE 
router.delete("/:id",  async (req, res)=>{
try{
        await Product.findByIdAndDelete(req.params.id,);
        res.status(200).json("Product has been delete");
    }catch(err){
        res.status(500).json(err)
    }
 
});
//GET Product BY ID
router.get("/:id", async (req, res)=>{
try{
     const product =   await Product.findById(req.params.id,);

     res.status(200).json(product);
    }catch(err){
        res.status(500).json(err)
    }

});
//GET ALL  PRODUCT
router.get("/",  async (req, res)=>{
    const qNew = req.query.new;
    const qCategory = req.query.category;
try{
    let products;

    if(qNew){
        products =await Product.find().sort({createAt: -1}).limit(3)
    }else if(qCategory){
        products = await Product.find({
            categories: {
                $sin: [qCategory],
            },
        })
    }else{
        products = await Product.find()
    }
     res.status(200).json(products);
    }catch(err){
        res.status(500).json(err)
    }

});









module.exports = router;