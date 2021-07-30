// Library
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Model
import { UserModel } from '../../database/user';

// Router
const Router = express.Router();



/*
Route            /signup
Des              Signup with email and password     
Params           none
Access           Public
Method           Post
*/

Router.post("/signup",async (req, res)=> {
   
    try{
        const { email, password, fullname, phoneNumber } = req.body.credentials;
        
        // check user email and MobNO exist
        const checkUserEmail = await UserModel.findOne({ email });
        const checkUserPhone = await UserModel.findOne({ phoneNumber });

         if(checkUserEmail || checkUserPhone){
             return res.json({error: "user already exist"});
         }


         // hash password
         const bcryptSalt = await bcrypt.genSalt(8);

         const hashedPassword = await bcrypt.hash(password, bcryptSalt);

         // save to Db
         await UserModel.create({
             ...req.body.credentials,
             password: hashedPassword,           
            });
       

         // genrate JWT auth token
         const token = jwt.sign({user: { fullname, email }}, "ZomatoApp");


         // return
         return res.status(200).json({token, status:"success"});


    }catch(error){

        return res.status(500).json({error: error.message});
 
    }

});




export default Router;
