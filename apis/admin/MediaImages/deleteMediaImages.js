const connectDB = require("../../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function DeleteMedia(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection("media");

        const userId = req.session.user;
        if (!userId) {
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized User!" });
        }

        const { mediaId } = req.body;

        if (!ObjectId.isValid(mediaId)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid Media ID!" });
        }

        const deletedMedia = await collection.updateOne(
            { _id: ObjectId.createFromHexString(mediaId) },
            { $set: { status: "inactive" } }
        );

        if (deletedMedia.modifiedCount === 0) {
            return res
                .status(404)
                .json({ success: false, message: "Media not found!" });
        }

        return res
            .status(200)
            .json({ success: true, message: "Media deleted successfully" });
    } catch (error) {
        console.error("DeleteMedia.js: ", error);
        return res
            .status(500)
            .json({ success: false, message: "Something went wrong" });
    }
}

module.exports = { DeleteMedia };
