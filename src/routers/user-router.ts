import express from 'express'
export const userRouter=express.Router()

userRouter.get('',
(req,res)=>{
    res.status(500).send('not implemented yet')
})