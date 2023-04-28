// import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";

class VacationModel {

    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageUrl: string;
    // public image: UploadedFile;



    private static validationSchema = Joi.object({
        vacationId: Joi.number().positive().optional().integer(),
        destination: Joi.string().required(),
        description: Joi.string().required(),
        startDate: Joi.date().required().min('now').iso(),
        endDate: Joi.date().required().min(Joi.ref('startDate')).iso(),
        price: Joi.number().required().max(10000).min(0),
        image: Joi.string().required().valid('jpeg','jpg', 'png','bmp').min(1).max(10 * 1024 * 1024),
    })
    public validate(): void {
        const result = VacationModel.validationSchema.validate(this);
        if(result.error) throw new ValidationError(result.error.message);
    }
}


export default VacationModel;