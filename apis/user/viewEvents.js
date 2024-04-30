const connectDB = require("../../db/dbConnect");

async function GetEvents(req, res) {

    try {
        const db = await connectDB();
        const collection = db.collection("events");

        // const userId = req.session.user;
        // if (!userId) {
        //     return res.status(401).json({ success: false, message: "Unauthorized User!" });
        // }

        const events = await collection.find({status: "Active", eventDate: { $gte: new Date() }}).toArray();

        if (events.length === 0) {
            return res
                .status(400)
                .json({ success: false, message: "Event not found" });
        }

        res.status(200).json({
            events,
            success: true,
            message: "Event fetched Successfully",
        });

    } catch (error) {
        console.log("GetEvents.js: ", error);
        res.status(500).json({ success: false, message: "events fetch Failed" });
    }
}

module.exports = { GetEvents };
