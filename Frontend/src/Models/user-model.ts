import Joi from "joi";
import { ValidationError } from "./client-errors";
import RoleModel from "./role-model";

class UserModel {

    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: RoleModel;


    private static validationSchema = Joi.object({
        userId: Joi.number().positive().optional().integer(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(4),
        roleId: Joi.number().required(),

    })
    public validate(): void {
        const result = UserModel.validationSchema.validate(this);
        if(result.error) throw new ValidationError(result.error.message);
    }
} 

export default UserModel;