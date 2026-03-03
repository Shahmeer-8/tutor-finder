**Claude Prompt (Architecture-First, Structured, Deep Reasoning)**

You are a senior full-stack architect. Design and generate production-ready code for the following platform.

Project: TutorFinder

A full-stack tutoring marketplace connecting students and verified tutors across Pakistan.

Tech Stack:

- Frontend: Next.js
- Backend: Node.js + Express.js (MVC pattern)
- Database: MongoDB Atlas (Mongoose ODM)
- Auth: JWT + Refresh Tokens
- Password hashing: bcrypt
- Validation: express-validator
- API style: REST
- Deployment: Vercel (frontend) + local backend

**Core Features**

_Authentication & Authorization_

- Roles: student, tutor, admin
- JWT access token (short-lived)
- Refresh token (stored securely in DB)
- Email verification required before login
- Role-based access control middleware
- Blocked users:
- Immediately logged out
- Prevented from login
- Password reset via secure token
