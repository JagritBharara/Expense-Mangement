import mongoose from 'mongoose'


// Schema Design
const userSchem = new mongoose.Schema({
    name: {
        type : String,
        required: [true,'Name is required']
    },
    email : {
        type : String,
        require : true,
        unique: true
    },
    password : {
        type : String,
        required: true
    },
    
},{timestamps: true}); 
//by this {timestamps: true} whenever we will create model date,time will also get captured


// Create a userModel -> in reference to userSchema in users->(previously defined entity in database)
// throug atlas -> in cluster -> in ExpenseApp
const userModel = mongoose.model.users || mongoose.model('users',userSchem);

export {userModel}