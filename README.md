# 🚀 Contest Tracker

A **full-stack web application** that aggregates upcoming competitive programming contests from multiple platforms into one clean, unified dashboard.

Built to help students and competitive programmers **never miss a contest**.

---

## ✨ Features

* 📅 Shows **only upcoming contests** (no past / live clutter)
* 🔄 Real-time contest fetching using **Clist API**
* 🏷️ Filter contests by platform
* ⭐ Mark / bookmark important contests (saved in browser)
* ⏳ Live countdown till contest start
* 📱 Responsive, clean UI

---

## 🧑‍💻 Supported Platforms

* Codeforces
* CodeChef
* LeetCode
* AtCoder
* TopCoder
* HackerRank
* HackerEarth

---

## 🛠️ Tech Stack

### Frontend

* React.js
* CSS (Glassmorphism UI)
* Fetch API

### Backend

* Node.js
* Express.js
* Clist API

---

## 📂 Project Structure

```
contest-tracker/
├── frontend/          # React app
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server.js          # Express backend
├── package.json
├── .env               # Environment variables (NOT pushed)
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
CLIST_USERNAME=your_clist_username
CLIST_API_KEY=your_clist_api_key
```

⚠️ **Do NOT push `.env` to GitHub**

---

## ▶️ Run Locally

### Backend

```bash
npm install
npm start
```

Runs on: `http://localhost:5000`

---

### Frontend

```bash
cd frontend
npm install
npm start
```

Runs on: `http://localhost:3000`

---

## 🌐 Deployment (Planned)

* **Backend**: Render
* **Frontend**: Vercel

(Deployment instructions will be added soon)

---

## 🎯 Purpose

This project was built to:

* Practice full-stack development
* Work with real-world APIs
* Solve a real problem faced by competitive programmers

---

## 👤 Author

**Pawan Kumar Verma**

---

