import Joi from "joi";

const UserSignUpSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
})

export function UserSignUpValidator(user: any) {
    return UserSignUpSchema.validate(user);
}