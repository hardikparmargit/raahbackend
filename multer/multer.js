const multer = require("multer");

//profile pic storage
const profilePicStorage = multer.diskStorage({

    //path to store the profilePic
    destination: (req, file, cb) => {
        cb(null, "./images/profilePics");
    },

    //filename to give to the profilePic
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }

});

const profilePicUpload = multer({ storage: profilePicStorage });

//event pic storage
const eventPicStorage = multer.diskStorage({

    //path to store the profilePic
    destination: (req, file, cb) => {
        cb(null, "./images/eventPics");
    },

    //filename to give to the profilePic
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }

});

const eventPicUpload = multer({ storage: eventPicStorage });

//service pic storage
const servicePicStorage = multer.diskStorage({

    //path to store the profilePic
    destination: (req, file, cb) => {
        cb(null, "./images/servicePics");
    },

    //filename to give to the profilePic
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }

});

const servicePicUpload = multer({ storage: servicePicStorage });

//member pic storage
const memberPicStorage = multer.diskStorage({

    //path to store the profilePic
    destination: (req, file, cb) => {
        cb(null, "./images/memberPics");
    },

    //filename to give to the profilePic
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }

});

const memberPicUpload = multer({ storage: memberPicStorage });

//member pic storage
const mediaPicStorage = multer.diskStorage({

    //path to store the profilePic
    destination: (req, file, cb) => {
        cb(null, "./images/mediaPics");
    },

    //filename to give to the profilePic
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }

});

const mediaPicUpload = multer({ storage: mediaPicStorage });

module.exports = { profilePicUpload, eventPicUpload, servicePicUpload, memberPicUpload, mediaPicUpload };