function hanldsessionCheck (req, res, next){
if(req.session.isAuth){
    next()
} else{
    res.redirect("/login")
}
}
module.exports = hanldsessionCheck