//import Express
import express from "express";

import cors from 'cors';
import helmet from 'helmet';



const zomatoo= express();


//middleware applicatios
zomatoo.use(express.json());
zomatoo.use(express.urlencoded({extended:false})); 
zomatoo.use(helmet());
zomatoo.use(cors());


zomatoo.get("/",(req,res)=>{

    res.json({message: "hello setup success lalallallalall!"});

});



zomatoo.listen(4000 ,()=> console.log("server is running"));



