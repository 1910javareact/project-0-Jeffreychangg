import { PoolClient } from "pg";
import { connectionPool } from ".";
import { userDTOtoUser, multiUserDTOConvertor } from "../util/Userdto-to-user";
import { User } from "../models/user";



//login
export async function daoGetUserByUsernameAndPassword(username:string, password:string):Promise<User>{
    let client:PoolClient;

    try{
        client=await connectionPool.connect();
        const result = await client.query('SELECT * FROM mspaper.user natural join mspaper.user_role natural join mspaper."role" WHERE username = $1 and  password = $2',
        [username,password]);
        if(result.rowCount === 0){
            throw 'Invalid Credentials';
        }else{
            return userDTOtoUser(result.rows);
        }
    }catch (e) {
        console.log(e);
        if (e==='Invalid Credentials'){
            throw{
                status: 400,
                message: 'Invalid Credentials'
            };
        }else{
            throw{
                status:500,
                message: 'Internal Server Error'
            };
        }
    }finally {
        client && client.release();
    } 
}

//find all users
export async function daoGetAllUsers(): Promise<User[]> {
    let client: PoolClient;

    try {
        //every time we use the await keyword
        client = await connectionPool.connect();
        //we register all code beneath it as a callback function
        //for when the promise resolves
        const result = await client.query('SELECT * FROM mspaper.user natural join mspaper.user_role natural join mspaper.role');
        return multiUserDTOConvertor(result.rows);
    } catch (e) {
        console.log(e);
        throw {
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client && client.release();
    }
}

//find users by ID

export async function daoGetUserById(id: number): Promise<User> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM mspaper."user" natural join mspaper.user_role natural join mspaper."role" where user_id = $1',[id]);
        if (result.rowCount > 0) {
            return userDTOtoUser(result.rows);
        } else {
            throw 'No Such User';
        }

    } catch (e) {
        if (e === 'No Such User') {
            throw {
                status: 404,
                message: 'this user does not exist'
            }; //this is an error
        } else {
            throw  {
                status: 500,
                message: 'Internal Server Error'
            };
        }
    }finally {
        client && client.release();
    }

}

//update user
export async function daoUpdateUser(user: User): Promise<User> {
    let client: PoolClient;
    client = await connectionPool.connect();
    try {

        await client.query('BEGIN');
        await client.query('update mspaper."user" set username = $1, password = $2, first_name = $3, last_name = $4, email = $5 where user_id = $6',
        [user.username, user.password, user.firstName, user.lastName, user.email, user.userId]);
        await client.query('update mspaper.user_role set role_id = $1 where user_id = $2',
        [user.role.roleId, user.userId]);
        
        const result = await client.query('SELECT * FROM mspaper."user" natural join mspaper.user_role natural join mspaper."role" where user_id = $1',
        [user.userId]);
        await client.query('COMMIT');
        console.log(user)
        if (result.rowCount > 0) {
            return userDTOtoUser(result.rows);
        } else {
            throw 'No Such User';
        }
    } catch (e) {
        await client.query('ROLLBACK');
        throw {
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client && client.release();
    }
}