const connectDB = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function EditContactDetail(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('contactDetail');

        const userId = req.session.user;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized User!" });
        }

        const { address, phone_1, phone_2, email_1, email_2 } = req.body;

        const existingContactDetail = await collection.findOne({ _id: ObjectId.createFromHexString('660bc02741bec0efcef0cdae') });

        if (!existingContactDetail) {
            return res.status(404).json({ success: false, message: "Contact Detail not found!" });
        }

        const updatedContactDetail = {
            address: address || existingContactDetail.address,
            phone_1: phone_1 || existingContactDetail.phone_1,
            phone_2: phone_2 || existingContactDetail.phone_2,
            email_1: email_1 || existingContactDetail.email_1,
            email_2: email_2 || existingContactDetail.email_2
        };

        await collection.updateOne({ _id: ObjectId.createFromHexString('660bc02741bec0efcef0cdae') }, { $set: updatedContactDetail });

        return res.status(200).json({ success: true, message: "Contact Detail updated successfully" });
    } catch (error) {
        console.error("EditContactDetail.js: ", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

module.exports = { EditContactDetail };
