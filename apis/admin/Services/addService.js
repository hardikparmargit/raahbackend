const { Timestamp } = require("mongodb");
const connectDB = require("../../../db/dbConnect");

async function AddService(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('services');

        const { serviceName, serviceDescription, serviceOutcome } = req.body;
        const servicePic = req.file.filename;

        if (!serviceName || !serviceDescription || !servicePic) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        await collection.insertOne({
            serviceName,
            serviceDescription,
            serviceOutcome,
            servicePic,
            status: "Active",
        });

        return res
            .status(201)
            .json({ success: true, message: "Service Added Successfully" });

    } catch (error) {
        console.error("AddService.js:", error);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { AddService };