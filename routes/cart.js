const router = require("express").Router();
const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("./verifyToken");


//CREATE
router.post("/", verifyToken, async (req,res)=>{

        const newCart = new Cart(req.body);


    try {
        const saveCart =await newCart.save();
        res.status(200).json(saveCart);
        
    } catch (err) {
        res.status(500).json(err);
    }

});


// /UPDATE  Cart
router.put("/:id", verifyTokenAndAuthorization, async (req, res)=>{

    try{
        const updatedCart =await Cart.findByIdAndUpdate(
            req.params.id,
            {$set: req.body },  
         {new:true}
        );
        res.status(200).json(updatedCart);
    }catch(err){
        res.status(500).json(err)
    }

});
// DELETE Cart
router.delete("/:id", verifyTokenAndAuthorization, async (req, res)=>{
try{
        await Cart.findByIdAndDelete(req.params.id,);
        res.status(200).json("Cart has been delete");
    }catch(err){
        res.status(500).json(err)
    }
 
});


//GET User Cart BY ID


router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res)=>{
try{
     const cart =   await Cart.findOne({userId: req.params.userId});

     res.status(200).json(cart);
    }catch(err){
        res.status(500).json(err)
    }

});




//GET ALL  
router.get("/", verifyTokenAndAdmin, async (req, res)=>{

    try {
        
    } catch (err) {
        
    }
})










module.exports = router;