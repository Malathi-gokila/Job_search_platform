# Job Search Platform

## Overview

The **Job Search Platform** is a comprehensive, intelligent recruitment solution designed to streamline and optimize the hiring process by bridging the gap between job seekers and employers. It offers a user-centric web interface that supports distinct roles—Applicants and Recruiters—with tailored functionalities including job postings, resume uploads, profile management, application tracking, and automated resume ranking.

Built with a modern tech stack (React frontend, Node.js/Express backend, MongoDB database), the platform leverages advanced technologies such as BERT embeddings and cosine similarity for semantic resume-job matching, and supports automated interview scheduling with email notifications via the Resend API.

---

## Features

- User Registration & Authentication with JWT-based role-specific access (Applicant / Recruiter)
- Job Posting & Management (Recruiter)
- Job Search & Filtering (Applicant)
- Resume Upload & Parsing (PDF format supported)
- Automated Resume Ranking using BERT embeddings and cosine similarity
- Profile Creation & Management for both user roles
- Application Submission & Tracking
- Interview Scheduling & Notification with integrated email system
- Responsive UI built with React for desktop and mobile browsers

---

## Technology Stack

- **Frontend:** React.js  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (via Mongoose ODM)  
- **Authentication:** JWT (JSON Web Tokens)  
- **File Upload:** Multer  
- **Resume Parsing:** pdf-parse  
- **Ranking Algorithm:** Pre-trained BERT embeddings + Cosine Similarity  
- **Email Notifications:** Resend API  
- **Deployment:** Cloud-ready, HTTPS enabled

---

## Agile Development Methodology

This project was developed using the **Agile methodology**, specifically the Scrum framework, allowing for:

- Iterative development of features through sprints
- User-centric design focused on delivering the most value to applicants and recruiters
- Flexibility to accommodate changing requirements and job market trends
- Effective collaboration between frontend and backend teams with daily standups, sprint planning, and retrospectives
- Continuous improvement in system performance and feature integration

---

## Installation & Setup

### Prerequisites

- Node.js and npm installed
- MongoDB instance running or accessible
- Valid Resend API key for email notifications

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/job-search-platform.git
   cd job-search-platform
2. Install Dependencies:
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
3. Configure Environment Variables:
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   RESEND_API_KEY=your_resend_api_key
   PORT=port_number
4. Start Backend and Frontend servers:
   # Start backend
   cd backend
   npm start

   # Start frontend
   cd ../frontend
   npm run dev
5. Open your browser and navigate to your localhost



