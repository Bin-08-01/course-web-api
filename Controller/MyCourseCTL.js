const MyCourses = require("../Model/MyCourse");

const MyCourseCTL = {
    getAll: async (req, res) => {
        try {
            const { idUser } = req.params;
            const courses = await MyCourses.find({ idUser: idUser }).populate('idCourse', 'title desc img');
            res.status(200).json({ data: courses });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi" });
        }
    },
    addCourse: async (req, res) => {
        try {
            const { idUser, idCourse } = req.body;
            const check = await MyCourses.findOne({ idUser: idUser, idCourse: idCourse });
            if (!check) {
                await MyCourses({
                    idUser, idCourse
                }).save();
                return res.status(200).json({ message: "Thành công" });
            }
            return res.status(400).json({ message: "Đã học" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Có lỗi" });
        }
    }
}

module.exports = MyCourseCTL;