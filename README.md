# Sign Up Application — React, Express REST API and MongoDB

A simple signup form inspired by the supplied design.

## Requirements
- Node.js and npm
- MongoDB Community Server running locally, or a MongoDB Atlas connection
- VS Code (recommended)

## 1. Install dependencies
From the project root:
```bash
npm install
npm install --prefix client
```

## 2. Configure MongoDB
Copy `.env.example` to `.env` in the project root. The default local connection is:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/signup_app
```
For MongoDB Atlas, replace MONGO_URI with your Atlas connection string. Start MongoDB before running the app.

## 3. Run
From the project root:
```bash
npm run dev
```
React: http://localhost:5173  
Express API: http://localhost:5000

## REST API
**POST** `http://localhost:5000/api/auth/signup`

Postman → Body → raw → JSON:
```json
{
  "email": "student@example.com",
  "password": "secret123"
}
```

Success response (201):
```json
{
  "message": "Account created successfully!",
  "user": {
    "id": "MongoDB-generated-id",
    "email": "student@example.com"
  }
}
```

Errors: 400 for invalid/missing fields, 409 for an existing email, 500 for server errors.

## Structure
```text
client/
  src/App.jsx
  src/main.jsx
  src/style.css
  index.html
  package.json
  vite.config.js
server/
  models/User.js
  routes/authRoutes.js
  server.js
.env.example
.gitignore
package.json
README.md
```

## Notes
- Passwords are hashed with bcrypt before being stored. Plain-text passwords are not saved.
- Emails are normalized to lowercase and have a unique database index.
- The “Log In” text is a visual placeholder; this project implements signup only.
- For production, add rate limiting, stronger password rules, HTTPS, secure sessions/tokens and email verification.
