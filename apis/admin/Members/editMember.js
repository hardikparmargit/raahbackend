const { ObjectId } = require("mongodb");
const connectDB = require("../../../db/dbConnect");

async function EditMember(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('members');

        const { memberId, memberName, aboutMember, memberRole } = req.body;
        const memberPic = req.file?.filename;

        const memberExist = await collection.findOne({ _id: ObjectId.createFromHexString(memberId) });

        if (!memberExist) {
            return res.status(400).json({ success: false, message: "Member not found!" });
        }

        await collection.updateOne({ _id: ObjectId.createFromHexString(memberId) }, {
            $set: {
                memberName: memberName || memberExist.memberName,
                aboutMember: aboutMember || memberExist.aboutMember,
                memberRole: memberRole || memberExist.memberRole,
                memberPic: memberPic || memberExist.memberPic,
            }
        });

        return res
            .status(201)
            .json({ success: true, message: "Member Edited Successfully" });

    } catch (error) {
        console.error("EditMember.js:", error);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { EditMember };