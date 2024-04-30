const connectDB = require("../db/dbConnect");

async function SignUpApi(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('users');

        const { name, email, role, phoneNo, address, password } = req.body;

        if (!name || !email || !role || !phoneNo || !address || !password) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        const userExist = await collection.findOne({ email });
        if (userExist) {
            return res
                .status(400)
                .json({ success: false, message: "Email Already Exist!" });
        }

        await collection.insertOne({
            name,
            email,
            role,
            phoneNo,
            address,
            password
        });

        return res
            .status(201)
            .json({ success: true, message: "Registration Successful" });

    } catch (error) {
        console.error("registerApi.js: ", error);
        return res.status(500).json({ success: false, error: "Registration Failed" });
    }
}

module.exports = { SignUpApi };