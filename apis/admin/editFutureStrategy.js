const connectDB = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function EditFutureStrategy(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('strategy');

        const userId = req.session.user;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized User!" });
        }

        const { strategy } = req.body;

        const existingFutureStrategy = await collection.findOne({ _id: ObjectId.createFromHexString('660bdd9041bec0efcef0cdaf') });

        if (!existingFutureStrategy) {
            return res.status(404).json({ success: false, message: "Future Strategy not found!" });
        }

        await collection.updateOne({ _id: ObjectId.createFromHexString('660bdd9041bec0efcef0cdaf') }, { $set: { strategy } });

        return res.status(200).json({ success: true, message: "Future Strategy updated successfully" });
    } catch (error) {
        console.error("EditFutureStrategy.js: ", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

module.exports = { EditFutureStrategy };
