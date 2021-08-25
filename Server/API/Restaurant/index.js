import express from 'express'
import passport from 'passport'

// model
import { RestaurantModel } from "../../database/allModels"

const Router = express.Router();

/*
Route            /
Des          get all the restaurant detatails based in city 
Params           none
Access           Public
Method           get

*/

Router.get('/', async (req, res) => {

    try {

        const { city } = req.query;
        const restaurants = await RestaurantModel.find({ city });
        return res.json({ restaurants });

    } catch (error) {

        return res.status(500).json({ error: error.message });

    }

});

/*
Route            /
Des          get all the restaurant detatails based on id 
Params           none
Access           Public
Method           get
*/

Router.get("/:_id", async (req, res) => {

    try {

        const { _id } = req.params;
        const restaurant = await RestaurantModel.findOne(_id);

        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" })
        }

        return res.json({ restaurant });

    } catch (error) {

        return res.status(500).json({ error: error.message })
    }
});

/*

Route         /search   
Des          get all the restaurant details based on search string 
Params           none
body            search string
Access           Public
Method           get
*/

Router.get("/search", async (req, res) => {

    try {

        const { searchString } = req.body;
        const restaurant = await RestaurantModel.find({ name: { $regex: searchString, $option: "i" }, })

        if (!restaurant) {
            return res.status(404).json({ error: error.message })
        }


        return res.json({ restaurant });

    } catch (error) {

        return res.status(500).json({ error: error.message })
    }


});





export default Router;
