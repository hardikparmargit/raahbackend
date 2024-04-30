const { ObjectId } = require("mongodb");
const connectDB = require("../../../db/dbConnect");

async function GetEventDetailById(req, res) {
  try {
    const db = await connectDB();
    const collection = db.collection("events");

    const { reqId } = req.body;

    if (!reqId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields!" });
    }

    const event = await collection.findOne({
      _id: ObjectId.createFromHexString(reqId),
    });
    if (!event) {
      return res
        .status(400)
        .json({ success: false, message: "Request Not Found!" });
    }

    return res
      .status(200)
      .json({
        event,
        success: true,
        message: "Requests fetched successfully",
      });
  } catch (error) {
    console.error("getApiRequest.js:", error);
    return res
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
}

module.exports = { GetEventDetailById };
