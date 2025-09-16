# 📊 DSA Sheet Tracker

A full-stack **MERN application** to organize and track DSA problems by topic.  
Users can log in, view topics with linked problems (LeetCode, YouTube, Articles), mark problems as complete, and track progress across sessions.

---

## 🚀 Features

- 🔐 **Authentication** – Register/Login with JWT
- 📂 **Topics & Problems** – Stored in MongoDB with difficulty levels
- ✅ **Progress Tracking** – Problems can be marked as completed and persist per user
- 📊 **Topic Status** – Shows "Pending" or "Done" automatically based on completion
- 🌐 **Deployment** – Frontend on Vite + React, Backend on Node + Express, Database on MongoDB

---

## 🛠️ Tech Stack

**Frontend:** React, Vite, React Router, Axios  
**Backend:** Node.js, Express, JWT, Bcrypt  
**Database:** MongoDB (Compass/Atlas)

---

## 📂 Project Structure

dsa-sheet-project/
│
├── backend/ # Express backend (API + Auth + MongoDB)
│ ├── models/ # Mongoose schemas (User, Topic, Problem)
│ ├── routes/ # Express routes (auth, topics, problems)
│ ├── middleware/ # JWT auth middleware
│ ├── server.js # App entrypoint
│ └── .env.example # Example env file
│
├── frontend/ # React + Vite frontend
│ ├── src/ # Components, pages, API calls
│ ├── public/ # Static assets
│ └── vite.config.js
│
└── README.md # Project documentation

---

## ⚙️ Local Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/satyamgupta0103/dsa_mern_project.git
cd dsa-sheet-project

2️⃣ Setup Backend

cd backend
npm install
cp .env.example .env   # Fill in MONGO_URI, JWT_SECRET
npm run dev            # Start backend at http://localhost:5000

3️⃣ Setup Frontend

cd frontend
npm install
npm run dev            # Start frontend at http://localhost:5173

```

👨‍💻 Author
Satyam Gupta

💼 Frontend Developer
📧 satyamgupta132000@gmail.com
🌐 https://github.com/satyamgupta0103/

```

```
