import mongoose from "mongoose";
// import { questionSchema } from "./QuizScores/schema";

const questionSchema = new mongoose.Schema({
  _id: String,
  title: String,
  description: String,
  type: {
    type: String,
    enum: ["MULTIPLE-CHOICE", "TRUE-FALSE", "FILL-IN"],
    default: "MULTIPLE-CHOICE",
  },
  points: Number,
  answers: [String],
  choices: [String]
})

const quizSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    description: String,
    assignTo: String,
    type: String,
    assignmentGroup: String,
    shuttleAnswer: Boolean,
    timeLimit: Number,
    multipleAttempts: Boolean,
    showCorrectAnswer: Boolean,
    accessCode: String,
    oneQuestion: Boolean,
    webcamRequired: Boolean,
    lockQuestions: Boolean,
    published: Boolean,
    from: Date,
    to: Date,
    due: Date,
    points: { type: Number, default: 100 },
    questions: [questionSchema],
    course: { type: String, ref: "CourseModel", required: "true" },
  },
  { collection: "quizzes" }
);
export default quizSchema;
