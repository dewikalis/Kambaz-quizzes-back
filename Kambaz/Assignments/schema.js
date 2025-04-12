import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema({
   _id: String,
   title: String,
   course: String,
    // from: String,
    // until: String,
    // description: String,
    // points: Number,
    // due: Date
 },
 { collection: "assignments" }
);
export default assignmentSchema;