// Library
import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken'
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

Router.post("/signup", async (req, res) => {

    try {
              
        await UserModel.findByEmailAndPhone(req.body.credentials);

        const newUser = await UserModel.create(req.body.credentials);

        // genrate JWT auth token
        const token = newUser.generateJwtToken();

        return res.status(200).json({ token, status: "success" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

});


/*
Route            /signIN
Des              SignIN with email and password     
Params           none
Access           Public
Method           Post
*/

Router.post("/signin", async (req, res) => {

    try {

        const user = await UserModel.findByEmailAndPassword(req.body.credentials);

        // genrate JWT auth token
        const token = user.generateJwtToken();


        return res.status(200).json({ token, status: "success" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

});


/*
Route            /sgoogle signIN
Des              SignIN with email and password     
Params           none
Access           Public
Method           get
*/

Router.get("/google", passport.authenticate("google", {
    scope: [ "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
    ],
})
);



Router.get("/google/callback",passport.authenticate("google", {failureRedirect: "/"} ), (req,res)=> {

    return res.json({token: req.session.passport.user.token})
})


export default Router;
