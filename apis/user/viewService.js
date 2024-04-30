const connectDB = require("../../db/dbConnect");

async function GetService(req, res) {

    try {
        const db = await connectDB();
        const collection = db.collection("services");

        // const userId = req.session.user;
        // if (!userId) {
        //     return res.status(401).json({ success: false, message: "Unauthorized User!" });
        // }

        const services = await collection.find({ status: "Active" }).toArray();

        if (services.length === 0) {
            return res
                .status(400)
                .json({ success: false, message: "Service not found" });
        }

        res.status(200).json({
            services,
            success: true,
            message: "Service fetched Successfully",
        });

    } catch (error) {
        console.log("GetService.js: ", error);
        res.status(500).json({ success: false, message: "Services fetch Failed" });
    }
}

module.exports = { GetService };
