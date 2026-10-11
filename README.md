# MediCloud Hospital Management System

A beginner-friendly cloud-ready Hospital Management System using HTML, CSS, JavaScript, Node.js and Express.

## Features
- Admin login
- Dashboard
- Patient registration and search
- Doctor management
- Appointment booking
- Medical records
- Billing
- REST API
- JSON database for local development
- AWS-ready architecture

## Run in VS Code

1. Install Node.js.
2. Open this project folder in VS Code.
3. Open the terminal.
4. Run:

```bash
cd backend
npm install
npm run dev
```

5. Open:

http://localhost:3000

Demo login:
- Email: admin@medicloud.com
- Password: admin123

## AWS deployment idea

For a real cloud deployment:
- Frontend: Amazon S3 static website or AWS Amplify
- Backend: Amazon EC2 or AWS App Runner
- Database: Amazon RDS MySQL
- Medical documents: Amazon S3
- Domain/HTTPS: Route 53 + AWS Certificate Manager

The included JSON file is for demonstration/local development only. Do not use it for real patient/medical data.
