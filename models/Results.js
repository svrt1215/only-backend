import mongoose from 'mongoose';

const semesterResultSchema = new mongoose.Schema({
  marks: { type: Map, of: Number },
  total: String,
  status: String
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
  result: String,
  semester: String,
  semesterResults: {
    type: Map,
    of: semesterResultSchema
  }
}, { timestamps: true });

export default mongoose.model('Result', resultSchema);
