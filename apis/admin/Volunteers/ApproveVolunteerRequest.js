const { ObjectId } = require("mongodb");
const connectDB = require("../../../db/dbConnect");

async function ApproveVolunteerRequest(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection("volunteerRequest");
        const { reqId, status } = req.body;

        if (!reqId || !status) {
            return res
                .status(400)
                .json({ success: false, message: "Missing required fields!" });
        }

        if (status !== "approved" && status !== "rejected") {
            return res
                .status(400)
                .json({ success: false, message: "Approve or reject not defined!" });
        }

        const result = await collection.updateOne(
            { _id: ObjectId.createFromHexString(reqId) },
            { $set: { status: status, requestUpdateDate: new Date() } }
        );

        if (result.modifiedCount === 0) {
            return res
                .status(404)
                .json({ success: false, message: "Request not found!" });
        }
        if (status === "approved") {
            return res
                .status(201)
                .json({ success: true, message: "Request Approved Successfully" });
        }
        if (status === "rejected") {
            return res
                .status(201)
                .json({ success: true, message: "Request Rejected Successfully" });
        }
    } catch (error) {
        console.error("addVolunteerRequest.js:", error);
        return res
            .status(500)
            .json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { ApproveVolunteerRequest };
