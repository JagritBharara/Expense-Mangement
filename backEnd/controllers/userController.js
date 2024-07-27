import { userModel } from "../models/userModel.js";
import bcrypt from 'bcrypt';
// Login
const loginController = async (req,res)=>{
    try{
        const {email,password} = req.body; 

        // Find user in userModel
        const user = await userModel.findOne({email});
        
        if(!user){ // if didn't get any user from model
            return res.status(404).send('User not found');
        }

        const match = await bcrypt.compare(password, user.password);
        // console.log(match);
        if(!match){
            // Here we can't send 200 status if sent 200 it will login with wrong password too
            return res.status(404).send("Incorrect Password");
        }
        

        res.status(200).json({
            success: true,
            user
        });
    }catch(err){
        res.status(400).json({
            success : false,
            err
        });
    }
}


// FROM DOCS -> https://mongoosejs.com/docs/models.html
// An instance of a model is called a document. Creating them and saving to the database is easy.
 
// HOW TO CREATE A NEW INSTANCE in model
// const Tank = mongoose.model('Tank', yourSchema);
// const small = new Tank({ size: 'small' });
// await small.save();



const registerController = async (req,res)=>{
    try{
        const {name,email,password} = req.body;
        
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new userModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully",newUser });
        
        
    }catch(err){
        console.log(err);
        res.status(400).json({
            success: false,
            err
        })
    }
}


export {loginController,registerController};