const book = require("../model/book")
const query = require("../model/query")

exports.homepage = (req, res) => {
    try {
        res.render("index.ejs")
    } catch (error) {
        console.log(error.message)
    }
}

exports.aboutuspage = (req, res) => {

    try {
        res.render("about.ejs")
    } catch (error) {
        console.log(error.message)
    }
}
exports.contantpage = (req, res) => {
    try {
        res.render("contact.ejs")
    } catch (error) {
        console.log(error.message)
    }

}
exports.servicepage = (req, res) => {
    try {
        res.render("service.ejs")

    } catch (error) {
        console.log(error.message)

    }

}
exports.thankyou = (req, res) => {
    try {
        res.render("thankyoumessage.ejs")

    } catch (error) {
        console.log(error.message)

    }

}
exports.booknowform = async (req, res) => {
    try {
        const { usename, mobilenumber, address, date, time } = req.body;
        const recode = new book({
            name: usename,
            mobilenumber: mobilenumber,
            address: address,
            date: date,
            time: time,
        });
        await recode.save();
        res.redirect("/thankyou-message");

    } catch (error) {
        console.log(error.message);
    }
};

exports.contantform = async (req, res) => {
    try {
        const { userName, userphonenumber, userMessage } = req.body;
        const recode = new query({
            name: userName,
            mobile: userphonenumber,
            message: userMessage
        });
        await recode.save();
        res.redirect("/thankyou-message");

    } catch (error) {
        console.log(error.message);
    }
}
