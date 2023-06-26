const express = require('express');
const jwt = require("jsonwebtoken");
const users = require("../models/users");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;


const authCheck = (req, res, next) => {
    const token = req.cookies["access-token"];
    if(token){
        jwt.verify(token, jwtSecret, async (err, decoded) => {
            //console.log("decoded -----> ", decoded);
            let {email} = decoded;
            let data = await users.getUserByEmail(email);
            //console.log("data: ",data)
            if(data.logged == true) {
                req.decoded = decoded;
                req.decoded.data = data;
                next();
            } else {
                console.log("Invalid token");
                req.logout(function(err) {
                    if (err) { return next(err); }
                    req.session.destroy();
                    res.clearCookie("access-token").redirect('/login');
                });
            }
        })
    } else {
        console.log("Token not provided");
        res.redirect("/login");
    }
}

const isUserLoggedCheck = (req, res, next) => {
    const token = req.cookies["access-token"];
    if(token){
        jwt.verify(token, jwtSecret, async (err, decoded) => {
            //console.log("decoded -----> ", decoded);
            let {email} = decoded;
            let data = await users.getUserByEmail(email);
            //console.log("data: ",data)
            if(data.logged == true) {
                req.decoded = decoded;
                req.decoded.data = data;
                next();
            } else {
                console.log("Invalid token");
                req.logout(function(err) {
                    if (err) { return next(err); }
                    req.session.destroy();
                    res.clearCookie("access-token").redirect('/login');
                });
            }
        })
    } else {
        console.log("Token not provided");
        res.status(200).json({"data":{}, "msj": "user not logged in"});
    }
}

const adminAuthCheck = (req, res, next) => {
    console.log(req.decoded.data);
    let admin = req.decoded.data.admin;
    if(admin){
        console.log("access granted");
        next();
    } else {
        console.log("restricted access");
        res.redirect("/");
    }
}

//module.exports = protectedRoutes;
module.exports = {
    authCheck,
    adminAuthCheck,
    isUserLoggedCheck
}