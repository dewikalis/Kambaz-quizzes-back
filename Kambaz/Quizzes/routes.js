import * as dao from "./dao.js";
import { v4 as uuid } from "uuid";
import { findCoursesForUser } from "../Enrollments/dao.js";

export default function QuizRoutes(app) {
  const getQuizzesForCourse = async (req, res) => {
    const { cid } = req.params;
    const quizzes = await dao.findQuizzesForCourse(cid);
    res.json(quizzes);
  };

  const getUserQuizzesInCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.status(400).send(req.session);
      return
    }
    const { cid } = req.params;
    const courses = await findCoursesForUser(currentUser._id)
    if (!courses.some(course => course._id === cid)) {
      res.status(400)
      return
    }
    const quizzes = await dao.findQuizzesForUserInCourse(currentUser._id, cid);
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

  app.get("/api/courses/:cid/quizzes", getQuizzesForCourse);
  app.get("/api/quizzes/courses/:cid", getUserQuizzesInCourse);
  app.post("/api/quizzes", createQuiz);
}
