import { PoolClient } from "pg";
import { Reimbursement } from "../models/reimbursement";
import { connectionPool } from ".";
import {  multiReimbursementDTOConvertor, reimbursementDTOtoReimbursement } from "../util/Reimbursement-to-reimbursement";


//find reimbursement by status id
export async function daoGetReimbursementByStatusId(statusId: number): Promise<Reimbursement[]> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM mspaper.reimbursement where status = $1 order by date_submitted desc', [statusId]);
        if (result.rowCount > 0) {
            return multiReimbursementDTOConvertor(result.rows);
        } else {
            throw 'No Such Reimbursement';
        }

    } catch (e) {
        if (e === 'No Such Reimbursement') {
            throw {
                status: 404,
                message: 'this Reimbursement does not exist'
            }; //this is an error
        } else {
            throw  {
                status: 500,
                message: 'Internal Server Error'
            };
        }
    }

}

// find reimbursement by user id

export async function daoGetReimbursementByUserId(id: number): Promise<Reimbursement[]> {
    let client: PoolClient;
    client = await connectionPool.connect();
    try {
        
        const result = await client.query('SELECT * FROM mspaper.reimbursement where author = $1', [id]);
        if (result.rowCount > 0) {
            return multiReimbursementDTOConvertor(result.rows);
        }else {
            throw 'No Such Reimbursement';
        }
    } catch (e) {
        if (e === 'No Such Reimbursement') {
            throw {
                status: 404,
                message: 'This reimbursement does not exist'
            };
        }else {
            throw {
                status: 500,
                message: 'Internal Server Error'
            };
        }
    } finally {
        client && client.release();
    }
}

//submit reimbursement


export async function daoSubmitReimbursement(r:Reimbursement):Promise<Reimbursement>{
    let client: PoolClient;
        client=await connectionPool.connect();
        try{
            await client.query('BEGIN')
            const input=await client.query('insert into mspaper.reimbursement (author,amount,date_submitted,date_resolved,description,resolver,status,"type") values ($1, $2, $3, $4, $5, $6, $7, $8) returning reimbursement_id', 
            [r.author, r.amount, r.dateSubmitted, r.dateResolved, r.description, r.resolver, r.status, r.type])
            const result = await client.query('SELECT * FROM mspaper.reimbursement where reimbursement_id = $1',
            [input.rows[0].reimbursement_id])
            await client.query('COMMIT')
            return reimbursementDTOtoReimbursement(result.rows);
        }catch(e){
            client.query('ROOLBACK')
            throw {
                status: e.status,
                message: e.message
            }
        } finally {
            client && client.release();
        }
}

//find reimbursement by reimbursement id
export async function daoGetReimbursementByReimbursementId(id: number): Promise<Reimbursement> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        console.log(id)
        const result = await client.query('SELECT * FROM mspaper.reimbursement where reimbursement_id = $1',[id]);
        if (result.rowCount > 0) {
            return reimbursementDTOtoReimbursement(result.rows);
        } else {
            throw 'No Such Reimbursement';
        }

    } catch (e) {
        if (e === 'No Such Reimbursement') {
            throw {
                status: 404,
                message: 'this Reimbursement does not exist'
            }; //this is an error
        } else {
            throw  {
                status: 500,
                message: 'Internal Error'
            };
        }
    }finally {
        client && client.release();
    }

}

//update reimbursement

export async function daoUpdateReimbursement(r: Reimbursement): Promise<Reimbursement> {
    let client: PoolClient;
    client = await connectionPool.connect();
    try {
   
        
        await client.query('BEGIN');
        await client.query('update mspaper.reimbursement set date_resolved = $1, resolver = $2, status = $3 where reimbursement_id = $4',
        [r.dateResolved, r.resolver, r.status,r.reimbursementId]);
      
        
       // await client.query('update mspaper.user_role set role_id = $1 where user_id = $2',
        //[user.role.roleId, user.userId]);
        
        const result = await client.query('SELECT * FROM mspaper.reimbursement where reimbursement_id = $1',
        [r.reimbursementId]);
        await client.query('COMMIT');
        if (result.rowCount > 0) {
            return reimbursementDTOtoReimbursement(result.rows);
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