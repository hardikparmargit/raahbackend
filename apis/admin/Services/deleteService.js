const connectDB = require("../../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function DeleteService(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('services');

        const userId = req.session.user;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized User!" });
        }

        const { serviceId } = req.body;

        if (!ObjectId.isValid(serviceId)) {
            return res.status(400).json({ success: false, message: "Invalid Service ID!" });
        }

        const deletedService = await collection.updateOne({ _id: ObjectId.createFromHexString(serviceId) }, { $set: { status: "inactive" } });

        if (deletedService.modifiedCount === 0) {
            return res.status(404).json({ success: false, message: "Service not found!" });
        }

        return res.status(200).json({ success: true, message: "Service deleted successfully" });
    } catch (error) {
        console.error("DeleteService.js: ", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

module.exports = { DeleteService };
