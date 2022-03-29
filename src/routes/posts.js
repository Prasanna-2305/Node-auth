import auth from "./tokenverify.js";
import express from "express";
const post = new express.Router();

post.get('/', auth, (req, res)=>{
    res.json({
        posts : {
            title :" My First Post",
            description : 'Random data you should not access.'
        }
    });
})

export default post;