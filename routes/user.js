const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");

const router = require("express").Router();


//UPDATE
router.put("/:id",  verifyTokenAndAuthorization, async (req, res)=>{
 if(req.body.password){
    const hash =bcrypt.hashSync(
        req.body.password, salt);
        password= hash;
 }
 try{
    const updateUser = await User.findByIdAndUpdate(req.params.id,{
        $set: req.body
    },{new: true});
    res.status(200).json(updateUser);
 }catch(err){
    res.status(500).json(err)
 }
});




module.exports = router;