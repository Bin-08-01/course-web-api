const Subject = require("../Model/Subject");

const SubjectCTL = {
    getAll: async (req, res) => {
        try {
            const subjects = await Subject.find();
            res.status(200).json({ data: subjects });
        } catch (error) {
            res.status(500).json({message: "Có lỗi"})
        }
    },

    add: async (req, res) => {
        try {
            const { name } = req.body;
            await Subject({
                name
            }).save();
            res.status(200).json({ message: "Thêm chủ đề thành công" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Có lỗi" });
        }
    },

    detail: async (req, res) => {
        try {
            const { id } = req.params;
            const subject = await Subject.find({ _id: id });
            res.status(200).json({ data: subject });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi" });
        }
    },

    increaseQuan: async (id) => {
        try {
            const subject = await Subject.find({ _id: id });
            subject.quanCourse++;
            await subject.save();
        } catch (error) {
            
        }
    }
}

module.exports = SubjectCTL;