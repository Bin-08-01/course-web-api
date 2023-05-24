const Course = require("../Model/Course");

const CourseCTL = {
    getPublic: async (req, res) => {
        try {
            const course = await Course.find({ status: true });
            return res.status(200).json({ data: course });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi" });
        }
    },

    add: async (req, res) => {
        try {
            const imageUrl = req.file.path;
            const img = imageUrl.replace(/\\/g, '/');
            const { title, desc, price, lecture, students, status } = req.body;
            await new Course({
                title, desc, price, lecture, students, status, img
            }).save();
            return res.status(200).json({ message: "Thêm thành công" });
        } catch (error) {
            return res.status(500).json({ message: "Có lỗi" });
        }
    },

    detail: async (req, res) => {
        try {
            const { id } = req.params;
            const course = await Course.findOne({ _id: id });
            return res.status(200).json({ data: course });
        } catch (error) {
            res.status(500).json({message: "Có lỗi"})
        }
    }
}

module.exports = CourseCTL;