const connectDB = require("../../../db/dbConnect");

async function GetVolunteerRequest(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('volunteerRequest');

        const requests = await collection.find({ status: "Pending" }).toArray();

        if (requests.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "No requests found" });
        }

        return res
            .status(200)
            .json({ requests, success: true, message: "Requests fetched successfully" });

    } catch (error) {
        console.error("GetVolunteerRequest.js:", error);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { GetVolunteerRequest }