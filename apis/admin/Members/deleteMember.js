const connectDB = require("../../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function DeleteMember(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('members');

        const userId = req.session.user;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized User!" });
        }

        const { memberId } = req.body;

        if (!ObjectId.isValid(memberId)) {
            return res.status(400).json({ success: false, message: "Invalid Member ID!" });
        }

        const deletedMember = await collection.updateOne({ _id: ObjectId.createFromHexString(memberId) }, { $set: { status: "inactive" } });

        if (deletedMember.modifiedCount === 0) {
            return res.status(404).json({ success: false, message: "Member not found!" });
        }

        return res.status(200).json({ success: true, message: "Member deleted successfully" });
    } catch (error) {
        console.error("DeleteMember.js: ", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

module.exports = { DeleteMember };
