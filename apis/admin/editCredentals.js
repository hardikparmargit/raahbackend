const connectDB = require("../../db/dbConnect");

async function EditCredentials(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('users');

        const { oldEmail, newEmail, oldPassword, newPassword } = req.body;

        if (!oldEmail || !newEmail || !oldPassword || !newPassword) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }

        const isExist = await collection.findOne({ email: oldEmail, password: oldPassword });

        if (!isExist) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        await collection.updateOne({ email: oldEmail }, {
            $set: {
                email: newEmail,
                password: newPassword
            }
        });

        return res
            .status(201)
            .json({ success: true, message: "Credentials Edited Successfully" });

    } catch (error) {
        console.error("EditCredentials.js:", error);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { EditCredentials };