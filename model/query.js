const mongoose =require("mongoose")

const querySchema = mongoose.Schema({
    name : {type : String , required : true},
    mobile : {type : Number , required :true},
    message :String
})
module.exports = mongoose.model("query", querySchema);