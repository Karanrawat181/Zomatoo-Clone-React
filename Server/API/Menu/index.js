import express from 'express'
import passport from 'passport'

// model
import { ImageModel, MenuModel } from "../../database/allModels"

const Router = express.Router();

/*

Route            /list
Des          get all list menu based on id
Params           _id
Access           Public
Method           GET

*/
Router.get("/list/:_id", async (req, res) => {

   try {

      const { _id } = req.params;
      const menu = await MenuModel.findOne(_id);
      return res.json({ menu });

   } catch (error) {

      return res.status(500).json({ error: error.message });
   }

});

/*

Route            /images
Des          get all list menu images based on id
Params           _id
Access           Public
Method           GET

*/

Router.get("/images/:_id", async (req, res) => {

   try {

      const { _id } = req.params;
      const menu = await ImageModel.findOne(_id);
      return res.json({ menu });

   } catch (error) {

      return res.status(500).json({ error: error.message });
   }
})


export default Router;