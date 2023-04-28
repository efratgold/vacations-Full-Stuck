import express, { Request, Response, NextFunction } from "express";
import VacationModel from "../2-models/vacation-model";
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
// import VacationModel from "../3-middleware/2-models/vacation-model";
// import verifyAdmin from "../3-middleware/2-models/verify-admin";
// import verifyLoggedIn from "../3-middleware/2-models/verify-logged-in";
import imageHandling from "../4-utils/image-handling";
import vacationsService from "../5-services/vacations-service";

const router = express.Router();

router.get("/vacations",verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await vacationsService.getAllVacations();
        response.json(vacations)
    }
    catch(err: any) {
        next(err);
    }
});

router.post("/newVacation",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const addVacation = await vacationsService.addVacation(vacation);
        response.sendStatus(201).json(addVacation);
    }
    catch(err: any) {
        next(err);
    }
});

router.put("/vacations/:id([0-9]+)",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.vacationId = +request.params.id;

        // // Take image if exist:
        // request.body.image = request.files?.image;

        const vacation = new VacationModel(request.body);
        const updateVacation = await vacationsService.updateVacation(vacation);
        response.json(updateVacation);
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/vacations/:id([0-9]+)",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id =+request.params.id;
        await vacationsService.deleteVacation(id);
        response.status(204);
    }
    catch(err: any) {
        next(err);
    }
});

router.get("/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const imagePath = imageHandling.getImagePath(imageName);
        response.sendFile(imagePath)
    }
    catch(err: any) {
        next(err);
    }
});


export default router;
