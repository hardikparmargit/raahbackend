const { Timestamp } = require("mongodb");
const connectDB = require("../../../db/dbConnect");

async function AddEvent(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('events');

        const { eventName, eventDate, eventTime, eventAddress, eventState, eventCity, eventDescription } = req.body;
        const eventPic = req.file.filename;

        if (!eventName || !eventDate || !eventTime || !eventAddress || !eventState || !eventCity || !eventDescription || !eventPic) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        await collection.insertOne({
            eventName,
            eventDate: new Date(eventDate + "T" + eventTime),
            eventAddress,
            eventState,
            eventCity,
            eventDescription,
            eventPic,
            status: "Active",
        });

        return res
            .status(201)
            .json({ success: true, message: "Event Added Successfully" });

    } catch (error) {
        console.error("AddEvent.js:", error);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { AddEvent };