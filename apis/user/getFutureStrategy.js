const { ObjectId } = require("mongodb");
const connectDB = require("../../db/dbConnect");

async function GetFutureStrategy(req, res) {

    try {
        const db = await connectDB();
        const collection = db.collection("strategy");

        const strategy = await collection.findOne({ _id: ObjectId.createFromHexString('660bdd9041bec0efcef0cdaf') });

        if (!strategy) {
            return res
                .status(400)
                .json({ success: false, message: "Strategy not found" });
        }

        res.status(200).json({
            strategy,
            success: true,
            message: "Strategy fetched Successfully",
        });

    } catch (error) {
        console.log("GetFutureStrategy.js: ", error);
        res.status(500).json({ success: false, message: "strategy fetch Failed" });
    }
}

module.exports = { GetFutureStrategy };
