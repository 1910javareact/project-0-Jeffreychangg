import express from 'express'
import { getReimbursementByStatusId, getReimbursementByUserId,submitReimbursement} from '../services/reimbursement-service';
import { authorization } from '../middleware/auth-middleware';

import { Reimbursement } from '../models/reimbursement';


export const reimbursementRouter=express.Router();

//find reimbursement by status id
reimbursementRouter.get('/status/:statusId', [authorization(['finance-manager'])], async (req, res) => {
    const statusId = +req.params.statusId; //from req.params, give me id
    if (isNaN(statusId)) {
        res.sendStatus(400);
    } else {
        try {
            const reimbursement = await getReimbursementByStatusId(statusId);
            res.json(reimbursement);
        } catch (e) {
            res.status(e.status).send(e.message);
        }

    }
});

//find reimbursement by user id

reimbursementRouter.get('/author/:userId', [authorization(['finance-manager', 'admin', 'user'])],
    async (req, res) => {
        const id = +req.params.userId;
        if (isNaN(id)) {
            res.sendStatus(400);
        } else if (req.session.user.role.role === 'finance-manager') {
            try {
                const reimbursement = await getReimbursementByUserId(id);
                res.status(200).json(reimbursement);
            } catch (e) {
                console.log(e)
                res.status(e.status).send(e.message);
            }
        } else {
            try {
                const reimbursement = await getReimbursementByUserId(id);
                if (req.session.user.userId === reimbursement[0].author) {
                    res.status(200).json(reimbursement);
                } else {
                    res.sendStatus(401);
                }
            } catch (e) {
                console.log(e)
                res.status(e.status).send(e.message);
            }
        }
    });

//submit
reimbursementRouter.post('', [authorization(['finance-manager', 'admin', 'user'])],
    async (req, res) => {
        const { body } = req;
        const newR = new Reimbursement(0, 0, 0, 0, 0, '', 0, 0, 0);
        try {
            let error = false;
            for (const key in newR) {
                if (body[key] === undefined) {
                    res.status(400).send('Please include all reimbursement fields');
                    error = true;
                    break;
                } else {
                    newR[key] = body[key];
                }
            }
            if (!error) {
                newR.author = req.session.user.userId;
                const reimbursement = await submitReimbursement(newR);
                res.status(201).json(reimbursement);
            }
        } catch (e) {
            res.status(e.status).send(e.message);
        }
    });
