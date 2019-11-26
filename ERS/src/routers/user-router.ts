import express from 'express';
import { getAllUsers } from '../services/user-service';



export const userRouter=express.Router();

userRouter.get('', async (req, res)=> {
    try {
        const users = await getAllUsers(); //this function is in services
        res.json(users);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
})

