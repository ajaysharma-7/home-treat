const router = require("express").Router()
const admincontroller = require("../controller/admincontroller")
const sessionCheck = require("../helper/sessioncheck")


router.get("/deshboard",sessionCheck , admincontroller.deshboard)
router.get("/alluser" ,sessionCheck, admincontroller.alluser)
router.get("/alluser/search", sessionCheck, admincontroller.filterByAddress);

router.get("/allbooking" ,sessionCheck, admincontroller.allbooking)
router.get("/allbooking/filter", sessionCheck, admincontroller.filteredBooking);

router.get("/allquery" ,sessionCheck, admincontroller.allquery)
router.get("/deletequery/:id", sessionCheck, admincontroller.deletequery)
module.exports= router