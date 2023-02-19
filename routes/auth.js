const router = require("express").Router();
const User = require("../models/User");
const bcrypt =require("bcryptjs");
const jwt =require("jsonwebtoken");

//REGISTER  

router.post("/register", async (req, res)=>{

    const salt =bcrypt.genSaltSync(10);
    const hash =bcrypt.hashSync(
        req.body.password, salt);
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
    });
    try {
        const saveUser = await newUser.save()
        res.status(201).json(saveUser)
        console.log(saveUser);
    } catch (err) {
        res.status(500).json(err)
        console.log(err);
    }
    
});

// LOGIN


// router.post("/login", async(req, res)=>{
//     try {
//         const user = await User.findOne({username:req.body.username});
//        !user && res.status(401).json("Wrong credential")
       
//         const hashPassword = CryptoJS.AES.decrypt(
//             user.password,
//             process.env.PASS_SEC);
//             const password = hashPassword.toString(CryptoJS.env.Utf8)
//              password !== req.body.password &&
//               res.status(401).json("Wrong credential")

//               res.status(200).json(user);
            
//         } catch (err) {
//         res.status(500).json(err)
//         console.log(err);
//     }
// })      

router.post("/login", async(req, res, next)=>{
    try {
        const user = await User.findOne({username:req.body.username});

            !user && res.status(404).json("Wrong user name");

            const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

             !isPasswordCorrect && res.status(401).json("Wrong password")
 

            const accessToken = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            {expiresIn: "3d"}
            )


                


             const{password, ...other} = user._doc;
            res.status(200).json({...other, accessToken});
 
            
        } catch (err) {
        res.status(500).json(err)
        console.log(err);
    }
})



module.exports = router; 