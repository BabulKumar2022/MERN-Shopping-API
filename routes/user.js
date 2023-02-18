const router = require("express").Router();



router.get("/userTest", (req, res)=>{
    res.send("test is successful  !!!");
});

// lh:5000/api/user/userTest


router.post("/usersPostTest", (req, res)=>{
    const username = req.body.username;
    res.send("your user name is" + username)
    console.log(username);
})

module.exports = router;