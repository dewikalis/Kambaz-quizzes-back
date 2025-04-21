import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import session from "express-session";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes.js";
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";
import QuizRoutes from "./Kambaz/Quizzes/routes.js";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING, {
  dbName: "kambaz"
})
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.error("Database connection error:", error));

const app = express();
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  proxy: true
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.set("trust proxy", 1);
app.use(session(sessionOptions));
app.use(
  cors({
    credentials: true,
    origin: [
      process.env.NETLIFY_URL,
      "http://localhost:5173",
      "http://localhost:4000",
      "https://kambazquizgroupproject.netlify.app",
    ].filter(Boolean),
  })
);
app.use(express.json());

Lab5(app);
Hello(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
EnrollmentsRoutes(app);
AssignmentsRoutes(app);
QuizRoutes(app);
app.listen(process.env.PORT || 4000);
