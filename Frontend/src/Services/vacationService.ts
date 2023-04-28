import axios from "axios";
import VacationModel from "../Models/vacation-model";
import appConfig from "../Utils/AppConfig";

class VacationsService {
    public async getAllVacations() {
        const response = await axios.get<VacationModel[]>(appConfig.getAllVacationsUrl);
        const vacations = response.data;
        return vacations;
        
    }
}

const vacationService = new VacationsService();

export default VacationsService;
