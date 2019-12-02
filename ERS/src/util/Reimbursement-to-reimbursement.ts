import { reimbursementDTO } from "../dtos/reimbursement-dto";
import { Reimbursement } from "../models/reimbursement";

export function reimbursementDTOtoReimbursement(rD: reimbursementDTO[]): Reimbursement{
   
    return new Reimbursement(
        rD[0].reimbursement_id,
        rD[0].author,
        rD[0].amount,
        rD[0].date_submitted,
        rD[0].date_resolved,
        rD[0].description,
        rD[0].resolver,
        rD[0].status,
        rD[0].type
        );
}

export function multiReimbursementDTOConvertor(gD: reimbursementDTO[]): Reimbursement[] {
    let currentReimbursement: reimbursementDTO[] = [];
    const result: Reimbursement[] = [];
    for (const r of gD) {
        if (currentReimbursement.length === 0) {
            currentReimbursement.push(r);
        } else if (currentReimbursement[0].status === r.status) {
            currentReimbursement.push(r);
        } else {
            result.push(reimbursementDTOtoReimbursement(currentReimbursement));
            currentReimbursement = [];
            currentReimbursement.push(r);
        }
    }
    result.push(reimbursementDTOtoReimbursement(currentReimbursement));
    return result;
}