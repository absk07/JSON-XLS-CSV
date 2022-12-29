exports.getLogin = (req, res, next) => {
    if (req.session.admin) {
        return res.redirect('/');
    }
    res.render('admin/login');
}

exports.postLogin = (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (username.trim().toLowerCase() !== process.env.ADMIN_USERNAME.trim().toLowerCase()) {
            req.flash('errorMessage', 'Invalid username.');
            return res.redirect('/auth/login');
        }
        if (password.trim() !== process.env.ADMIN_PASSWORD.trim()) {
            req.flash('errorMessage', 'Invalid password.');
            return res.redirect('/auth/login');
        }
        req.session.admin = { username, password };
        const redirect = req.session && req.session.redirect || '/';
        if (req.session.redirect) {
            req.session.redirect = undefined;
        }
        return req.session.save(err => {
            if (err) throw new Error(err);
            return res.redirect(redirect);
        });
    } catch (error) {
        next(error);
    }
}


exports.getLogout = async(req, res, next) => {
    try {
        req.session.destroy(err => {
            res.redirect('/auth/login');
        });
    } catch (error) {
        next(error);
    }
}