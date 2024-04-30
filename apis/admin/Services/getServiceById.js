const { ObjectId } = require("mongodb");
const connectDB = require("../../../db/dbConnect");

async function GetServiceById(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('services');

        const { reqId } = req.body;

        if (!reqId) {
            return res
                .status(400)
                .json({ success: false, message: "Missing required fields!" });
        }

        const service = await collection.findOne({ _id: ObjectId.createFromHexString(reqId) });
        if (!service) {
            return res
                .status(400)
                .json({ success: false, message: "Service Not Found!" });
        }

        return res
            .status(200)
            .json({ service, success: true, message: "Service fetched successfully" });

    } catch (error) {
        console.error("GetServiceById.js:", error);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { GetServiceById }