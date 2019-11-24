import express from 'express';

const app=express();
const port=1234;

app.get('/',(req,res)=>{
    res.send("please log in");
});

app.listen(port,()=>{
    console.log("here we go")// http://localhost1234/ has started
});