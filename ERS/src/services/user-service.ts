import { User } from "../models/user";
import { daoGetUserByUsernameAndPassword, daoGetAllUsers, daoGetUserById, daoUpdateUser} from "../respositories/user-dao";


//find users by id

export function getUserById(id: number): Promise<User> {
    console.log('Service: you are seraching for user ' + id);

    return daoGetUserById(id);
}

//find all users
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

//update user

export async function updateUser(newU:User):Promise<User>{
    try{
        let oldUser=await daoGetUserById(newU.userId);
        for(let key in newU){
            if(newU[key]!==oldUser.hasOwnProperty(key)){
                oldUser[key]=newU[key];
            }
        }
            return daoUpdateUser(oldUser);

    }catch (e) {
        throw e;
    }
}
