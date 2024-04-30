const express = require("express");
const connectDB = require("./db/dbConnect");
const cors = require("cors");
const session = require("express-session");
const { LoginApi } = require("./apis/loginApi");
const { SignUpApi } = require("./apis/registerApi");
const Session = require("./apis/session");
const Logout = require("./apis/logout");
const { AddVolunteerRequest } = require("./apis/user/addVolunteerRequest");
const { GetVolunteerRequest } = require("./apis/admin/Volunteers/getVolunteerRequest");
const { profilePicUpload, eventPicUpload, servicePicUpload, memberPicUpload, mediaPicUpload } = require("./multer/multer");
const { ApproveVolunteerRequest } = require("./apis/admin/Volunteers/ApproveVolunteerRequest");
const { GetVolunteerDetailById } = require("./apis/admin/Volunteers/getVolunteerDetailById");
const { AddFeedback } = require("./apis/user/addFeedback");
const { ContactUs } = require("./apis/user/addContactUs");
const { GetFeedback } = require("./apis/admin/getFeedback");
const { GetContactUs } = require("./apis/admin/getContactUs");
const { AddEvent } = require("./apis/admin/Events/addEvent");
const { GetEvents } = require("./apis/user/viewEvents");
const { DeleteEvent } = require("./apis/admin/Events/deleteEvent");
const { EditEvent } = require("./apis/admin/Events/editEvent");
const { GetVolunteers } = require("./apis/admin/Volunteers/viewVolunteers");
const { AddService } = require("./apis/admin/Services/addService");
const { EditService } = require("./apis/admin/Services/editService");
const { DeleteService } = require("./apis/admin/Services/deleteService");
const { GetService } = require("./apis/user/viewService");
const { GetServiceById } = require("./apis/admin/Services/getServiceById");
const { GetEventDetailById } = require("./apis/admin/Events/getEventDetailById");
const { EditContactDetail } = require("./apis/admin/editContactDetail");
const { GetMember } = require("./apis/user/viewMembers");
const { AddMember } = require("./apis/admin/Members/addMember");
const { EditMember } = require("./apis/admin/Members/editMember");
const { DeleteMember } = require("./apis/admin/Members/deleteMember");
const { GetContatDetail } = require("./apis/user/getContactDetail");
const { GetFutureStrategy } = require("./apis/user/getFutureStrategy");
const { EditFutureStrategy } = require("./apis/admin/editFutureStrategy");
const { GetCounts } = require("./apis/admin/counts");
const { EditCredentials } = require("./apis/admin/editCredentals");
const { AddMediaImages } = require("./apis/admin/MediaImages/addMediaImages");
const { EditMedia } = require("./apis/admin/MediaImages/editMediaImages");
const { DeleteMedia } = require("./apis/admin/MediaImages/deleteMediaImages");
const { GetMedia } = require("./apis/user/viewImages");
const { GetCountsUser } = require("./apis/user/counts");
require("dotenv").config();

//initialize app
const app = express();

//initialize PORT No
const PORTS = 8000;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001","https://raahngouser.onrender.com/"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

// Configure express-session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use("/images/profilePics", express.static("images/profilePics"));
app.use("/images/eventPics", express.static("images/eventPics"));
app.use("/images/servicePics", express.static("images/servicePics"));
app.use("/images/memberPics", express.static("images/memberPics"));
app.use("/images/mediaPics", express.static("images/mediaPics"));

//callback to connect MongoDB
connectDB();

//!admin apis
app.post("/editCredentials", EditCredentials);
app.post("/addEvent", eventPicUpload.single("eventPic"), AddEvent);
app.post("/editEvent", eventPicUpload.single("eventPic"), EditEvent);
app.post("/deleteEvent", DeleteEvent);
app.post("/addService", servicePicUpload.single("servicePic"), AddService);
app.post("/editService", servicePicUpload.single("servicePic"), EditService);
app.post("/deleteService", DeleteService);
app.post("/addMember", memberPicUpload.single("memberPic"), AddMember);
app.post("/editMember", memberPicUpload.single("memberPic"), EditMember);
app.post("/deleteMember", DeleteMember);
app.post("/addMedia", mediaPicUpload.single("mediaImage"), AddMediaImages);
app.post("/editMedia", mediaPicUpload.single("mediaImage"), EditMedia);
app.post("/deleteMedia", DeleteMedia);
app.post("/getVolunteerRequest", GetVolunteerRequest);
app.post("/approveVolunteerRequest", ApproveVolunteerRequest);
app.post("/getVolunteers", GetVolunteers);
app.post("/getFeedback", GetFeedback);
app.post("/getContactUs", GetContactUs);
app.post("/editContactDetail", EditContactDetail);
app.post("/editFutureStrategy", EditFutureStrategy);
app.post("/getCounts", GetCounts);

//!user apis
app.post("/addVolunteerRequest", profilePicUpload.single("profilePic"), AddVolunteerRequest);
app.post("/addFeedback", AddFeedback);
app.post("/addContactUs", ContactUs);
app.post("/getVolunteerDetailById", GetVolunteerDetailById);
app.post("/getServiceDetailById", GetServiceById);
app.post("/getEventDetailById", GetEventDetailById);
app.post("/getUserCounts", GetCountsUser);

//!common apis
app.post("/getEvents", GetEvents);
app.post("/getMembers", GetMember);
app.post("/getService", GetService);
app.post("/getMedia", GetMedia);
app.post("/getContactDetail", GetContatDetail);
app.post("/getFutureStrategy", GetFutureStrategy);
app.post("/login", LoginApi);
app.post("/signup", SignUpApi);
app.post("/session", Session);
app.post("/logout", Logout);

//Activate Server
app.listen(process.env.PORT || PORTS, () => {
    console.log("Server Started on port: ", PORTS);
});
