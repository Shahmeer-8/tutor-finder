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

1. Authentication & Authorization

- Roles: student, tutor, admin
- JWT access token (short-lived)
- Refresh token (stored securely in DB)
- Email verification required before login
- Role-based access control middleware
- Blocked users:
  - Immediately logged out
  - Prevented from login
- Password reset via secure token

2. Tutor Verification System

- Tutors upload verification documents
- Verification states:
  - pending
  - verified
  - rejected
- Admin manually approves/rejects
- Verification badge shown on profile

3. Tuition Request & Booking Flow

Lifecycle:
Student → Send Request → Multiple Tutors Receive → Tutor Approves/Rejects →
If Approved → Booking Created → 2-Day Trial Activated → Payment Required After Trial

Requirements:

- Student cannot abuse trial (track trial usage in DB)
- Multiple tutors per request
- Tutors can approve multiple students
- Booking entity created after approval
- Payment integration (Stripe recommended)
- Booking status:
  - trial_active
  - trial_expired
  - paid
  - cancelled

4. Courses

- Tutor-specific
- Linked to:
  - Education level (O Level, Matric, FSC, etc.)
  - City (dynamic city collection)
  - Mode (online/home)
- CRUD by tutor
- Admin can view all

5. Filtering & Search

Filter tutors by:

- City
- Subject
- Mode
- Education level
- Rating
- Verified badge
  Include:
- Pagination
- Sorting
- Search API

6. Admin Panel
   Admin capabilities:

- View tutor list
- View student list
- Temporary/permanent blocking
- Manage courses
- View all requests
- View all bookings
- Platform analytics:
  - total users
  - active tutors
  - pending verifications
  - active trials

**Required Output Structure**

1. High-level architecture diagram (text-based)
2. Database Schema Design (Mongoose models)
3. Folder Structure (clean MVC)
4. Middleware structure (RBAC, Auth, Error Handling)
5. REST API endpoint definitions
6. Complete backend production-ready code
7. Stripe payment integration
8. Email verification flow
9. Refresh token rotation
10. Security best practices
11. Deployment steps for Vercel
12. API documentation in structured format

Do NOT simplify. Produce scalable production-grade code with modular architecture.
