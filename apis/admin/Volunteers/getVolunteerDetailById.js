const { ObjectId } = require("mongodb");
const connectDB = require("../../../db/dbConnect");

async function GetVolunteerDetailById(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('volunteerRequest');

        const { reqId } = req.body;

        if (!reqId) {
            return res
                .status(400)
                .json({ success: false, message: "Missing required fields!" });
        }

        const volunteer = await collection.findOne({ _id: ObjectId.createFromHexString(reqId) });
        if (!volunteer) {
            return res
                .status(400)
                .json({ success: false, message: "Request Not Found!" });
        }

        return res
            .status(200)
            .json({ volunteer, success: true, message: "Requests fetched successfully" });

    } catch (error) {
        console.error("getApiRequest.js:", error);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { GetVolunteerDetailById }