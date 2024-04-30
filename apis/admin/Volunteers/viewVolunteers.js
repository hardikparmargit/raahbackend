const connectDB = require("../../../db/dbConnect");

async function GetVolunteers(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('volunteerRequest');

        const volunteers = await collection.find({ status: { $ne: "Pending" } }).toArray();

        if (volunteers.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "No volunteers found" });
        }

        return res
            .status(200)
            .json({ volunteers, success: true, message: "Volunteers fetched successfully" });

    } catch (error) {
        console.error("GetVolunteers.js:", error);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { GetVolunteers }