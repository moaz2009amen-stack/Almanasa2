# Almanasa LMS (Single Instructor)

Production-oriented LMS monorepo with:
- **Backend:** Node.js + Express + MongoDB/Mongoose
- **Frontend:** Next.js (App Router)
- **Auth:** JWT + phone/password
- **Storage/Video:** Cloudinary
- **Payments:** Paymob webhook verification

## Project structure

- `backend/` API-first Express backend
- `frontend/` Next.js frontend (student + admin dashboards)

## Quick start

### 1) Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 2) Frontend
```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

## Core capabilities implemented
- Role-based JWT auth using phone/password.
- Course/lesson ordering and sequential unlock logic.
- Lesson completion policy requiring watch percentage + assignment pass + exam pass.
- Assignments (image question + MCQ + autograde + attempt history).
- Exams (MCQ auto grading, essay-ready structure).
- Course forum (posts/comments/replies + moderation flags).
- Achievements (personal non-competitive progress).
- Paymob webhook endpoint for payment verification and enrollment.
- Security middleware: helmet, cors allowlist, rate limiting, Joi validation.

> This codebase is structured for production extension and hardening (logging, observability, CI, e2e tests, queueing) as next steps.
