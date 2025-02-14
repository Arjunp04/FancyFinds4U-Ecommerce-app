#  FancyFinds4U – A Fullstack MERN eCommerce Clothing Store! 🛍️

## 🌍 Deployment URLs  
🔗 **Frontend:** [FancyFinds4U Store](https://fancyfinds4u.vercel.app/)
🔗 **Admin Panel:** [FancyFinds4U Admin](https://fancyfinds4u-admin-panel.vercel.app/)  

## 🔑 Admin Panel Login Credentials  
📧 **Email:** `admin@ff4u.com`  
🔒 **Password:** `adminff4u`  

## 🚀 Project Overview  
FancyFinds4U is a modern **MERN-based eCommerce platform** that offers a **smooth shopping experience** with:  
- 🖥️ **A sleek and responsive frontend**  
- 🔐 **Secure user authentication**  
- 🔍 **Product search & filtering**  
- 💳 **Seamless payment integration** (Razorpay & Stripe)  
- ⚙️ **Admin panel for store management**  

---

## 🛠️ Prerequisites  
Before running the project, ensure you have:  
✔️ **Node.js** installed  
✔️ **MongoDB** running  
✔️ **Git** installed  

---

## 📁 Environment Variables  
Ensure you create `.env` files for **frontend**, **backend**, and **admin panel** as shown below.  

### 🌟 Frontend `.env`  
```ini
VITE_BACKEND_URL="your_backend_url"
VITE_RAZORPAY_KEY_ID="your_razorpay_key_id"
VITE_EMAILJS_PUBLIC_KEY="your_emailjs_public_key"
VITE_EMAILJS_SERVICE_ID="your_emailjs_service_id"
VITE_FRONTEND_URL="your_frontend_url"
VITE_EMAILJS_TEMPLATE_ID="your_emailjs_template_id"
```

### 🌟 Backend `.env`
```ini
PORT="your_port"
MONGODB_URI="your_mongodb_uri"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_SECRET_KEY="your_cloudinary_secret_key"
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
JWT_SECRET="your_jwt_secret"
FRONTEND_URL="your_frontend_url"
ADMIN_FRONTEND_URL="your_admin_frontend_url"
ADMIN_EMAIL="your_admin_email"
ADMIN_PASSWORD="your_admin_password"
STRIPE_SECRET_KEY="your_stripe_secret_key"
RAZORPAY_KEY_SECRET="your_razorpay_key_secret"
RAZORPAY_KEY_ID="your_razorpay_key_id"
```

### 🌟 Admin Panel `.env`
```ini
VITE_BACKEND_URL="your_backend_url"
```

## 🚀 Running the Project on Local System  

### 1️⃣ Clone the Repository  
```sh
git clone (https://github.com/Arjunp04/FancyFinds4U-Ecommerce-app.git)
```

### 2️⃣ Run the Backend Server  
```sh
cd backend
npm install
npm run server
```
🟢 Your backend server should be running at `http://localhost:4000`.

### 3️⃣ Run the Frontend  
```sh
cd ../frontend
npm install
npm run dev
```
🟢 Your frontend should be running at `http://localhost:5173`.

### 4️⃣ Run the Admin Panel  
```sh
cd ../admin-panel
npm install
npm run dev
```
🟢 Your admin panel should be running at `http://localhost:5174`.

## 🛠️ Technologies Used  
- 🖥️ **Frontend:** React, Vite, Tailwind CSS  
- 🌐 **Backend:** Node.js, Express, MongoDB  
- 🔐 **Authentication:** JWT  
- 💳 **Payment Integration:** Razorpay, Stripe  
- ☁️ **Image Storage:** Cloudinary, Multer  

## 🌟 Features  
✅ **User Authentication** (Signup/Login)  
✅ **Product Search & Filtering**  
✅ **Shopping Cart & Checkout**  
✅ **Payment Integration** (Stripe & Razorpay)  
✅ **Order History & Tracking**  
✅ **Admin Panel for Product & Order Management**  

## 🤝 Contributing  
Feel free to **fork** this repo and **submit a pull request** if you’d like to contribute! 😊  

---  
### 🎉 Happy Coding & Shopping! 🛍️
