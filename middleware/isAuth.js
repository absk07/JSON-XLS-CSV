module.exports = (req, res, next) => {
    if(!req.session.admin) {
        req.session.redirect = req.method === 'GET' ? req.originalUrl : '/';
        return res.redirect('/auth/login');
    }
    if(req.session.admin.password.trim() !== process.env.ADMIN_PASSWORD.trim() || req.session.admin.username.trim().toLowerCase() !== process.env.ADMIN_USERNAME.trim().toLowerCase()) {
        req.session.redirect = req.method === 'GET' ? req.originalUrl : '/';
        req.session.admin = null;
        return res.redirect('/auth/login');
    }
    next();
}