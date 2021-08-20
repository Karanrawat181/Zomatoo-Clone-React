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

       await UserModel.findByEmailAndPhone(req.body.credentials);

       const newUser  = await UserModel.create(req.body.credentials);

       // genrate JWT auth token
       const token = newUser.generateJwtToken();
    
       return res.status(200).json({token, status:"success"});

    }catch(error){
        return res.status(500).json({error: error.message});
    }

});


/*
Route            /signIN
Des              SignIN with email and password     
Params           none
Access           Public
Method           Post
*/

Router.post("/signin",async (req, res)=> {
   
    try{

      const user= await UserModel.findByEmailAndPassword( req.body.credentials );

       // genrate JWT auth token
       const token = user.generateJwtToken();
    
       return res.status(200).json({token, status:"success"});

    }catch(error){
        return res.status(500).json({error: error.message});
    }

});




export default Router;
