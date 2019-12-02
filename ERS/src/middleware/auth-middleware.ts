export function authorization(authRoles: string[]) {
    return (req, res, next) => {
        let isAuth = false;
  
        
        if (!req.session.user) {
            res.status(401).send('Please Login');
            return;
        }
        // checks the authorization level
        if (authRoles.includes(req.session.user.role.role)) {
            isAuth = true;
        }

        // if they are authorized they go to the next step other wise they get an error message
        if (isAuth) {
            next();
        }else {
            res.status(401).send('The incoming token has expired');
        }
    };
}