import express from 'express';
import { getAllUsers, getUserById } from '../services/user-service';


//find all users
export const userRouter=express.Router();

userRouter.get('', async (req, res)=> {
    try {
        const users = await getAllUsers(); //this function is in services
        res.json(users);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
})

//find user by ID
userRouter.get('/:id', async (req, res) => {
    const id = +req.params.id; //from req.params, give me id
    if (isNaN(id)) {
        res.sendStatus(400);
    } else {
        try {
            const user = await getUserById(id);
            res.json(user);
        } catch (e) {
            res.status(e.status).send(e.message);
        }

    }
});

