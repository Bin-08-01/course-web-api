const Chapter = require("../Model/Chapter");

const ChapterCTL = {
    getAll: async (req, res) => {
        try {
            const chapters = await Chapter.find().populate('courseID', 'title _id');
            return res.status(200).json({ data: chapters });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi" });
        }
    },
    getChapter: async (req, res) => {
        try {
            const { id } = req.params;
            const chapters = await Chapter.find({ courseID: id });
            return res.status(200).json({ data: chapters });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi" });
        }
    },

    getChapterByCourseId: async (req, res) => {
        try {
            const { id } = req.params;
            console.log(id);
            const chapters = await Chapter.find({ courseID: id });
            console.log(chapters);
            res.status(200).json({ data: chapters });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi" });
        }
    },
    addChapter: async (req, res) => {
        try {
            const { name, courseID, quanLesson } = req.body;
            console.log(req.body);
            await Chapter({
                name: name, courseID, quanLesson
            }).save();
            return res.status(200).json({ message: "Thêm thành công" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Có lỗi" });
        }
    },

    increase: async (id) => {
        try {
            const chapter = await Chapter.findOne({ _id: id });
            let quan = chapter.quanLesson;
            quan++;
            chapter.quanLesson = quan;
            await chapter.save();
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ChapterCTL;