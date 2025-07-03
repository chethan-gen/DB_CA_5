const express = require('express');
const User = require("../models/User");
const router = express.Router();

router.post("/users",async(req,res)=>{
    try {
        const{username,email,password} = req.body;
    if(!username || !email || !password){
        return res.status(404).json({message:'Please fill all the required fields'});
    }
    const newUser = new User({
        username,
        email,
        password
    });
    await newUser.save();
    return res.status(200).json({message:'User registered successfully'});
    } catch (error) {
        return res.status(500).json({message:'Something went wrong',error:error});
    }
});

module.exports = router;