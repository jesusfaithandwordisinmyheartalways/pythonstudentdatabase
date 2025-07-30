



import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  age: Number,
  grade_level: String,
  academic_record: String,
  courses: [String],
  subjects: [String],
  attendance: String,
});



const Student = mongoose.model('students', studentSchema);
export default Student;