module.exports = (req, res, next) => {
   if (!req.session.user) {
      return res.status(401).json({
         "meta": {
             "status": 401,
             "message": "User not authorized"
         }
     });
   }

   return next();
}