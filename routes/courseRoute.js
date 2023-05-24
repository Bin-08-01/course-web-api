const route = require("express").Router();
const CourseCTL = require("../Controller/CourseCTL");
const multer = require("multer");
const path = require("path");
const LessonCTL = require("../Controller/LessonCTL");
const ChapterCTL = require("../Controller/ChapterCTL");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/course");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });
route.get("/public", CourseCTL.getPublic);
route.post("/storage", upload.single('image'), CourseCTL.add);
route.get("/:id", CourseCTL.detail);

route.get("/chapter/all/:id", ChapterCTL.getChapter);
route.post("/chapter/new", ChapterCTL.addChapter);

route.get("/lesson/all/:id", LessonCTL.getAll);
route.post("/lesson/new", LessonCTL.addLesson);
route.get("/lesson/detail/:id", LessonCTL.detail);
module.exports = route;