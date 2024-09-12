const jwt = require('jsonwebtoken');


const isAuthenticated = async (req, res, next) => {
    const headerObj = req.headers;
    const token = headerObj.authorization.split(' ')[1];
    //! Verify token
    const verifyToken = jwt.verify(token, 'auth-api', (err, decoded) => {
        if (err) {
            return false;
        } else {
            return decoded;
        }
    })
    if (verifyToken) {
        req.user = verifyToken.id;
        next();
    }
    else {
        return res.status(401).json({ message: 'Token is not valid' });
        
    }
}

module.exports = isAuthenticated;