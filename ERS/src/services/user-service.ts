import { User } from "../models/user";
import { daoGetUserByUsernameAndPassword, daoGetAllUsers } from "../respositories/user-dao";




export async function getAllUsers(): Promise<User[]> {
    //do some processing
    try {
        return await daoGetAllUsers();
    } catch (e) {
        throw e; //we have to re-throw e or the error will get lost in async callbacks
    }

}

//login
export function getUserByUsernameAndPassword(username: string, password:string):Promise<User>{

    return daoGetUserByUsernameAndPassword(username, password);
}