module.exports = (req, res, next) => {
    let auth = req.session.authorized;
    if(!auth || auth.category != 1) {
        return res.redirect('/');
    }
    next();
};