import { PoolClient } from "pg";
import { Reimbursement } from "../models/reimbursement";
import { connectionPool } from ".";
import {  multiReimbursementDTOConvertor } from "../util/Reimbursement-to-reimbursement";


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
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM mspaper.reimbursement where author = $1 order by date_submitted desc', [id]);
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
