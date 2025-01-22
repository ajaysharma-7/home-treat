const reg = require("../model/reg")
const nodemailer = require("nodemailer")

exports.login = (req, res) => {
    try {
        res.render("login.ejs", { message: "" })
    } catch (error) {
        console.log(error.message)
    }

}
exports.logincheck = async (req, res) => {
    try {
        const { email, password } = req.body
        const logincheck = await reg.findOne({ email: email })
        if (logincheck !== null) {
            if (logincheck.password == password) {
                if (logincheck.status == "Active") {
                    req.session.username = logincheck.name
                    req.session.userid = logincheck.id
                    req.session.isAuth = true
                    if (logincheck.email !== process.env.ADMIN_EMAIL) {
                        res.redirect(`/profile/${logincheck._id}`)
                    } else {
                        res.redirect("/admin/deshboard")
                    }
                } else {
                    res.render('login.ejs', { message: "Your's Account is not Varify Please Check Your Email." })
                }
            } else {
                res.render('login.ejs', { message: "wrong Cradentails" })
            }
        } else {
            res.render('login.ejs', { message: "wrong Cradentails" })
        }
    } catch (error) {
        console.log(error.message)
    }

}
exports.forgotpasswordemail = (req, res) => {
    try {
        res.render("forgotpasswordemail.ejs", { message: "" })
    } catch (error) {
        console.log(error.message)
    }

}
exports.forgotlinksend = async (req, res) => {
    try {
        const { email } = req.body
        const emailValidate = await reg.findOne({ email: email })
        if (emailValidate !== null) {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: "testajaysharma@gmail.com",
                    pass: "mzunuwbrufuplcgn",
                },
            });
            const info = await transporter.sendMail({
                from: 'testajaysharma@gmail.com',
                to: email,
                subject: "Change Password Link form Home Care",
                text: "Hello world?",
                html: `<a href= "http://127.0.0.1:5000/forgot-password/${emailValidate._id}" >Change Password</a>`,
            });
            res.render("forgotpasswordemail.ejs", { message: "Change Password Link send your Email" })

        } else {
            res.render("forgotpasswordemail.ejs", { message: "Email Not Found" })
        }
    } catch (error) {
        console.log(error.message)
    }

}
exports.forgotpassword = (req, res) => {
    try {
        res.render("forgotpassword.ejs", { message: "" })
    } catch (error) {
        console.log(error.message)
    }

}
exports.passwordchange = async (req, res) => {
    try {
        const id = req.params.id
        const { password, confirm_password } = req.body
        if (password == confirm_password) {
            await reg.findByIdAndUpdate(id, { password: password })
            res.render("verifymessage.ejs", { message: "Password Successfully Changed" })
        } else {
            res.render("forgotpassword.ejs", { message: "password not matched" })
        }
    } catch (error) {
        console.log(error.message)
    }


}
exports.register = (req, res) => {
    try {
        res.render("register.ejs", { message: "" })
    } catch (error) {
        console.log(error.message)
    }

}
exports.createuser = async (req, res) => {
    try {
        const { email, mobile, password, confirmpassword, username } = req.body;
        if (password.trim() !== confirmpassword.trim()) {
            return res.render("register.ejs", { message: "Passwords do not match" });
        }
        const existingUser = await reg.findOne({ email: email });
        if (existingUser) {
            return res.render("register.ejs", { message: "Email is already registered" });
        }
        const newUser = new reg({
            email: email,
            password: password,
            mobile: mobile,
            name: username,
        });
        await newUser.save();
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "testajaysharma@gmail.com",
                pass: "mzunuwbrufuplcgn",
            },
        });
        const info = await transporter.sendMail({
            from: 'testajaysharma@gmail.com',
            to: email,
            subject: "Email verification mail form Home Care",
            text: "Hello world?",
            html: `<a href= "http://127.0.0.1:5000/emailverify/${newUser._id}" >click to verify</a>`,
        });

        res.render("register.ejs", { message: "Successfully Account has been Created. Please Check your email to verify " });
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).send("An error occurred while saving the user.");
    }
};
exports.emailverifiy = async (req, res) => {
    try {
        const id = req.params.id
        await reg.findByIdAndUpdate(id, { status: 'Active' })
        res.render("verifymessage.ejs", { message: "Your Account has been verified" })
    } catch (error) {
        console.log(error.message)
    }

}
exports.userprfile = async (req, res) => {
    try {
        const username = req.session.username
        const id = req.params.id
        const user = await reg.findById(id)
        res.render("userprofile.ejs", { user, username })
    } catch (error) {
        console.log(error.message)
    }
}
exports.updateprfile = async (req, res) => {
    try {
        const username = req.session.username
        const id = req.params.id
        const user = await reg.findById(id)
        res.render("updateprofile.ejs", { user, username })
    } catch (error) {
        console.log(error.message)
    }

}
exports.updateuserprofile = async (req, res) => {
    try {
        const id = req.params.id
        const { username, mobile, gender, degree, currently_working, registernumber, address } = req.body
        const recode = await reg.findByIdAndUpdate(id, {
            mobile: mobile,
            name: username,
            gender: gender,
            degree: degree,
            working: currently_working,
            address1: address,
            registrationnumber: registernumber,

        })
        recode.save()
        res.redirect(`/profile/${id}`)

    } catch (error) {
        console.log(error.message)
    }

}

exports.logout = (req, res) => {
    try {
        req.session.destroy()
        res.redirect("/login")
    } catch (error) {
        console.log(error.message)
    }

}