const Lesson = require("../Model/Lesson");
const { increase } = require("./ChapterCTL");

const LessonCTL = {
    addLesson: async (req, res) => {
        try {
            const { name, chapterID, urlVideo, time } = req.body;
            await Lesson({
                name, chapterID, urlVideo, time
            }).save();
            await increase(chapterID);
            res.status(200).json({ message: "Thêm thành công" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Có lỗi" });
        }
    },

    getAll: async (req, res) => {
        try {
            const { id } = req.params;
            const lessons = await Lesson.find({ chapterID: id });
            res.status(200).json({ data: lessons });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi" });
        }
    },

    detail: async (req, res) => {
        try {
            const { id } = req.params;
            const lesson = await Lesson.findOne({ _id: id });
            return res.status(200).json({ data: lesson });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi" });
        }
    }
}

module.exports = LessonCTL;