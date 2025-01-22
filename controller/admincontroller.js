const reg = require("../model/reg")
const book = require("../model/book") 
const  query= require("../model/query")
exports.deshboard = (req, res)=>{
    try{
        const username = req.session.username
        res.render("deshboard.ejs", {username})
    }catch(error){
        console.log(error.message)
    }
    
}
exports.alluser = async(req, res)=>{
    try{
    const username = req.session.username;
     const alluser = await reg.find()
     res.render("alluser.ejs", {alluser, username})
    }catch(error){
        console.log(error.message)
    } 

}
exports.allbooking= async(req, res)=>{
    try{
    const username = req.session.username;
     const allbooking= await book.find()
     res.render("allbooking.ejs", {allbooking, username})
    }catch(error){
        console.log(error.message)
    } 
}
exports.allquery= async(req, res)=>{
    try{
    const username = req.session.username;
     const allquery= await query.find()
     res.render("allquery.ejs", {allquery, username})
    }catch(error){
        console.log(error.message)
    } 
}
exports.deletequery = async(req,res)=>{
    try{
       const id = req.params.id
        await query.findByIdAndDelete(id)
        res.redirect("/admin/allquery")
    }catch(error){
        console.log(error.message)
    }
}