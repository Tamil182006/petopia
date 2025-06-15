Petopia is a full-stack web application for pet lovers to buy pet products and adopt/rescue animals. Built using the MERN stack, Petopia empowers both buyers and sellers through a user-friendly interface and real-time pet listing capabilities.

🧱 Tech Stack
💻 Frontend
React.js

Axios

React Router

Context API (Cart management)

CSS Modules

🔙 Backend
Node.js

Express.js

MongoDB (with Mongoose)

Multer (for file uploads)

JWT (for login, in progress)

📦 Features Implemented
🛒 Buyer Flow
👀 Landing page showing pets for sale

🔍 Navbar with search bar and category filters (Dogs, Cats, Birds)

🐶 Pet Detail Page with dynamic content from MongoDB

🛍️ Add to Cart and Checkout Page

📦 Orders stored in MongoDB with confirmation

🧾 My Orders page to track purchases

🧑‍💼 Seller Flow
🧾 Multi-step Seller Signup Form (Coming soon: Email/OTP verification)

📤 Seller Dashboard with:

Product listing form (Step 1: Basic info, Step 2: Detailed info)

Real-time product count fetched from MongoDB

Each pet listing associated with sellerId

🗃️ Seller-specific product view via MongoDB query

🧠 Backend Logic
MongoDB collections:

users

sellers

pets

orders

Routes created:

POST /api/auth/signup (users)

POST /api/seller/signup (sellers)

POST /api/seller/listpet

PUT /api/seller/updatepet/:id

GET /api/seller/pets

GET /api/seller/petsbyseller/:email

POST /api/orders
