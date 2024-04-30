const connectDB = require("../../db/dbConnect");

async function GetCounts(req, res) {

    try {
        const db = await connectDB();
        const eventCollection = db.collection("events");
        const volunteerCollection = db.collection("volunteerRequest");

        // const userId = req.session.user;
        // if (!userId) {
        //     return res.status(401).json({ success: false, message: "Unauthorized User!" });
        // }

        const today = new Date();
        const doneEventCount = await eventCollection.countDocuments({ eventDate: { $lt: today } });
        const pendingVolunteerCount = await volunteerCollection.countDocuments({ status: "Pending" });
        const approvedVolunteerCount = await volunteerCollection.countDocuments({ status: "approved" });

        const counts = {
            doneEventCount,
            pendingVolunteerCount,
            approvedVolunteerCount,
        };

        res.status(200).json({
            counts,
            success: true,
            message: "Counts fetched Successfully",
        });

    } catch (error) {
        console.log("GetCounts.js: ", error);
        res.status(500).json({ success: false, message: "Counts fetch Failed" });
    }
}

module.exports = { GetCounts };