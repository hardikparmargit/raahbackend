
const { ObjectId } = require("mongodb");
const connectDB = require("../../../db/dbConnect");

async function EditService(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('services');

        const { serviceId, serviceName, serviceDescription, serviceOutcome } = req.body;
        const servicePic = req.file.filename;

        const serviceExist = await collection.findOne({ _id: ObjectId.createFromHexString(serviceId) });
        if (!serviceExist) {
            return res.status(400).json({ success: false, message: "Event not found!" });
        }

        await collection.updateOne({ _id: ObjectId.createFromHexString(serviceId) }, {
            $set: {
                serviceName: serviceName || serviceExist.serviceName,
                serviceDescription: serviceDescription || serviceExist.serviceDescription,
                serviceOutcome: serviceOutcome || serviceExist.serviceOutcome,
                servicePic: servicePic || serviceExist.servicePic,
            }
        });

        return res
            .status(201)
            .json({ success: true, message: "Service Edited Successfully" });

    } catch (error) {
        console.error("EditService.js:", error);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { EditService };