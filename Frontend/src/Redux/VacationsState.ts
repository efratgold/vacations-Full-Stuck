import VacationModel from "../Models/vacation-model";


export class VacationsState {
    public vacations: VacationModel[] = [];
}

export enum VacationsActionType {
    FetchVacations,
    AddVacation,
    UpdateVacation,
    DeleteVacation
}

export interface VacationsAction {
    type: VacationsActionType;
    payload: any;
}

export function productsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {

    // Duplicate current state into a new state:
    const newState = { ...currentState };

    // Perform the needed action on the newState:
    switch (action.type) {

        case VacationsActionType.FetchVacations: // Here, the payload is all products for saving
            newState.vacations = action.payload;
            break;

        case VacationsActionType.AddVacation: // Here, the payload is a product object for adding
            newState.vacations.push(action.payload);
            break;

        case VacationsActionType.UpdateVacation: // Here, the payload is a product object for updating
            const indexToUpdate = newState.vacations.findIndex(p => p.vacationId === action.payload.id);
            if (indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload;
            }
            break;

        case VacationsActionType.DeleteVacation: // Here, the payload is the product id for deleting
            const indexToDelete = newState.vacations.findIndex(p => p.vacationId === action.payload)
            if (indexToDelete >= 0) {
                newState.vacations.splice(indexToDelete, 1);
            }
            break;
    }

    // Return the newState: 
    return newState;
}