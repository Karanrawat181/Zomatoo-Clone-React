// env variable
require("dotenv").config();

// Library
import express from "express";
import cors from 'cors';
import helmet from 'helmet';

// Microservice  routes
import Auth from './API/Auth';



// Database Connection
import ConnnectDB from './database/connection';


const zomato= express();


//middleware applicatios
zomato.use(express.json());
zomato.use(express.urlencoded({extended:false})); 
zomato.use(helmet());
zomato.use(cors());


//appplication routes
zomato.use("/auth", Auth);

zomato.get("/",(req,res)=>{

    res.json({message: "hello setup success lalallallalall!"});

});



zomato.listen(4000 ,()=>

 ConnnectDB()
.then(() => console.log("server is running"))
.catch(()=>
 console.log("Server is running and db connection failed")
 )

);



