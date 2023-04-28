import jwt from "jsonwebtoken";
import { Request } from "express";
import { resolve } from "path";
import UserModel from "../2-models/user-model";
import { UnauthorizedError } from "../2-models/client-errors";
import RoleModel from "../2-models/role-model";


const secretKey = "vacations project";


function createToken(user:UserModel): string {

    const container = { user };
    const options = { expiresIn: "3h" };
    const token = jwt.sign(container,secretKey ,options);
    return token;
}

async function verifyToken(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        //extract header
        const header = request.header("authorization"); // "Bearer the-token"

        // If no header:
        if (!header) {
            reject(new UnauthorizedError("Incorrect username or password"));
            return;
        }
        // Extract token:
        const token = header.substring(7);

        // If no token:
        if (!token) {
            reject(new UnauthorizedError("Incorrect username or password"));
            return;
        }

        // Verify:
        jwt.verify(token, secretKey, err => {

            if (err) {
                reject(new UnauthorizedError("Invalid token"));
                return;
            }

            // All is good:
            resolve(true);

        });
    })
    
}

async function verifyAdmin(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        //extract header
        const header = request.header("authorization"); // "Bearer the-token"

        // If no header:
        if (!header) {
            reject(new UnauthorizedError("Incorrect username or password"));
            return;
        }
        // Extract token:
        const token = header.substring(7);

        // If no token:
        if (!token) {
            reject(new UnauthorizedError("Incorrect username or password"));
            return;
        }

        // Verify:
        jwt.verify(token, secretKey, (err, container: { user: UserModel}) => {

            if (err) {
                reject(new UnauthorizedError("Invalid token"));
                return;
            }
            //extract user from token:
            const user = container.user;

            //if user is not admin:
            if(user.roleId !== RoleModel.Admin) {
                reject(new UnauthorizedError("You are not admin!"));
                return;  
            }
            // All is good:
            resolve(true);

        });
    })   
}

export default {
    createToken,
    verifyToken,
    verifyAdmin
}