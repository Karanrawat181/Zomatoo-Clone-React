import joi from 'joi'

export const ValidateSignup = (userdata) => {

    const Schema = joi.object({
        fullname: joi.string().required().min(5),
        email: joi.string().email().required(),
        password: joi.string().min(5),
        address: joi.array().items(joi.object({ details: joi.string(), for: joi.string()})),
        phoneNumber :joi.number(), 
         
    });

    return Schema.validateAsync(userdata);
};