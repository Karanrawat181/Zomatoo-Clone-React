// env variable
require("dotenv").config();

// Library
import express from "express";
import cors from 'cors';
import helmet from 'helmet';
import passport from "passport";


//
import googleAuthConfig from "./config/google.config";


// Microservice  routes
import Auth from './API/Auth';
import Restaurant from './API/Restaurant';
import Food from './API/Food';






// Database Connection
import ConnnectDB from './database/connection';


const zomato= express();


//middleware applicatios
zomato.use(express.json());
zomato.use(express.urlencoded({extended:false})); 
zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());




//passport configg
googleAuthConfig(passport);


//appplication routes
zomato.use("/auth", Auth);
zomato.use("/restaurant",Restaurant);
zomato.use("/food",Food);




//default route....
zomato.get("/",(req,res)=>{

    res.json({message: "hello setup success lalallallalall!"});

});



// server
zomato.listen(4000 ,()=>
 ConnnectDB()
.then(() => console.log("server is running"))
.catch(()=>
 console.log("Server is running and db connection failed")
 )

);



