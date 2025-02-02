const reg = require("../model/reg")
const book = require("../model/book")
const query = require("../model/query")
exports.deshboard = (req, res) => {
    try {
        const username = req.session.username
        res.render("deshboard.ejs", { username })
    } catch (error) {
        console.log(error.message)
    }

}
exports.alluser = async (req, res) => {
    try {
        const username = req.session.username;
        const alluser = await reg.find()
        res.render("alluser.ejs", { alluser, username })
    } catch (error) {
        console.log(error.message)
    }

}
exports.filterByAddress = async (req, res) => {
    try {
        const username = req.session.username;
        const searchQuery = req.query.address || ''; 

        const filteredUsers = await reg.find({
            address1: { $regex: searchQuery, $options: 'i' }
        });

        res.render("alluser.ejs", { alluser: filteredUsers, username });
    } catch (error) {
        console.log(error.message);
    }
};

exports.allbooking = async (req, res) => {
    try {
        const username = req.session.username;
        const allbooking = await book.find()
        res.render("allbooking.ejs", { allbooking, username })
    } catch (error) {
        console.log(error.message)
    }
}
exports.filteredBooking = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ message: "Start date and end date are required" });
        }

        // Set start time to 00:00:00 and end time to 23:59:59
        const start = new Date(startDate + "T00:00:00.000Z");
        const end = new Date(endDate + "T23:59:59.999Z");
        const filteredBookings = await book.find({
            createdDate: {
                $gte: start,
                $lte: end
            }
        });
        res.json(filteredBookings);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.allquery = async (req, res) => {
    try {
        const username = req.session.username;
        const allquery = await query.find()
        res.render("allquery.ejs", { allquery, username })
    } catch (error) {
        console.log(error.message)
    }
}
exports.deletequery = async (req, res) => {
    try {
        const id = req.params.id
        await query.findByIdAndDelete(id)
        res.redirect("/admin/allquery")
    } catch (error) {
        console.log(error.message)
    }
}