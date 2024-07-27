import transactionModel from '../models/transactionModel.js'
import moment from 'moment';

const  addNewTransaction=async (req,res)=>{
    try{
        // Creating a new model
        const newTransaction = new transactionModel(req.body);
        await newTransaction.save(); //saving
        res.status(201).send('Transaction Created');
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}


const getAllTransaction = async (req,res)=>{
    try{
        const {frequency,selectedDate,type} = req.body;
        const transactions = await transactionModel.find({
            
            ...(frequency!=='custom' ? {
                date:{
                    $gt : moment().subtract(Number(frequency),'d').toDate()
                }
            } : 
                {
                    date:{
                        $gte: selectedDate[0],
                        $lte: selectedDate[1]
                    }
                }),
                
            userId:req.body.userId,
            ...(type !=='all' && {type}),
        });

        

        res.status(200).json(transactions);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

const editTransaction=async(req,res)=>{
    try{    
        await transactionModel.findOneAndUpdate({
            _id:req.body.transactionId
        },req.body.payload);
        res.status(200).send("Edit Successfully")
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
};

const deleteTransaction = async (req,res)=>{
    try{
        await transactionModel.findOneAndDelete({_id:req.body.transactionId});
        res.status(200).send("Transaction Deleted");
    }catch(err){
        console.log(err);
        res.status(500).JSON.parse(err);
    }
}

export {getAllTransaction,addNewTransaction,editTransaction,deleteTransaction}