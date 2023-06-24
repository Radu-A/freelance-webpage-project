const express = require('express');
const jwt = require("jsonwebtoken");
const users = require("../models/users");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;


const authCheck = (req, res, next) => {
    const token = req.cookies["access-token"];
    console.log("-----> ", req.cookies["access-token"]);
    if(token){
        jwt.verify(token, jwtSecret, async (err, decoded) => {
            console.log("decoded -----> ", decoded);
            let {email} = decoded;
            let data = await users.getUserByEmail(email);
            console.log("data: ",data)
            console.log("data.logged: ",data.logged)
            if(data.logged == true) {
                req.decoded = decoded;
                req.decoded.data = data;
                next();
            } else {
                return res.json({message: "Invalid token"});
            }
        })
    } else {
        res.send({
            message: "Token not provided"
        })
    }
}


//module.exports = protectedRoutes;
module.exports = {
    authCheck
}