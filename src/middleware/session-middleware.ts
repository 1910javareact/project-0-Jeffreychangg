import session from 'express-session'

const sess={
    seret:'secret',
    cookie:{secrue:false},
    resave:false,
    saveUninitialized:false

}
export const sessionMiddleware=session(sess)