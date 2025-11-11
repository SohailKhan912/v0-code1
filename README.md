# GlassVision - Premium Glass Door E-Commerce Platform

A full-stack Next.js 16 e-commerce platform for custom glass door solutions with admin dashboard, order management, and payment integration.

## 🚀 Features

- **Frontend (Next.js 16 App Router)**
  - Modern, responsive UI with Tailwind CSS
  - Product catalog with filtering and search
  - Shopping cart and checkout flow
  - User authentication (login/register)
  - Order tracking and confirmation
  - Admin dashboard with analytics

- **Backend (Express.js + MongoDB)**
  - RESTful API with JWT authentication
  - Role-based access control (Admin/User)
  - MongoDB database with Mongoose
  - Order management system
  - Product CRUD operations
  - Razorpay payment integration

## 📋 Prerequisites

- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Git

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd code
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create `.env.local` in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://127.0.0.1:27017/glassvision
# Or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/glassvision

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Backend Server Port
PORT=5000

# Next.js Public API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Start MongoDB

Make sure MongoDB is running locally or use MongoDB Atlas.

### 5. Start the development servers

**Terminal 1 - Backend Server:**
```bash
npm run server
# or
node server.js
```

**Terminal 2 - Frontend (Next.js):**
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## 👤 Default Admin Credentials

- Email: `admin@glassvision.com`
- Password: `admin123`

The admin user is automatically created on first server startup.

## 📁 Project Structure

```
code/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (Next.js)
│   ├── admin/             # Admin dashboard pages
│   ├── login/             # User login page
│   ├── checkout/          # Checkout page
│   └── ...
├── components/             # React components
│   ├── ui/                # UI components (shadcn/ui)
│   └── ...
├── lib/                    # Utility libraries
│   ├── mongodb.ts         # MongoDB connection
│   └── models/            # TypeScript type definitions
├── models/                 # Mongoose models (CommonJS)
│   ├── User.js
│   ├── Order.js
│   └── Product.js
├── routes/                 # Express routes
├── controllers/            # Express controllers
├── middleware/             # Express middleware
├── server.js               # Express server entry point
└── public/                 # Static assets
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get all orders (Admin)
- `GET /api/orders/get?orderId=...` - Get order by ID
- `POST /api/razorpay/create-order` - Create Razorpay order

### Admin
- `GET /api/admin/stats` - Get dashboard stats (Admin)
- `GET /api/admin/orders` - Get all orders (Admin)
- `GET /api/admin/customers` - Get all customers (Admin)

## 🧪 Testing

### Test Admin Login
1. Navigate to `/admin/login`
2. Use credentials: `admin@glassvision.com` / `admin123`
3. Should redirect to `/admin` dashboard

### Test User Flow
1. Browse products at `/catalog`
2. Add items to cart
3. Go to checkout at `/checkout`
4. Complete order (dummy payment)
5. View order confirmation

## 🚢 Deployment

### Frontend (Vercel/Netlify)
1. Connect your repository
2. Set environment variables
3. Deploy

### Backend (Railway/Render/Heroku)
1. Set environment variables
2. Deploy `server.js`
3. Update `NEXT_PUBLIC_API_URL` in frontend

### MongoDB
- Use MongoDB Atlas for production
- Update `MONGODB_URI` in environment variables

## 📝 Scripts

- `npm run dev` - Start Next.js dev server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run server` - Start Express backend
- `npm run lint` - Run ESLint

## 🔒 Security Notes

- Change `JWT_SECRET` in production
- Use strong passwords
- Enable HTTPS in production
- Set secure CORS origins
- Use environment variables for secrets

## 📄 License

Private - All rights reserved

## 🤝 Support

For issues or questions, please contact the development team.

