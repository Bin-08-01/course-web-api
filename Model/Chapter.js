const { Schema, model } = require("mongoose");

const ChapterSchema = Schema({
    name: {
        type: String,
        required: true
    },
    courseID: {
        type: Schema.Types.ObjectID,
        ref: "Courses",
        require: true
    },
    quanLesson: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = model("Chapters", ChapterSchema);