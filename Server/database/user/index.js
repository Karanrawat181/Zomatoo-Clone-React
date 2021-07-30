import mongoose from 'mongoose';


//Schema
const userSchema = new mongoose.Schema({

  fullname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  address: [{ details: { type: String }, for: { type: String } }],
  phoneNumber: [{ type: Number }],

},
  {
    timestamps: true,
  }
);

//model
export const UserModel = mongoose.model("Users", userSchema);