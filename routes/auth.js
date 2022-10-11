const router = require("express").Router();
const User = require("../models/User");

//USER REGISTRATION

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//USER LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if(user){
      const validPassword = req.body.password === user.password
      if(validPassword){
        res.status(200).json(user)
      } 
      else{ res.status(400).json("wrong password") }
    }
    else{ res.status(401).json("User not found!"); }

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
