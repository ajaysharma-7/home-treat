const mongoose = require("mongoose")

const regSchema = mongoose.Schema({
    email : {type : String , required: true},
    password : {type : String , required : true},
    mobile : {type : Number, required : true},
    name : {type :String, required :true},
    gender : {type : String},
    degree : String,
    working : String,
    address1 : String,
    registrationnumber : String,
    userimage : String,
    status : {type : String , default : "deactivate"},
    createdate : {type:Date, default : Date.now()}


})

module.exports = mongoose.model("reg", regSchema);