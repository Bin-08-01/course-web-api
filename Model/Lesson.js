const { Schema, model } = require("mongoose");

const LessonSchema = Schema({
    name: {
        type: String,
        required: true
    },
    chapterID: {
        type: Schema.Types.ObjectID,
        ref: "Chapters",
        require: true
    },
    urlVideo: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = model("Lessons", LessonSchema);