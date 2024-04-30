const { Timestamp } = require("mongodb");
const connectDB = require("../../../db/dbConnect");

async function AddMember(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('members');

        const { memberName, aboutMember, memberRole } = req.body;
        const memberPic = req.file.filename;

        if (!memberName || !aboutMember || !memberRole || !memberPic) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        await collection.insertOne({
            memberName,
            aboutMember,
            memberRole,
            memberPic,
            date: new Date(),
            status: "Active",
        });

        return res
            .status(201)
            .json({ success: true, message: "Member Added Successfully" });

    } catch (error) {
        console.error("AddMember.js:", error);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { AddMember };