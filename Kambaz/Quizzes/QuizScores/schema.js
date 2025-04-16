import mongoose, { Schema } from "mongoose";


export const questionScoreSchema = new Schema({
  questionID: {
    type: Schema.Types.ObjectId,
    ref: 'QuestionModel',
    required: true
  },
  score: {
    type: Number,
    required: true
  }
});

export const questionSchema = new Schema({
  _id: Schema.Types.ObjectId,
  quizId: { type: Schema.Types.ObjectId, ref: "QuizModel", required: true },
  description: { type: String, required: true },
  type: {
    type: String,
    enum: ["MULTIPLE-CHOICE", "TRUE-FALSE", "FILL-IN"],
    default: "MULTIPLE-CHOICE",
  },
  points: Number,
  answers: [String]
})
export const quizScoresSchema = new mongoose.Schema(
  {
    _id: Schema.Types.ObjectId,
    quizID: { type: Schema.Types.ObjectId, ref: "QuizModel", required: true },
    userID: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
    questions: [questionScoreSchema],
    points: { type: Schema.Types.Number, required: true }
  },
  { collection: "quizzes" }
);