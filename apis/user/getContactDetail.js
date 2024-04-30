const { ObjectId } = require("mongodb");
const connectDB = require("../../db/dbConnect");

async function GetContatDetail(req, res) {

    try {
        const db = await connectDB();
        const collection = db.collection("contactDetail");

        const contactDetail = await collection.findOne({ _id: ObjectId.createFromHexString('660bc02741bec0efcef0cdae') });

        if (!contactDetail) {
            return res
                .status(400)
                .json({ success: false, message: "Contact Detail not found" });
        }

        res.status(200).json({
            contactDetail,
            success: true,
            message: "Contact Detail fetched Successfully",
        });

    } catch (error) {
        console.log("GetContatDetail.js: ", error);
        res.status(500).json({ success: false, message: "Contact Detail fetch Failed" });
    }
}

module.exports = { GetContatDetail };
