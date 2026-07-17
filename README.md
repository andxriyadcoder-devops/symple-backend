# Symple Backend

A wallet and reward management backend built with Node.js, Express, TypeScript and MongoDB.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt

## Features

### Authentication

- User Registration
- Login
- JWT Authentication
- Password Hashing
- Referral System
- Welcome Bonus

### Wallet

- Wallet Creation
- View Wallet
- Daily Login Reward
- Send Coins
- Withdraw Request
- Admin Coin Management
- Admin Cash Management

### Transactions

- Welcome Bonus History
- Referral Reward History
- Daily Login Reward History
- Coin Transfer History
- Withdraw Request History

### Admin

- Dashboard Statistics
- User Management
- Change User Role
- Change User Status
- Wallet Management

## Installation

```bash
git clone <repository-url>

cd backend

npm install

npm run dev
```

## Environment Variables

Create a `.env` file.

```env
PORT=5000
DATABASE_URL=your_mongodb_connection
JWT_SECRET=your_secret_key
```

## API Base URL

```
http://localhost:5000/api/v1
```

## Author

Riyad Hasan
