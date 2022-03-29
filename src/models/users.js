import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
//Schema
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    }
})
const UserDetail = new mongoose.model('UserDetail', userSchema)
export default UserDetail;
