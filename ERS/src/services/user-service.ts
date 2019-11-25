import { User } from "../models/user";
import { daoGetUserByUsernameAndPassword } from "../respositories/user-dao";

export function getUserByUsernameAndPassword(username: string, password:string):Promise<User>{

    return daoGetUserByUsernameAndPassword(username, password);
}