# MediStore 💊 – Backend Service

MediStore is a scalable backend service for an online medicine marketplace where customers can order medicines, sellers manage inventory, and admins oversee the platform.

This backend is built with **Node.js**, **Express**, **TypeScript**, **Prisma**, and **PostgreSQL (Neon DB)**, with authentication handled via **Better Auth**.

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL (Neon DB)**
- **Better Auth** (Authentication & Authorization)
- **REST API Architecture**

---

## 📦 Features

### 🔐 Authentication
- User registration and login
- Secure token-based authentication
- Get current authenticated user

### 💊 Medicines & Categories
- Browse medicines with filters
- View medicine details
- Browse medicine categories

### 🛒 Orders
- Customers can place orders
- Orders support multiple medicines (same seller)
- Order status tracking
- Seller-specific order management

### 🧑‍⚕️ Seller
- Add, update, and remove medicines
- View and manage seller orders
- Update order delivery status

### 🛡️ Admin
- View all users
- Activate / deactivate users

---

## 🧩 API Endpoints

### 🔐 Auth APIs
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current authenticated user |

---

### 💊 Medicine APIs
| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/api/medicines` | Get all medicines (with filters) |
| GET | `/api/medicines/:id` | Get medicine details |
| GET | `/api/categories` | Get all categories |

---

### 🛒 Order APIs (Customer)
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/orders` | Create new order |
| GET | `/api/orders` | Get current user's orders |
| GET | `/api/orders/:id` | Get order details |

---

### 🧑‍⚕️ Seller APIs
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/seller/medicines` | Add new medicine |
| PUT | `/api/seller/medicines/:id` | Update medicine |
| DELETE | `/api/seller/medicines/:id` | Remove medicine |
| GET | `/api/seller/orders` | Get seller's orders |
| PATCH | `/api/seller/orders/:id` | Update order status |

---

### 🛡️ Admin APIs
| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/api/admin/users` | Get all users |
| PATCH | `/api/admin/users/:id` | Update user status |

---

## 🗂️ Project Structure

src/
├── modules/
│ ├── auth/
│ ├── medicines/
│ ├── categories/
│ ├── orders/
│ ├── seller/
│ └── admin/
├── prisma/
│ ├── schema.prisma
│ └── client.ts
├── middlewares/
├── utils/
├── app.ts
└── server.ts

---

## 🔐 Authentication & Roles

- **Customer**: Browse medicines, place orders
- **Seller**: Manage medicines and orders
- **Admin**: Manage users
- Role-based access is enforced at API level

---

## 🗄️ Database

- **PostgreSQL** hosted on **Neon DB**
- **Prisma ORM** for schema, migrations, and queries
- Strong relational modeling:
  - Orders ↔ OrderItems ↔ Medicines
  - One order can have multiple medicines
  - One medicine can appear in many orders

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://user:password@host/db
BETTER_AUTH_SECRET= better auth secret

BETTER_AUTH_URL=http://localhost:5000 # Base URL of your app
APP_URL=http://localhost:3000 # Base URL of your app
APP_PASS= GOOGLE APP PASSWORD
APP_USER=GMAIL ID

# install dependencies
npm install

# generate prisma client
npx prisma generate

# run migrations
npx prisma migrate deploy

# start dev server
npm run dev
