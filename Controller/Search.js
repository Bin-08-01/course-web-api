const Course = require("../Model/Course");
const Lesson = require("../Model/Lesson");
const Chapter = require("../Model/Chapter");
const User = require("../Model/User");

const Search = {
    searchCourse: async (req, res) => {
        try {
            const key = req.params.key;
            const course = await Course.find({
                $or: [
                    { title: { $regex: '.*' + key + '.*' } },
                    { desc: { $regex: '.*' + key + '.*' } }
                ]
            });
            const lesson = await Lesson.find({
                $or: [
                    { name: { $regex: '.*' + key + '.*' } },
                ]
            }).populate('courseID', 'img title');
            const user = await User.find({
                $or: [
                    { name: { $regex: '.*' + key + '.*' } },
                ]
            });
            return res.status(200).json({ data: {course, lesson, user} });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi" });
        }
    },

}

module.exports = Search;