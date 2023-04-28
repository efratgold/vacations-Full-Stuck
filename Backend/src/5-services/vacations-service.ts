import dal from "../4-utils/dal";
import { OkPacket } from "mysql";
import appConfig from "../4-utils/app-config";
import imageHandling from "../4-utils/image-handling";
import VacationModel from "../2-models/vacation-model";
import { ResourceNotFoundError } from "../2-models/client-errors";

async function getAllVacations():Promise<VacationModel[]> {

    const sql = `SELECT
                    vacationId,
                    destination,
                    description,
                    startDate,
                    endDate,
                    price,
                    CONCAT('${appConfig.imagesUrl}', ImageName) AS imageUrl
                    FROM vacations`;


    const vacations = dal.execute(sql)
    return vacations;
}

async function addVacation(vacation:VacationModel):Promise<VacationModel>{

    vacation.validate();

    let imageName = null;
    if(vacation.image) {
        imageName = await imageHandling.saveImage(vacation.image);
        vacation.imageUrl = appConfig.imagesUrl + imageName;
    }

    const sql = `INSERT INTO vacations(destination, description, startDate, endDate, price, imageName)
                VALUES(?, ?, ?, ?, ?, ?)`;
    const result:OkPacket = await dal.execute(sql,[vacation.destination,vacation.description,vacation.startDate,vacation.endDate,vacation.price,imageName])
    vacation.vacationId = result.insertId;
   
    return vacation;
}

async function updateVacation(vacation: VacationModel): Promise<VacationModel> {
    //validation joi
    vacation.validate();

    let imageName = await getVacationImageName(vacation.vacationId);
    if(vacation.image) {
      
        imageName  = await imageHandling.updateImage(vacation.image,imageName);
    
    }
    
    vacation.imageUrl = appConfig.imagesUrl + imageName;

    
    
    const sql = `UPDATE vacations SET
        destination= ?,
        description = ?,
        startDate = ?,
        endDate = ?,
        price = ?,
        imageUrl = ?
        WHERE vacationId = ?`

        const result: OkPacket = await dal.execute(sql,[vacation.destination,vacation.description,vacation.startDate,vacation.endDate,vacation.price,vacation.imageUrl,vacation.vacationId]);
        if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);
        delete vacation.image;
        return vacation;
}




async function deleteVacation(id: number):Promise<void> {
    const sql = `DELETE FROM vacations WHERE vacationId =?`
    const result:OkPacket = await dal.execute(sql,[id]);
    if(result.affectedRows === 0) throw new ResourceNotFoundError(id)
  
}

async function getVacationImageName(id: number):Promise<string> {
    const sql = `SELECT imageName FROM vacations WHERE vacationId = ${id}`;
    const vacations = await dal.execute(sql);
    const vacation = vacations[0];
    if(!vacation) return null;
    const imageName = vacation.imageName;
    return imageName;
}



export default {
    getAllVacations,
    addVacation,
    updateVacation,
    deleteVacation,
    getVacationImageName

    
};

