import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({

  images: [

    {
      location: { type: String, required: true },

    },
  ],

},
  {
    timestamps: true,
  }
);


export const ImageModel = mongoose.model("Images", imageSchema);