import mongoose from "mongoose";
const quizSchema = new mongoose.Schema(
  {
    _id: String,
    course: { type: String, ref: "CourseModel", required: "true" },
    published: { type: Boolean, default: false },
    from: Date,
    to: Date,
    due: Date,
    points: { type: Number, default: 100 },
    questions: { type: String, ref: "QuestionScore" },
  },
  { collection: "quizzes" }
);
export default quizSchema;
