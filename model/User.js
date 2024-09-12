const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type:String,
        enum:["admin",'instructor','student'],
        default:'student'
    },
    lastLogin: Date,
},{timestamps:true});

module.exports = mongoose.model('User',userSchema);