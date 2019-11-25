import express from 'express';
import bodyparser from 'body-parser';
import { sessionMiddleware } from './middleware/session-middleware';

const app = express();

app.use(bodyparser.json());

app.use(sessionMiddleware)

app.post('/login',async(req,res)=>{
    const {username,password} = req.body;
    if (!username || !password){
        res.status(400).send('please have a username and password field')
    }
    try {
        
        
    } catch (e) {
        
    }

})