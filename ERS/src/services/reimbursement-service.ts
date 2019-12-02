import { Reimbursement } from "../models/reimbursement";
import { daoGetReimbursementByStatusId, daoGetReimbursementByUserId } from "../respositories/reimbursement-dao";


//find reimbursement by status id
export function getReimbursementByStatusId(statusId: number): Promise<Reimbursement[]> {
    console.log('Service: you are seraching for user ' + statusId);
    try{
    return daoGetReimbursementByStatusId(statusId);
    }catch(e){
        throw e;
    }
}

// find reimbursement by user id

export function getReimbursementByUserId(id: number): Promise<Reimbursement[]> {
    try {
        return daoGetReimbursementByUserId(id);
    } catch (e) {
        throw e;
    }
}