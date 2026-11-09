function requireStaff(req, res, next) {
    // Check if the user is logged in as staff
    if (req.session && req.session.isStaff === true) {
        return next();
    }

    // Redirect visitors who aren't logged in
    return res.redirect('/login');
}

module.exports = { requireStaff };