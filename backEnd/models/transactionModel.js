import mongoose, { Schema } from 'mongoose';

const transactionSchema = new mongoose.Schema({
    userId:{
        type: String,
        required:true
    },
    amount:{
        type: Number,
        required:true
    },
    type:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    refrence:{
        type: String
    },
    description:{
        type: String
    },
    date:{
        type: Date,
        required: true
    }
},{timestamps:true});

const transactionModel = mongoose.model('transactions',transactionSchema);

export default transactionModel;