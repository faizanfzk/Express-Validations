const express=require("express");
const { body, validationResult } = require('express-validator');
const User=require("../model/user.model")

const router=express.Router();

router.post("/",body("first_name").trim().not().isEmpty().withMessage("first name is required"),
body("last_name").trim().not().isEmpty().withMessage("last name is required"),
body("email").isEmail().withMessage("email is required").custom(async(value)=>{
    const user=await User.findOne({email:value});

    if(user){
        throw new Error("email is already taken")
    }
    return true;
}),
body("pincode").not().isEmpty().isNumeric().withMessage("pincode is required").custom(async(value)=>{
    if(!value.length==6){
        throw new Error("Pincode must be 6 digit long")
    }
    return true
}),
body("age").not().isEmpty().withMessage("Age cannot be empty").isNumeric().withMessage("age must be a number and between 1 and 100").custom(async(value)=>{
    if(value<1||value>100){
        throw new Error("Incorrect age")
    }
    return true;
}),
body("gender").not().isEmpty().withMessage("gender is required"),


async(req,res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    const user=await User.create(req.body);
    return res.status(201).send(user)
    }
    catch(err){
        return res.status(500).send(err.message)
    }
});

module.exports=router;