const connectDB = require("../../db/dbConnect");

async function GetFeedback(req, res) {

    try {
        const db = await connectDB();
        const collection = db.collection("feedback");

        // const userId = req.session.user;
        // if (!userId) {
        //     return res.status(401).json({ success: false, message: "Unauthorized User!" });
        // }

        const feedback = await collection.find().toArray();

        if (feedback.length === 0) {
            return res
                .status(400)
                .json({ success: false, message: "Feedback not found" });
        }

        res.status(200).json({
            feedback,
            success: true,
            message: "Feedback fetched Successfully",
        });

    } catch (error) {
        console.log("GetFeedback.js: ", error);
        res.status(500).json({ success: false, message: "Feedback fetch Failed" });
    }
}

module.exports = { GetFeedback };
