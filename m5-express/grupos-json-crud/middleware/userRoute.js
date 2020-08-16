module.exports = (req, res, next) => {
    let auth = req.session.authorized;
    if(!auth) {
        return res.redirect('/users/login');
    }
    next();
};