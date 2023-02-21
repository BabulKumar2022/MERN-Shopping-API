const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");


const router = require("express").Router();



// /UPDATE 
router.put("/:id", verifyTokenAndAuthorization, async (req, res)=>{
    if(req.body.password){
        const hash = bcrypt.hashSync(
            req.body.password, salt);
            req.body.password= hash;
    }try{
        const updatedUser =await User.findByIdAndUpdate(
            req.params.id,
            {$set: req.body },  
         {new:true}
        );
        res.status(200).json(updatedUser);
    }catch(err){
        res.status(500).json(err)
    }

});


module.exports = router;