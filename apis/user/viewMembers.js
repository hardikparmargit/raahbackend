const connectDB = require("../../db/dbConnect");

async function GetMember(req, res) {

    try {
        const db = await connectDB();
        const collection = db.collection("members");

        // const userId = req.session.user;
        // if (!userId) {
        //     return res.status(401).json({ success: false, message: "Unauthorized User!" });
        // }

        const members = await collection.find({ status: "Active" }).toArray();

        if (members.length === 0) {
            return res
                .status(400)
                .json({ success: false, message: "Member not found" });
        }

        res.status(200).json({
            members,
            success: true,
            message: "Member fetched Successfully",
        });

    } catch (error) {
        console.log("GetMember.js: ", error);
        res.status(500).json({ success: false, message: "members fetch Failed" });
    }
}

module.exports = { GetMember };
