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


//update reimbursement

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