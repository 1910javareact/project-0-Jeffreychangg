
import express=require('express');
import bodyParser = require('body-parser');
import {loggingMiddleware} from './middleware/loggingMiddleware';
import {sessionMiddleware} from './middleware/sessionMiddleware';

const app=express();
const port=5432;

app.use(bodyParser.json());
app.use(loggingMiddleware);
app.use(sessionMiddleware);

//app.use('/users',userRouter)

//app.use('/report',reportRouter)
//app.use('/login',loginRouter)


app.listen(port,()=>{
    console.log("here we go")// http://localhost1234/ has started
});