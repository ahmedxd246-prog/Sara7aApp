# 💬 Sara7a App

![Node.js](https://img.shields.io/badge/Node.js-v18-green?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-v6-green?logo=mongodb&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-Yes-blue)
![Multer](https://img.shields.io/badge/Multer-Yes-orange)

A simple **Sara7a-like backend application** built with **Node.js** and **Express**.  
Users can register, upload an avatar, receive anonymous messages, and **activate their account via email**.

---

## 🚀 Features

- User registration with **email activation**
- Avatar upload (Multer)
- Anonymous messaging
- Email sending using Nodemailer
- Request validation
- Clean project structure
- Easy to extend

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Multer (file uploads)
- Joi (validation)
- Nodemailer (email activation)

---

## 📂 Project Structure

src/
│── controllers/
│── routes/
│── models/
|── config/
│── middlewares/
│── utils/
│── uploads/
│ └── avatars/
│── server.js

---

## ⚙️ Installation

```bash
git clone https://github.com/your-username/Sara7aApp.git
cd Sara7aApp
npm install


🔐 Environment Variables
Create a .env file:
PORT=3000
DBURL
ALLOWED_ORIGINS=http://localhost:5000
NODE_ENV=development
ACCESS_TOKEN_SECRET_USER
ACCESS_TOKEN_EXPIRES=1d
ACCESS_TOKEN_SECRET_ADMIN
ACCESS_TOKEN_EXPIRES_ADMIN=15m
ACTIVATE_EMAIL=your email
ACTIVATE_PASSWORD=password
EMAIL_VERIFICATION_TOKEN_SECRET
EMAIL_VERIFICATION_TOKEN_EXPIRES=10m

▶️ Run the App
npm run dev

🖼 Static Files (Avatars)
app.use('/uploads', express.static('uploads'));

Access uploaded images via: http://localhost:3000/uploads/avatars/image-name.png

🔗 API Endpoints
**Register User with Email Activation
POST /register
email
password
firstName
lastName
age
gender
phone
avatar (image)
--
Flow:-
1- User registers.
2- Server generates activation token.
3- Activation link is sent via email.
4- User clicks the link → account is activated (isVerified = true).

Example Activation Link: http://localhost:3000/activate/<emailToken>

----
** Activate Account
GET /activate/:emailToken
--
Flow:
1- User clicks activation link from email.
2- Server verifies token.
3- If valid → sets isVerified = true and activates the account.

📧 Email Activation
Emails are sent using Nodemailer
Activation token stored in user record
Ensures only verified users can log in
```
