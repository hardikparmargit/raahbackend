const connectDB = require("../../db/dbConnect");

async function GetCountsUser(req, res) {

    try {
        const db = await connectDB();
        const eventCollection = db.collection("events");
        const volunteerCollection = db.collection("volunteerRequest");
        const servicesCollection = db.collection("services");

        // const userId = req.session.user;
        // if (!userId) {
        //     return res.status(401).json({ success: false, message: "Unauthorized User!" });
        // }

        const today = new Date();
        const doneEventCount = await eventCollection.countDocuments({ eventDate: { $lt: today } });
        const approvedVolunteerCount = await volunteerCollection.countDocuments({ status: "approved" });
        const servicesCount = await servicesCollection.countDocuments({ status: "Active" });

        const counts = {
            doneEventCount,
            servicesCount,
            approvedVolunteerCount,
        };

        res.status(200).json({
            counts,
            success: true,
            message: "Counts fetched Successfully",
        });

    } catch (error) {
        console.log("GetCountsUser.js: ", error);
        res.status(500).json({ success: false, message: "Counts fetch Failed" });
    }
}

module.exports = { GetCountsUser };