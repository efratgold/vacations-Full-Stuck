class AppConfig {
    public getAllVacationsUrl = "http://localhost:4000/api/vacations/";
    public imageUrl = "http://localhost:4000/api/vacations/images/";
    public addVacationUrl = "http://localhost:4000/api/newVacation/";
    public loginUrl = "http://localhost:4000/api/login/";
    public registerUrl = "http://localhost:4000/api/register/";

}

const appConfig = new AppConfig();

export default appConfig;
