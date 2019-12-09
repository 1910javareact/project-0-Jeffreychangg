import { Reimbursement } from "../models/reimbursement";
import { daoGetReimbursementByStatusId, daoGetReimbursementByUserId,  daoSubmitReimbursement, daoGetReimbursementByReimbursementId, daoUpdateReimbursement} from "../respositories/reimbursement-dao";


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

export function submitReimbursement(r:Reimbursement):Promise<Reimbursement>{
    try{
        return daoSubmitReimbursement(r);
    }catch (e) {
        throw e;
    }


}

//update reimbursement

export async function updateReimbursement(newr:Reimbursement):Promise<Reimbursement>{
    try{
        let oldReimbursement=await daoGetReimbursementByReimbursementId(newr.reimbursementId);
        for(let key in newr){
            if(newr[key]!==oldReimbursement.hasOwnProperty(key)){
                oldReimbursement[key]=newr[key];
            }
        }
            return daoUpdateReimbursement(oldReimbursement);

    }catch (e) {
        throw e;
    }
}
