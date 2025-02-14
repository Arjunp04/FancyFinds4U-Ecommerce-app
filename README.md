# FancyFinds4U

FancyFinds4U – A fullstack **MERN eCommerce clothing store!** 🚀

This project includes:
- **Frontend UI** for an engaging shopping experience.
- **User authentication** for secure access.
- **Product filtering** for easy browsing.
- **Payment integration** for seamless transactions.
- **Admin panel** for complete store management.

## Prerequisites
Make sure you have the following installed on your system:
- **Node.js** 
- **MongoDB** 
- **Git**

## Environment Variables

Ensure you create `.env` files for **frontend**, **backend**, and **admin panel** as mentioned below.

### Frontend `.env`
```ini
VITE_BACKEND_URL=your backend url
VITE_RAZORPAY_KEY_ID=your razorpay key id
VITE_EMAILJS_PUBLIC_KEY=your emailjs public key
VITE_EMAILJS_SERVICE_ID=your emailjs service id
VITE_FRONTEND_URL=your frontend url
VITE_EMAILJS_TEMPLATE_ID=your emailjs template id
```

### Backend `.env`
```ini
PORT=your port
MONGODB_URI="your mongodb uri"
CLOUDINARY_API_KEY="your cloudinary api key"
CLOUDINARY_SECRET_KEY=your cloudinary secret key
CLOUDINARY_CLOUD_NAME="your cloudinary cloud name"
JWT_SECRET=your jwt secret
FRONTEND_URL=your frontend url
ADMIN_FRONTEND_URL="your admin frontend url"
ADMIN_EMAIL="your admin email"
ADMIN_PASSWORD=your admin password
STRIPE_SECRET_KEY=your stripe secret key
RAZORPAY_KEY_SECRET=your razorpay key secret
RAZORPAY_KEY_ID="your razorpay key id"
```

### Admin Panel `.env`
```ini
VITE_BACKEND_URL=your backend url
```

## Running the Project on Local System

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/FancyFinds4U.git
cd FancyFinds4U
```

### 2️⃣ Run the Backend Server
```sh
cd backend
npm install
npm run server / npm start
```
Your backend server should be running at `http://localhost:4000`.

### 3️⃣ Run the Frontend
```sh
cd ../frontend
npm install
npm run dev
```
Your frontend should be running at `http://localhost:5173`.

### 4️⃣ Run the Admin Panel
```sh
cd ../admin
npm install
npm run dev
```
Your admin panel should be running at `http://localhost:5174`.

## Technologies Used
- **Frontend:** React, Vite, Tailwind CSS, 
- **Backend:** Node.js, Express, MongoDB
- **Authentication:** JWT
- **Payment Integration:** Razorpay, Stripe
- **Image Storage:** Cloudinary, Multer

## Features
✅ User Authentication (Signup/Login)
✅ Product Search & Filtering
✅ Shopping Cart & Checkout
✅ Payment Integration (Stripe & Razorpay)
✅ Order History & Tracking
✅ Admin Panel for Product & Order Management

## Contributing
Feel free to fork this repo and submit a pull request if you’d like to contribute! 😊

## License
This project is licensed under the **MIT License**.

---
### 🎉 Happy Coding & Shopping! 🛍️
