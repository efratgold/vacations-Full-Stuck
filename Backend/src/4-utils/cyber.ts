import UserModel from "../2-models/user-model";
import jwt from "jsonwebtoken";

const secretKey = "vacations project";


function createToken(user:UserModel): string {

    const container = { user };
    const options = { expiresIn: "3h" };
    const token = jwt.sign(container,secretKey ,options);
    return token;

}

export default {
    createToken
}