import express from "express"
import {getAllTransaction,addNewTransaction,editTransaction,deleteTransaction} from "../controllers/transactionController.js";

const router = express.Router();

// Adding new transaction
router.post('/add-transaction',addNewTransaction);

// Getting all transactions
router.post('/get-transaction',getAllTransaction);

// Edit the transaction
router.post('/edit-transaction',editTransaction);

// Delete transaction
router.post('/delete-transaction',deleteTransaction);

export default router;