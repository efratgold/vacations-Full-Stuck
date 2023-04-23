import { OkPacket } from "mysql";
import { ValidationError } from "../2-models/client-errors";
import RoleModel from "../2-models/role-model";
import UserModel from "../2-models/user-model";
import cyber from "../4-utils/cyber";
import dal from "../4-utils/dal";



///Register new user :
async function register(user: UserModel): Promise<string>{

    //1.TODO  joi validation ....

    //2.check if email that user enter is empty : and send him message if email not empty
    const isTaken = await isEmailTaken(user.email);
    if(isTaken) throw new ValidationError(`Email ${user.email} already taken`);

    //Set all user like regular user:
    user.roleId = RoleModel.User;

    //create query :
    const sql = `INSERT INTO users VALUES(DEFAULT , ?,?,?,?,?)`;

    //Execute
    const result : OkPacket = await dal.execute(sql,[
        user.firstName , user.lastName, user.email, user.password, user.roleId]);

    ///set back auto-increment id I back to user his id he need it:
    user.userId = result.insertId;

    ///create token to user and return token.
    const token = cyber.createToken(user);
    
    //return token:
    return token;

}



async function isEmailTaken(email: string): Promise<boolean>{

    const sql = `SELECT EXISTS(SELECT * FROM users WHERE email = ?) AS isTaken`;

    const result = await dal.execute(sql, [email]);

    const isTaken: number = result[0].isTaken;

    return isTaken === 1;

}

export default {
    register
}