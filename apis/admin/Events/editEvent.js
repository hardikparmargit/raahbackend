
const { ObjectId } = require("mongodb");
const connectDB = require("../../../db/dbConnect");

async function EditEvent(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('events');

        const { eventId, eventName, eventDate, eventTime, eventAddress, eventState, eventCity, eventDescription } = req.body;
        const eventPic = req.file.filename;

        const eventExist = await collection.findOne({ _id: ObjectId.createFromHexString(eventId) });
        if (!eventExist) {
            return res.status(400).json({ success: false, message: "Event not found!" });
        }

        await collection.updateOne({ _id: ObjectId.createFromHexString(eventId) }, {
            $set: {
                eventName: eventName || eventExist.eventName,
                eventDate: new Date(eventDate + "T" + eventTime) || new Date(eventExist.eventDate),
                eventAddress: eventAddress || eventExist.eventAddress,
                eventState: eventState || eventExist.eventState,
                eventCity: eventCity || eventExist.eventCity,
                eventDescription: eventDescription || eventExist.eventDescription,
                eventPic: eventPic || eventExist.eventPic,
            }
        });

        return res
            .status(201)
            .json({ success: true, message: "Event Edited Successfully" });

    } catch (error) {
        console.error("EditEvent.js:", error);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { EditEvent };