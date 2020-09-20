const jwt = requiere('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Deneid');

    try {
        const verified = jwt.verify(token, process.env.REACT_APP_TOKEN_SECRET);
        req.user = verified;
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}