const router = require("express").Router()
const admincontroller = require("../controller/admincontroller")
const sessionCheck = require("../helper/sessioncheck")


router.get("/deshboard",sessionCheck , admincontroller.deshboard)
router.get("/alluser" ,sessionCheck, admincontroller.alluser)
router.get("/allbooking" ,sessionCheck, admincontroller.allbooking)
router.get("/allquery" ,sessionCheck, admincontroller.allquery)
router.get("/deletequery/:id", sessionCheck, admincontroller.deletequery)
module.exports= router