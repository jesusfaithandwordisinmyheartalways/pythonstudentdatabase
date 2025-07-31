Client-Side (React) Features
	1.	Student Management UI
	•	Displays a list of all students.
	•	Form to add a new student (first name, last name, etc.).
	•	Ability to edit student details.
	•	Ability to delete a student.
	2.	Socket.IO Real-Time Updates
	•	When a student is added, all connected clients are notified instantly (via socket.on('studentAdded')).
	3.	Client Build
	•	Production-ready static files are generated using npm run build.
	•	The app is deployed with the build output served by the Express server.
	4.	API Integration
	•	Fetches data from Express server via REST API (/api/students).
	•	Uses fetch or axios (depending on your client code) to make GET, POST, PUT, and DELETE requests.
	5.	React Router Support
	•	Catch-all route (app.all('/*splat')) allows React Router to handle client-side navigation in production.

⸻

✅ Server-Side (Node.js + Express + MongoDB + Socket.IO + Python) Features
	1.	REST API (/api/students)
	•	GET /api/students – Fetch all students from MongoDB.
	•	POST /api/students – Add a new student (and trigger a Python script).
	•	PUT /api/students – Update an existing student’s data.
	•	DELETE /api/students/:id – Delete a student.
	2.	MongoDB Integration
	•	Uses Mongoose to model and persist student data.
	3.	Python Integration
	•	When a student is added, a Python script (python/process_data.py) is executed with the student’s first name as an argument.
	•	Python output is logged to the server console.
	4.	Socket.IO Real-Time Communication
	•	WebSocket connection is established with clients.
	•	Emits studentAdded event to notify all clients of new students in real time.
	5.	Serving React App in Production
	•	Serves static frontend assets from /client/build.
	•	Includes wildcard route (/*splat) to support React routing in production.
	6.	CORS Configuration
	•	Enables cross-origin requests from the frontend.
	7.	Environment Variables Support
	•	.env used for PORT, MongoDB URI, and potentially other secrets.
	8.	Health Route
	•	GET / returns “Server is live ✅” to confirm the server is on.
