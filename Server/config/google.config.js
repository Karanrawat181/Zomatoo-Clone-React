
import googleOAuth from 'passport-google-oauth20'

import { UserModel } from '../database/user';

const GoogleStratergy = googleOAuth.Strategy;

export default (passport) => {

    passport.use(
        new GoogleStratergy({
            clientID: process.env.GOOGLE__CLIENT__ID,
            clientSecret: process.env.GOOGLE__CLIENT__SECRET,
            callbackURL: "http://localhost:4000/auth/google/callback",
        },

            async (accessToken, refreshToken, profile, done) => {
               
              //new user obj  
                const newUser = {
                    
                    fullname: profile.displayName,
                    email: profile.emails[0].value,
                    profilePic: profile.photos[0].value,

                };
                try {

                    //check user exist
                    const user = await UserModel.findOne({ email: newUser.email });
 
                  
                  //generate token
             

                    if (user) {

                        const token = user.generateJwtToken();
                        done(null, { user, token });
                    
                    }
                    else {

                        //create new user
                        const user = await UserModel.create(newUser);
                        
                        const token = user.generateJwtToken();
                        
                        done(null, { user, token });
                    }

                } catch(error){

                    done(error, null);

                }

            }
        )
    )
    passport.serializeUser((userData,done)=> done(null, {...userData}));
    passport.deserializeUser((id,done)=> done(null,id));

};




