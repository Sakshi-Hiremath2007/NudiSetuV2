# 🌿 NudiSetuV2 — Learn Kannada, the Easy Way

**NudiSetuV2** is a web-based Kannada learning platform designed to help beginners learn Kannada through lessons, quizzes, progress tracking, and an AI-powered learning assistant.

🌐 **Live Website:** https://nudisetuv2.onrender.com

## ✨ Features

- 📚 **Interactive Lessons** — Explore Kannada learning categories and practice useful words and phrases.
- 📝 **Quizzes** — Test your understanding through interactive quizzes.
- 📊 **Progress Tracking** — Track your learning progress as you explore lessons.
- 🤖 **NudiBot AI Assistant** — Ask Kannada-related questions and receive learning support using Google's Gemini API.
- 📱 **Responsive Interface** — Use the website on desktop and mobile devices.
- 🌱 **Beginner-Friendly Learning** — Learn Kannada with accessible explanations and practical examples.

## 🛠️ Technologies Used

**Frontend**
- HTML5
- CSS3
- JavaScript

**Backend**
- Node.js
- Express.js

**AI Integration**
- Google Gemini API
- `@google/genai`

**Deployment and Version Control**
- GitHub
- Render

## 🚀 Run Locally

### Prerequisites
- Node.js installed
- A Google Gemini API key

### 1. Clone the repository

```bash
git clone https://github.com/Sakshi-Hiremath2007/NudiSetuV2.git
cd NudiSetuV2
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=your_available_gemini_model
```

Replace the example values with your own valid credentials and model name.

### 4. Start the server

```bash
node server.js
```

Open **http://localhost:3000** in your browser.

## 🔐 Security

- Keep API keys private.
- Never commit your `.env` file to GitHub.
- Keep `node_modules/` out of version control.
- Configure production environment variables securely in Render.

## 🎯 Project Objective

NudiSetu aims to make Kannada learning more accessible, interactive, and engaging by combining structured lessons, quizzes, progress tracking, and AI-assisted learning in one platform.

## 👩‍💻 Developer

**Sakshi Hiremath**

Information Science and Engineering

Basaveshwar Engineering College, Bagalkote, Karnataka, India

---

*Built to make learning Kannada easier, one word at a time. 🌿*
