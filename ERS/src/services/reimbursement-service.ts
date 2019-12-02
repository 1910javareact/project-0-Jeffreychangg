import { Reimbursement } from "../models/reimbursement";
import { daoGetReimbursementByStatusId, daoGetReimbursementByUserId, daoSaveOneReimbursement, daoUpdateReimbursement } from "../respositories/reimbursement-dao";


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

//submit reimbursement

export function saveOneReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
    try {
        return daoSaveOneReimbursement(reimbursement);
    } catch (e) {
        throw e;
    }
}

//update reimbursement

export async function updateReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
    try {
        return daoUpdateReimbursement(reimbursement);
    } catch (e) {
        throw e;
    }
}