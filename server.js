const express = require("express")
const app = express()
require("dotenv").config()
app.use(express.urlencoded({extended:false}))
const userRouter = require("./router/usersrouter")
const adminRouter = require("./router/adminrouter")
const mongoose = require("mongoose")
const session = require("express-session")
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
app.use(session({
    secret: process.env.KEY,
    resave : false,
    saveUninitialized : false,

    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 2,

    }
}))


app.use("/admin",adminRouter)
app.use(userRouter)
app.use(express.static('public'))
app.set('view engine','ejs')
app.listen(process.env.PORT, ()=>{console.log(`your serve is runnning port ${process.env.PORT}`)})
