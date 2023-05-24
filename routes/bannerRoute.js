const route = require("express").Router();
const multer = require('multer');
const BannerCTL = require('./../Controller/BannerCTL');
// const { storage } = './../Middleware/storage.js';
const path = require("path");



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/banner"); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

route.get("/banner/public", BannerCTL.getPublic);
route.post("/banner/add", upload.single("avatar"), BannerCTL.addBanner);


module.exports = route;