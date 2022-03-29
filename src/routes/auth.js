import express from "express";
import UserDetail from "../models/users.js";
import registrationValidation from '../validation.js';
import loginValidation from '../validation.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const router = express.Router();


router.post('/register', async (req, res) => {
    //validation befaore user
    const { error } = registrationValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    //check the user is already in database
    const emailexist = await UserDetail.findOne({ email: req.body.email })
    if (emailexist) return res.status(400).send("email already exist")

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //new user
    const user = new UserDetail({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const insert = await user.save();
        res.send(insert);
    } catch (e) {
        res.status(400).send(e)
    }
});

router.post('/login', async (req, res) => {
    // Validate data before user.
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if the email is exiting.
    let user = await UserDetail.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Email not found');

    // Checking the Password.
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid password');

    //create token 
    const token = jwt.sign({ _id: user._id }, "token");
    res.header('auth-token', token).send(token);
    // res.send('logged in ')
});
export default router;