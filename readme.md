# Personalized Roadmap Progress Tracking API (MERN + TypeScript)

This API handles progress tracking for users through a structured learning roadmap (Level 1–5). Each level contains modules that users must complete sequentially.

Documentation Link : https://docs.google.com/document/d/18Q9CLIhP6uCMEBxBNtw3KBXXHWlGXLPirAv1KigaHVM/edit?tab=t.0

---

## 🔧 Setup Instructions

1. Clone the repository: git@github.com:vikrantthakur003/Personalized-Roadmap-Progress-Tracking.git
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```
   PORT=4002
   HOST=0.0.0.0
   MONGO_URI=mongodb://localhost:27017/roadmap-progress-tracking
   JWT_SECRET=Roadmap^&Tracking
   ```
4. Start the server:
   ```bash
   npm run watch
   ```

---

## 📚 Roadmap Structure

Example:

- **Level 1: Basic Foundation**

  - Module 1.1: Programming Fundamentals
  - Module 1.2: Git & GitHub

- **Level 2: GenAI Foundations**
  - Module 2.1: LLM Introduction

---

## 🚀 Endpoints

### 🔐 Authentication (JWT Required)

Add your JWT token in Swagger under `Authorize` using:

```
Bearer <your_token>
```

---

### ✅ `POST /user-progress/update`

**Purpose**: Update user progress when they complete a module.

#### 🔸 Request Body

```json
{
  "levelId": 1,
  "moduleIndex": 1,
  "completionStatus": true,
  "timeSpent": 20,
  "userNotes": "Struggled with syntax"
}
```

#### 🔸 Response

```json
{
  "success": true,
  "message": "User progress updated successfully",
  "data": {
    "progress": {
      "levelProgress": "50%",
      "roadmapProgress": "50%",
      "nextModule": {
        "levelId": "6810f91a16688f62510439e9",
        "moduleIndex": 2
      },
      "timestamp": "2025-04-29T16:16:26.160Z"
    }
  }
}
```

#### 🔸 Error Codes

| Code | Meaning                         |
| ---- | ------------------------------- |
| 400  | Bad request or validation error |
| 401  | Unauthorized                    |
| 500  | Server error                    |

---

## 📊 Progress Calculation

- **Level Progress** = completed modules in that level / total modules × 100
- **Overall Progress** = completed modules / all modules across all levels × 100

---

## 📘 Swagger Docs

Open in browser:

```
http://localhost:5000/api-docs
```

Swagger is set up with:

- All request/response formats
- Security (JWT Bearer)
- Example payloads

---

## 🔁 Sequence Flow

1. User completes a module
2. `POST /user-progress/update` is triggered
3. Progress is updated
4. Next recommended module is calculated
5. Response sent with updated stats

---

## 📦 Folder Structure

```
/src
├── controllers
├── routes
├── models
├── middlewares
├── lib
├── loaders
├── services
└── config/swagger.json
```

---

## 📌 Tech Stack

- Node.js + TypeScript
- Express.js
- MongoDB + Mongoose
- Swagger + OpenAPI
- JWT Auth

---

## 📬 Contact

For questions or support:  
**Vikrant** – [LinkedIn](https://www.linkedin.com/in/vikrant-thakur003/) | Email: vikrantrana.k@gmail.com

---
