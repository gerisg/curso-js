module.exports = (req, res, next) => {
    let auth = req.session.authorized;
    if(auth) {
        res.locals.auth = auth;
    }
    next();
};