import * as dao from "./dao.js";
import { v4 as uuid } from "uuid";
import { findCoursesForUser } from "../Enrollments/dao.js";

export default function QuizRoutes(app) {
  const getQuizzesForCourse = async (req, res) => {
    const { cid } = req.params;
    const quizzes = await dao.findQuizzesForCourse(cid);
    res.json(quizzes);
  };

  const createQuiz = async (req, res) => {
    const currentUser = req.session["currentUser"];
    console.log("CREATING QUIZ", req.body, currentUser)
    if (!currentUser) {
      res.status(400).send(req.session);
      return
    }
    const quiz = req.body;
    const status = await dao.addQuiz({ _id: uuid(), ...quiz });
    res.send(status)
  }


  app.put("/api/quizzes/QuizEditor/:qid", async (req, res) => {
    const { quizId } = req.params;
    const {  title, description, assignTo, type, points, group, shuffle, time, attempts, howManyAttempts, showCorrectAnswer, code,
    oneQuestion, webcam, lock, due, from, until, questions } = req.body;

    const status = await dao.updateQuiz(quizId, { title, description, assignTo, type, points, group, shuffle, time, attempts, howManyAttempts, showCorrectAnswer, code,
      oneQuestion, webcam, lock, due, from, until, questions })
    res.send(status)
  })

  app.get("/api/quizzes/courses/:cid", getQuizzesForCourse);
  app.post("/api/quizzes", createQuiz);
}
