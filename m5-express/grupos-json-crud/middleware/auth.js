const jsonTable = require('../database/jsonTable');
const usersModel = jsonTable('users');
const usersTokensModel = jsonTable('usersTokens');

module.exports = (req, res, next) => {
    let auth = req.session.authorized;
    let ut = req.cookies.ut;
    if(auth) {
        res.locals.auth = auth;
    } else if (ut) {
        let userToken = usersTokensModel.findByFields(['token'], ut)[0];
        let user = usersModel.find(userToken.userId);
        // Available in session
        req.session.authorized = { id: user.id, firstname: user.firstname, category: user.category };
        // Available un views
        res.locals.auth = req.session.authorized;
        console.log('usuario recordado');
    }
    next();
};