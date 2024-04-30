const connectDB = require("../../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function DeleteEvent(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('events');

        const userId = req.session.user;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized User!" });
        }

        const { eventId } = req.body;

        if (!ObjectId.isValid(eventId)) {
            return res.status(400).json({ success: false, message: "Invalid Event ID!" });
        }

        const deletedEvent = await collection.updateOne({ _id: ObjectId.createFromHexString(eventId) }, { $set: { status: "inactive" } });

        if (deletedEvent.modifiedCount === 0) {
            return res.status(404).json({ success: false, message: "Event not found!" });
        }

        return res.status(200).json({ success: true, message: "Event deleted successfully" });
    } catch (error) {
        console.error("DeleteEvent.js: ", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

module.exports = { DeleteEvent };
