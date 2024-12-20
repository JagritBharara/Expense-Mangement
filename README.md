# Expense Tracker Project

This document provides an overview of the routes implemented in the Expense Tracker project. The application allows users to manage their expenses through user authentication and transaction management features.

## Project Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```

3. **Environment Variables**
   Ensure you have a `.env` file in your project root with the necessary configurations such as database URI and JWT secret.

## Routes

### Transaction Routes

File: `routes/transactionRoute.js`

#### Endpoints

1. **Add New Transaction**
   - **URL**: `/api/transaction/add-transaction`
   - **Method**: `POST`
   - **Description**: Adds a new transaction to the system.
   - **Controller**: `addNewTransaction`

2. **Get All Transactions**
   - **URL**: `/api/transaction/get-transaction`
   - **Method**: `POST`
   - **Description**: Fetches all transactions for the user.
   - **Controller**: `getAllTransaction`

3. **Edit Transaction**
   - **URL**: `/api/transaction/edit-transaction`
   - **Method**: `POST`
   - **Description**: Edits an existing transaction.
   - **Controller**: `editTransaction`

4. **Delete Transaction**
   - **URL**: `/api/transaction/delete-transaction`
   - **Method**: `POST`
   - **Description**: Deletes a transaction from the system.
   - **Controller**: `deleteTransaction`

### User Routes

File: `routes/userRoute.js`

#### Endpoints

1. **User Login**
   - **URL**: `/api/user/login`
   - **Method**: `POST`
   - **Description**: Authenticates a user and generates a session token.
   - **Controller**: `loginController`

2. **User Registration**
   - **URL**: `/api/user/register`
   - **Method**: `POST`
   - **Description**: Registers a new user in the system.
   - **Controller**: `registerController`

## Controllers
The controllers for the above routes are located in the `controllers` directory:
- `transactionController.js`
- `userController.js`

## Usage

- Ensure the backend server is running before accessing the endpoints.
- Use tools like Postman or any frontend client to test the endpoints.

## Features

1. **User Authentication**:
   - Register and log in users securely.

2. **Transaction Management**:
   - Add, edit, fetch, and delete transactions efficiently.


---

This README provides a starting point for understanding and utilizing the routes in the Expense Tracker project. For further development, consult the project documentation or codebase.

