import express from "express"
import bodyparser from 'body-parser'
import {loggingMiddleware} from './middleware/logging-middleware'
import {sessionMiddleware} from './middleware/session-middleware'
import {loginRouter} from './routers/login-router'
import {userRouter} from './routers/user-router'


const app=express()
app.use(bodyparser.json())

app.use(loggingMiddleware)
app.use(sessionMiddleware)


//if the user goes to the /user, go to the userRouter

app.use('/users',userRouter)
app.use('/login',loginRouter)

app.listen(1234, ()=>{
    console.log('app has started')
})