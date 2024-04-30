const { ObjectId } = require("mongodb");
const connectDB = require("../../../db/dbConnect");
const sharp = require("sharp");

async function EditMedia(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('media');

        const { mediaId, mediaCaption } = req.body;
        const mediaImage = req.file.filename;

        const mediaExist = await collection.findOne({ _id: ObjectId.createFromHexString(mediaId) });
        if (!mediaExist) {
            return res.status(400).json({ success: false, message: "Media not found!" });
        }

        // Get image dimensions
        const imageInfo = await sharp(req.file.path).metadata();
        const { width, height } = imageInfo;

        await collection.updateOne({ _id: ObjectId.createFromHexString(mediaId) }, {
            $set: {
                mediaCaption,
                mediaImage,
                mediaWidth: width, // Add width to the document
                mediaHeight: height, // Add height to the document
            }
        });

        return res
            .status(201)
            .json({ success: true, message: "Media Edited Successfully" });

    } catch (error) {
        console.error("EditMedia.js:", error);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { EditMedia };
