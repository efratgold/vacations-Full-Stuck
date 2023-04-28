import Joi from "joi";
import { ValidationError } from "./client-errors";

class CredentialsModel {

    public email: string;
    public password: string;


    private static validationSchema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(4),  
    })

    public validate(): void {
        const result = CredentialsModel.validationSchema.validate(this);
        if(result.error) throw new ValidationError(result.error.message);
    }
}

export default CredentialsModel;

