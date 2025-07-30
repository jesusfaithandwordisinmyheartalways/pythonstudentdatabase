import Student from '../models/Student.js';
import { spawn } from 'child_process';






export const getStudents = async (req, res) => {
  const students = await Student.find();
  const formatted = students.map(s => ({ ...s.toObject(), id: s._id }));
  res.json(formatted);
};







export const addStudent = async (req, res) => {
  const student = new Student(req.body);
  await student.save();

  const formatted = { ...student.toObject(), id: student._id };

  req.io.emit('studentAdded', formatted);

  const python = spawn('python3', ['python/process_data.py', student.first_name]);
  python.stdout.on('data', (data) => {
    console.log('Python Output:', data.toString());
  });

  res.status(201).json(formatted);
};








export const updateStudent = async (req, res) => {
  const id = req.body.id;
  if (!id) return res.status(400).json({ error: 'Student ID is required.' });

  const updated = await Student.findByIdAndUpdate(id, req.body, { new: true });
  if (!updated) return res.status(404).json({ error: 'Student not found.' });

  res.json({ ...updated.toObject(), id: updated._id });
};




export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: 'Missing ID' });

  const deleted = await Student.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: 'Not found' });

  res.json({ msg: 'Deleted' });
};