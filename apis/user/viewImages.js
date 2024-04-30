const connectDB = require("../../db/dbConnect");

async function GetMedia(req, res) {

    try {
        const db = await connectDB();
        const collection = db.collection("media");

        // const userId = req.session.user;
        // if (!userId) {
        //     return res.status(401).json({ success: false, message: "Unauthorized User!" });
        // }

        const media = await collection.find({ status: "Active" }).toArray();

        if (media.length === 0) {
            return res
                .status(400)
                .json({ success: false, message: "Media not found" });
        }

        res.status(200).json({
            media,
            success: true,
            message: "Media fetched Successfully",
        });

    } catch (error) {
        console.log("GetMedia.js: ", error);
        res.status(500).json({ success: false, message: "Media fetch Failed" });
    }
}

module.exports = { GetMedia };
