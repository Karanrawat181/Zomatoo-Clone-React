
import express from 'express';
import passport from 'passport';
import AWS from 'aws-sdk';
import multer from 'multer'

// model
import { ImageModel } from "../../database/allModels"
// import { s3Upload } from '../../Utils/AWS';

// Utilities
 import { s3Upload } from '../../Utils/AWS';


const Router = express.Router();

// multer config
const storage = multer.memoryStorage();
const upload = multer({storage});



/*
Route            /image
Des              upload given image to s3 Bucket and save files
Params           none
Access           Public
Method           Post
*/

Router.post('/', upload.single("file"), async (req,res)=> {

    try{
        
        const file = req.file;

        //s3 bucket option
        const bucketOptions={
    
            Bucket: "zomatooclone123",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read",  // access Control List
        };

   
    const uploadImage = await s3Upload(bucketOptions);

    return res.status(200).json({ uploadImage});
     
    }catch(error){
        return res.json({error: error.message});
    }

     
})

export default Router;
