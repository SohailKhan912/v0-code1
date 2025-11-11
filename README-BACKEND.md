# GlassVision Backend API

Complete Express.js backend with MongoDB, JWT authentication, and role-based access control.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb://localhost:27017/glassvision
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/glassvision

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
NODE_ENV=development
```

### 3. Start MongoDB

Make sure MongoDB is running locally or use MongoDB Atlas.

### 4. Start the Backend Server

```bash
npm run server
# or
node server.js
```

The server will run on `http://localhost:5000`

### 5. Create Admin User

Use the register endpoint to create an admin user:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@glassvision.com",
    "password": "admin123",
    "role": "admin"
  }'
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Products (Public)

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Products (Admin Only)

- `POST /api/products` - Create product (Protected, Admin)
- `PUT /api/products/:id` - Update product (Protected, Admin)
- `DELETE /api/products/:id` - Delete product (Protected, Admin)

### User Routes

- `GET /api/users/products` - Get products (Protected)

## Frontend Integration

The frontend is configured to connect to `http://localhost:5000/api`. Update `NEXT_PUBLIC_API_URL` in your `.env.local` if needed.

### Login Flow

1. Navigate to `/admin/login`
2. Login with admin credentials
3. Token is stored in localStorage
4. All API requests include the token in Authorization header

## Folder Structure

```
code/
├── server.js              # Entry point
├── config/
│   └── db.js             # MongoDB connection
├── models/
│   ├── User.js           # User model
│   └── Product.js        # Product model
├── controllers/
│   ├── authController.js # Auth logic
│   └── productController.js # Product CRUD
├── routes/
│   ├── authRoutes.js     # Auth routes
│   ├── productRoutes.js  # Product routes
│   └── userRoutes.js     # User routes
└── middleware/
    └── auth.js            # Auth & admin middleware
```

## Testing

Test the API using curl or Postman:

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@glassvision.com","password":"admin123"}'

# Get products (public)
curl http://localhost:5000/api/products

# Create product (requires token)
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Test Product",
    "price": 1000,
    "description": "Test description",
    "category": "Glass Doors",
    "stock": 10
  }'
```

