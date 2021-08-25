import express from 'express'
import passport from 'passport'

// model
import { FoodModel } from "../../database/allModels"

const Router = express.Router();

/*
Route            /r/:_id
Des          get all food with particular restaurant 
Params           none
Access           Public
Method           get

*/


Router.get("/r/:_id", async (req, res) => {

    try {
        const { _id } = req.params;
        const foods = await FoodModel.find({ restaurant: _id })

        return res.json({ foods });
    } catch (error) {

        return res.status(500).json({ error: error.message });
    }


});


/*
Route            /r/:category
Des          get all food with particular restaurant 
Params           none
Access           Public
Method           get

*/


Router.get("/r/:category", async (req, res) => {

    try {
        const { category } = req.params;
        const foods = await FoodModel.find({ category : { $regex: category, $option: "i" }, })

        return res.json({ foods });
    } catch (error) {

        return res.status(500).json({ error: error.message });
    }

});


