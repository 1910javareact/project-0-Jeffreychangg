import {Request} from "express"
export function loggingMiddleware(req:Request, res,next){
    console.log(`request url:${req.url} and method ${req.method} and request or origin:${req.ip}`)
    next()
}