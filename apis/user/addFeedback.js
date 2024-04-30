const connectDB = require("../../db/dbConnect");

async function AddFeedback(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection("feedback");

        const { username, email, phone, subject, message } = req.body;

        if (!username || !email || !phone || !subject || !message) {
            return res
                .status(400)
                .json({ success: false, message: "Missing required fields!" });
        }

        await collection.insertOne({
            username,
            email,
            phone,
            subject,
            message,
            date: new Date(),
        });

        return res
            .status(201)
            .json({ success: true, message: "Feedback added successfully" });

    } catch (error) {
        console.error("Feedback.js: ", error);
        return res
            .status(500)
            .json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { AddFeedback };
