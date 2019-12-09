import express from 'express';
import { getAllUsers, getUserById, updateUser} from '../services/user-service';
import { authorization } from '../middleware/auth-middleware';




export const userRouter=express.Router();



//find all users
userRouter.get('', [authorization(['finance-manager'])], async (req, res)=> {
    try {
        const users = await getAllUsers(); 
        res.json(users);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
});

//find user by ID
userRouter.get('/:id', [authorization(['finance-manager', 'admin', 'user'])], async (req, res) => {
    const id = +req.params.id; //from req.params, give me id
    const user = await getUserById(id);
    if (isNaN(id)) {
        res.sendStatus(400);
    }else if (req.session.user.role.role === 'finance-manager') {
        try {
            
            res.status(200).json(user);
        } catch (error) {
            res.status(error.status).send(error.message);
        }
    }else {
        try {
            
            if (req.session.user.userId === user.userId) {
                res.status(200).json(user);
            }else {
                res.sendStatus(401);
            }
        } catch (error) {
            res.status(error.status).send(error.message);
        }
    }
});

//update user 

userRouter.patch('', [authorization(['admin'])],async (req,res)=>{
    try{
        const {body}=req;
        const uUser=await updateUser(body);
        res.status(200).json(uUser);
    }catch (e) {
        res.status(e.status).send(e.message);
    }
});
