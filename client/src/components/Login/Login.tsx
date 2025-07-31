
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';





const Login:React.FC= () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const userSubmit = async (e: any) => {
        e.preventDefault();
        const res = await fetch('https://pythonstudentdatabaseserver.onrender.com/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        if (res.ok) {
          navigate('/studentprofile');
        } else {
          const errorData = await res.json();
          alert(errorData.error || 'Login failed');
        }
    }




    
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 to-indigo-400 transition-all duration-1000">
        <form onSubmit={userSubmit} className="bg-white p-6 rounded-xl shadow-2xl w-96 space-y-4">
            <div  className="border p-2 w-full" >
                <input onChange={(e) => setUsername(e.target.value)} type='text'  value={username} placeholder="Username"  required />
            </div>

            <div className="border p-2 w-full">
                <input onChange={(e) => setPassword(e.target.value)} type="password" value={password}  placeholder="Password" required  />
            </div>

            <div className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-800">
                <button>Login</button>
            </div>

        </form>

    </div>
    
    
    
    
    
    </>

  )
}

export default Login


