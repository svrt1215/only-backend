import mongoose from 'mongoose';

const yearResultSchema = new mongoose.Schema({
  year: { type: String, required: true },   
  obtained: { type: Number, required: true },
  outOf: { type: Number, required: true },
  status: { type: String, required: true },
}, { _id: false });

const resultSchema = new mongoose.Schema({
  name: String,
  enrollment: String,
  dob: String,
  fatherName: String,
  motherName: String,
  gender: String,
  session: String,
  religion: String,
  studentType: String,
  institute: String,
  course: String,
  results: [yearResultSchema]
}, { timestamps: true });

export default mongoose.model('Result', resultSchema);
