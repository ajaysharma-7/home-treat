const router = require("express").Router()
const registercontroller = require("../controller/registercontroller")
const pagecontroller = require("../controller/pagecontroller")
const sessionCheck = require("../helper/sessioncheck")

router.get("/login",registercontroller.login)
router.post("/login",registercontroller.logincheck)
router.get("/forgotpassword-email", registercontroller.forgotpasswordemail)
router.post("/forgotpassword-email",registercontroller.forgotlinksend)
router.get("/forgot-password/:id" , registercontroller.forgotpassword)
router.post("/forgot-password/:id" , registercontroller.passwordchange)

router.get("/profile/:id",sessionCheck, registercontroller.userprfile)
router.get("/updateprofile/:id",sessionCheck, registercontroller.updateprfile)
router.post("/updateprofile/:id",sessionCheck, registercontroller.updateuserprofile)

router.get("/register",registercontroller.register)
router.post("/register",registercontroller.createuser)
router.get("/emailverify/:id", registercontroller.emailverifiy)

router.get("/logout",sessionCheck ,registercontroller.logout)

router.get("/",pagecontroller.homepage)
router.get("/about-us",pagecontroller.aboutuspage)
router.get("/contact-us",pagecontroller.contantpage)

router.get("/home-care-service",pagecontroller.servicepage)
router.get("/nurse-on-call",pagecontroller.nurseoncallpage)
router.get("/doctor-at-home",pagecontroller.DoctoratHomepage)

router.post("/booknow", pagecontroller.booknowform)
router.get("/thankyou-message", pagecontroller.thankyou)

router.post("/contact-us",pagecontroller.contantform)
module.exports=router