const { Timestamp } = require("mongodb");
const connectDB = require("../../../db/dbConnect");
const sharp = require("sharp");

async function AddMediaImages(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('media');

        const { mediaCaption } = req.body;
        const mediaImage = req.file.filename;

        if (!mediaCaption || !mediaImage) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }
        // Get image dimensions
        const imageInfo = await sharp(req.file.path).metadata();
        const { width, height } = imageInfo;

        await collection.insertOne({
            mediaCaption,
            mediaImage,
            mediaWidth: width, // Add width to the document
            mediaHeight: height, // Add height to the document
            date: new Date(),
            status: "Active",
        });

        return res
            .status(201)
            .json({ success: true, message: "Media Added Successfully" });

    } catch (error) {
        console.error("AddMediaImages.js:", error);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { AddMediaImages };