const Course = require("../Model/Course");
const { increaseQuan } = require("./SubjectCTL");

const CourseCTL = {
    getBySubjectID: async (req, res) => {
        try {
            const { id } = req.params;
            const courses = await Course.find({subjectID: id});
            res.status(200).json({ data: courses });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi" });
        }
    },
    getAll: async (req, res) => {
        try {
            const course = await Course.find();
            return res.status(200).json({ data: course });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi" });

        }
    },

    getPublic: async (req, res) => {
        try {
            const { id } = req.params;
            const course = await Course.find({ status: true, subjectID: id });
            return res.status(200).json({ data: course });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi" });
        }
    },

    add: async (req, res) => {
        try {
            const imageUrl = req.file.path;
            const img = imageUrl.replace(/\\/g, '/');
            const { subjectID, title, desc, price, lecture, students, status } = req.body;
            console.log(req.body);
            await new Course({
                subjectID, title, desc, price, lecture, students, status, img
            }).save();
            await increaseQuan(subjectID);
            return res.status(200).json({ message: "Thêm thành công" });
        } catch (error) {
            console.log(error);
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
    },

    edit: async (req, res) => {
        try {
            const { id, subjectID, title, desc, price, lecture, status, linkImg } = req.body;
            const course = await Course.findOne({ _id: id });
            course.subjectID = subjectID;
            course.title = title;
            course.desc = desc;
            course.price = price;
            course.lecture = lecture;
            course.status = status;
            if (linkImg == course.img) {
                await course.save();
            } else {
                const imageUrl = req.file.path;
                const urlImg = imageUrl.replace(/\\/g, '/');
                course.img = urlImg;
            }
            res.status(200).json({message: "Success"})
        } catch (error) {
            res.status(500).json({ message: "Error" })
        }
    },

    increaseStudent: async (req, res) => {
        try {
            const { id } = req.params;
            const course = await Course.findOne({ _id: id });
            course.students++;
            await course.save();
            res.status(500).json({ message: "Thành công" });

        } catch (error) {
            res.status(500).json({ message: "Có lỗi" });
        }
    },

    delete: async (req, res) => {
        try {
            await Course.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Success" });
        } catch (error) {
            res.status(500).json({ message: "Error" });
        }
    }
}

module.exports = CourseCTL;