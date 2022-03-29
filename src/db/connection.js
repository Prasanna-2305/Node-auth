import mongoose from "mongoose";
mongoose.connect('mongodb://127.0.0.1:27017/userDb', {
    useNewUrlParser: true,
}).then(() => {
    console.log("connected to db")
}).catch(() => {
    console.log("connection failed")
})