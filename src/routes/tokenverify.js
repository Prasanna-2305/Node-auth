import jwt from 'jsonwebtoken';

function auth (req, res, next){
    const token = res.header('auth-token');
    if(!token) return res.status(401).send('Assess Denied !');
    try {
        const verified = jwt.auth(token, "token");
        console.log(verified);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
}

export default auth;