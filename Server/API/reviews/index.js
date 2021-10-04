import passport from 'passport'
import express from 'express';
// model
import { ReviewModel } from "../../database/allModels"

const Router = express.Router();

/*
Route            /food/new
Des              Add new food review
Params           none
body              review object
Access           Public
Method           Post
*/

Router.post('/food/new',async (req,res)=>{

    try{
     
        const {reviewData} = req.body;
        const addNewReview = await ReviewModel.create( reviewData);
        return res.status(200).json({ review : "Successfully review"})
                   
    }catch(error){
        return res.status(500).json({ error: error.message})
    }


})

/*
Route            /food/new
Des              Add new food review
Params           none
body              review object
Access           Public
Method           Post
*/

Router.delete('delete/:_id', async (req,res)=>{
   
    try{
        const {_id} = req.params;
        await ReviewModel.findOneAndDelete(_id);
        return res.status(200).json({ review: " Successfully Deleted review"});
    }catch(error){
        return res.status(500).json({ error: error.message})
    }
     
})

export default Router;