
# 🗂️ Inventory Management Backend

## 🌟 Overview

This project offers a backend solution for managing 🛒 **inventory**, **📦 suppliers**, and 📋 **bulk data operations**, with features like **CSV import/export** and 🔔 **low-stock alerts**. Built with **Node.js**, **Express*, and **MongoDB**, it ensures smooth integration with dashboards for real-time management.

## ✨ Features

- 🔍 Fetch all inventory items and specific items by ID.
- ✏️ Create new inventory items with associated suppliers.
- 🔄 Update entire inventory records or individual fields by ID.
- ❌ Delete inventory items or specific fields.
- 📈 Low stock alerts for items that fall below the specified quantity threshold.
- 📤 Export all inventory data as a CSV file and 📥 import bulk data via CSV.


## 🛠️ Technologies Used

- **🔙 Backend:** Node.js, Express for creating APIs and routing.
- **💾 Database:** MongoDB with Mongoose for schema modeling and data management.
- **🔑 Authentication:** JSON Web Tokens (JWT) for secure user authentication.
- **📧 Email Service:** Nodemailer for sending emails (e.g., password resets).
- **🛡 Security**: Helmet for security headers and bcryptjs for password hashing.
## 📦 Dependencies

Here’s a list of all the dependencies used in this project along with their versions:

```bash{
"bcryptjs": "^2.4.3",
"cors": "^2.8.5",
"csv-parser": "^3.0.0",
"dotenv": "^16.4.5",
"express": "^4.21.1",
"express-rate-limit": "^7.4.1",
"fast-csv": "^5.0.2",
"helmet": "^8.0.0",
"joi": "^17.13.3",
"jsonwebtoken": "^9.0.2",
"mongoose": "^8.7.3",
"morgan": "^1.10.0",
"multer": "^1.4.5-lts.1",
"nodemailer": "^6.9.15",
"nodemon": "^3.1.7"
  ```


## 🚀 Setup and Installation

Clone the project

```bash
  git clone https://github.com/MaulikPatel63/Inventory_Management.git
```

Go to the project directory

```bash
  cd Inventory_Management/backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

API will be available at:

```bash
  http://localhost:5000
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`=`<MONGO_URI>`

`PORT`=`<Your_Port`

`JWT_SECRET`=`<Your_Secret>`


## 🌐 Deployment

The backend is deployed on Render.

- **Live Backend URL :** [https://inventory-management-fg2v.onrender.com/](https://inventory-management-fg2v.onrender.com/)


## API Reference

#### Auth Routes

| Method | Endpoint | Description | Access |
| :-------- | :------- | :------------------------- |:------------------------- |
| **POST** | `/api/v1/auth/signup` | User signup. | Public |
| **POST** | `/api/v1/auth/login` | User login and token generation. | Public |
| **POST** | `/api/v1/auth/logout` | User logout. | Authenticated |
| **GET** | `/api/v1/auth/authCheck` | Check user authentication. | Authenticated |

#### Inventory Routes

| Method | Endpoint | Description | Access |
| :-------- | :------- | :------------------------- |:------------------------- |
| **POST** | `/api/v1/inventory/inventory-add` | Add a new inventory. | Authenticated |
| **GET** | `/api/v1/inventory/inventory-get` | Get all inventorys with filtering and pagination. | Authenticated |
| **GET** | `/api/v1/inventory/inventory-get/:id` | Get Specific inventorys with ID. | Authenticated |
| **PUT** | `/api/v1/inventory/inventory-update` | Update an existing inventory by ID. | Authenticated |
| **DELETE** | `/api/v1/inventory/inventory-delete` | Delete an inventory by ID. | Authenticated |

#### Supplier Routes

| Method | Endpoint | Description | Access |
| :-------- | :------- | :------------------------- |:------------------------- |
| **POST** | `/api/v1/supplier/supplier-add` | Add a new supplier. | Authenticated |
| **GET** | `/api/v1/supplier/supplier-get` | Get all suppliers with filtering and pagination. | Authenticated |
| **GET** | `/api/v1/supplier/supplier-get/:id` | Get Specific suppliers with ID. | Authenticated |
| **PUT** | `/api/v1/supplier/supplier-update` | Update an existing supplier by ID. | Authenticated |
| **DELETE** | `/api/v1/supplier/supplier-delete` | Delete an supplier by ID. | Authenticated |

#### Csv Routes

| Method | Endpoint | Description | Access |
| :-------- | :------- | :------------------------- |:------------------------- |
| **POST** | `/api/v1/csv/import` | Import inventory data from CSV. | Authenticated |
| **GET** | `/api/v1/csv/export` | Export inventory data to CSV. | Authenticated |
