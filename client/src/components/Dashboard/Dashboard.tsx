
import React, { useEffect, useState } from 'react';
import socket from '../../sockets/sockets';
import { UserSquare, UserPlus, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';




export interface Student {
  id?: string;
  first_name: string;
  last_name: string;
  age: number;
  grade_level: string;
  academic_record: string;
  courses: string[];
  subjects: string[];
  attendance: string;
}

const Dashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [form, setForm] = useState<Student>({
    first_name: '',
    last_name: '',
    age: 18,
    grade_level: 'freshman',
    academic_record: 'A',
    courses: [],
    subjects: [],
    attendance: 'Y',
  });

  useEffect(() => {
    fetch('https://pythonstudentdatabaseserver.onrender.com/api/students')
      .then(res => res.json())
      .then(data => setStudents(data));

    socket.on('studentAdded', (data: Student) => {
      setStudents(prev => [...prev, data]);
    });

    return () => {
      socket.off('studentAdded');
    };
  }, []);

  const userChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(data => ({ ...data, [name]: value }));
  };

  const userAdd = async () => {
    const res = await fetch('https://pythonstudentdatabaseserver.onrender.com/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const newStudent = await res.json();
    setStudents(prev => [...prev, newStudent]);
  };



  const userUpdate = async (student: Student) => {
    if (!student.id) {
      alert("Cannot update: student ID is missing.");
      return;
    }
  
    const updated = prompt('Edit first name:', student.first_name);
    if (!updated) return;
  
    const updatedStudent = { ...student, first_name: updated };
    const res = await fetch('https://pythonstudentdatabaseserver.onrender.com/api/students', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedStudent),
    });
  
    const data = await res.json();
    if (!data || !data.id) {
      alert("Update failed: no student data returned from server.");
      return;
    }
  
    setStudents(prev => prev.map(s => (s.id === data.id ? data : s)));
  };


const userDelete = async (id: string | undefined) => {
  if (!id) return;

  const res = await fetch(`https://pythonstudentdatabaseserver.onrender.com/api/students/${id}`, {
    method: 'DELETE',
  });

  const result = await res.json();
  if (result.msg === 'Deleted') {
    setStudents(prev => prev.filter(s => s.id !== id));
  } else {
    alert("Delete failed.");
  }
};




  return (
    <div className="p-6 bg-gradient-to-br from-purple-100 to-indigo-100 min-h-screen">
      <div className="shadow-xl bg-white rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Student Dashboard Overview</h2>

        <Link to="/"><div className='hover:text-green-300 hover:cursor-pointer'>Click to See Student Profile Section</div>
        </Link>

        <div className="grid gap-2 mb-6">
          <input type="text" name="first_name" placeholder="First Name" onChange={userChange} className="border p-2 rounded" />
          <input type="text" name="last_name" placeholder="Last Name" onChange={userChange} className="border p-2 rounded" />
          <input type="number" name="age" placeholder="Age" onChange={userChange} className="border p-2 rounded" />
          <select name="grade_level" onChange={userChange} className="border p-2 rounded">
            <option>freshman</option>
            <option>junior</option>
            <option>senior</option>
          </select>
          <select name="academic_record" onChange={userChange} className="border p-2 rounded">
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>Honor</option>
          </select>
          <select name="attendance" onChange={userChange} className="border p-2 rounded">
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
          <button
            onClick={userAdd}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded mt-2 flex items-center gap-2"
          >
            <UserPlus size={18} />
            Add Student
          </button>
        </div>

        <div className="grid gap-4">
          {students.map((student, index) => (
            <div key={index} className="p-4 shadow rounded bg-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <UserSquare className="text-indigo-600" />
                <div>
                  <p>{student.first_name} {student.last_name}</p>
                  <p>{student.grade_level} | Attendance: {student.attendance}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => userUpdate(student)} className="text-blue-600 hover:underline">
                  <Pencil size={20} />
                </button>
                <button onClick={() => userDelete(student.id)} className="text-red-600 hover:underline">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;