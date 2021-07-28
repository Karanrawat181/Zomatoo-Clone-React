import mongoose from 'mongoose';


//Schema
const userSchema = new mongoose.Schema({

  fullname:{type: String , required: true},
  email: {type: String, required: true},
  passsword: {type: String},
  address: [{details: {type: String}, for: {type: String} }],
  phoneNumber : [{type: Number}],

});

//model
export const userModel = mongoose.model("Users",userSchema);