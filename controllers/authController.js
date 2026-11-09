const authService = require('../services/authService');

// Display login page
function showLogin(req, res) {
    res.render('login', { error: null });
}

// Process staff login
async function login(req, res, next) {
    try {
        const { username, password } = req.body;

        const valid = await authService.verifyStaff(username, password);

        if (!valid) {
            return res.status(401).render('login', {
                error: 'Invalid username or password.'
            });
        }

        // Create a new session after successful login
        req.session.regenerate((err) => {
            if (err) return next(err);

            req.session.isStaff = true;

            req.session.save((err) => {
                if (err) return next(err);
                res.redirect('/staff');
            });
        });

    } catch (error) {
        next(error);
    }
}

// Log out staff
function logout(req, res, next) {
    req.session.destroy((err) => {
        if (err) return next(err);

        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
}

module.exports = { showLogin, login, logout };