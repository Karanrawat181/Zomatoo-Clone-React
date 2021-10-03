import express from 'express';
import passport from 'passport'

// model
import { UserModel } from "../../database/allModels"

const Router = express.Router();

/*
Route            /food/new
Des              get new user
Params            _id
Access           Public
Method           GET
*/

Router.get('/:_id',async (req,res)=>{
  
    try{
        
      const {_id } = req.params;
      const getUser = await UserModel.findOne(_id);
      return res.staus(200).json({ user: getUser})

    }catch(error){
        return res.status(500).json({ error: error.message})
    }

})

/*
Route            /food/new
Des              update new user
Params            _id
Access           Public
Method           PUT
*/

Router.put('/:_id',async (req,res)=>{
  
    try{
         
        const {_id} = req.params;
         const {userData} = req.body;
         const updateUserData = await UserModel.findByIdAndUpdate(_id,{
            $set: userData,
         },{
             new: true
         })
       return res.status(200).json({ message: "Userdata Updated", user: updateUserData})

    }catch(error){
        return res.status(500).json({ error: error.message})
    }
})


export default Router;