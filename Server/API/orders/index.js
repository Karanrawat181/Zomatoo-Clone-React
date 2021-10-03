import passport from 'passport'
import express from 'express';
// model
import { OrderModel, ImageModel } from "../../database/allModels"

const Router = express.Router();

/*

Route            /list
Des          get all order based on id
Params           _id
Access           Public
Method           GET

*/

Router.get('/', async (req, res) => {

    try {

        const { _id } = req.params;
        const getOrders = await OrderModel.findOne({ user: _id });
        if (!getOrders) {

            return res.status(404).json({ error: " User not found" })
        }
        return res.status(200).json({ order: getOrders });


    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

});

/*

Route            /new
Des          Add new order 
Params           _id
Access           Public
Method           POST

*/
Router.post('/new/:_id', async (req, res) => {
      


    try {
        const { _id } = re.params;
        const { orderData } = req.body;

        const addNewOrder = await OrderModel.findOneAndUpdate({
            user: _id
        },
            {

                $push: {
                    orderDetails
                },
            },
            {
                new: true
            })
        return res.status(200).json({ order: addNewOrder })

    } catch (error) {

        return res.status(500).json({ error: error.message });
    }
})

export default Router;