const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isGuest } = require('../middlewares/guards');

router.get('/register', isGuest(), (req, res) => {
    res.render('register');
    
});
router.post('/register',
    isGuest(),
    body('email', 'Invalid email!').isEmail(),
    // body('email').isLength({ min: 3 }).withMessage('Email must be at least 3 characters'), // TODO: change according to requiremetns
    body('rePass').custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error('Passwords don\'t match');
        }
        return true;
    }),
    async (req, res) => {
        const { errors } = validationResult(req);

        try {
            if (errors.length > 0) {
                throw new Error('Valiation error');
            }

            await req.auth.register(req.body.email, req.body.password, req.body.gender);

            res.redirect('/');

        } catch (err) {
            console.log(err.message)
            const ctx = {
                errors,
                userData: {
                    email: req.body.email
                }
            };
            res.render('register', { errors });
        }
    }
);

router.get('/login', isGuest(), (req, res) => {
    res.render('login');
});
router.post('/login', isGuest(), async (req, res) => {
    try {
        await req.auth.login(req.body.email, req.body.password);

        res.redirect('/');

    } catch (err) {
        console.log(err.message)
        const ctx = {
            errors: [err.message],
            userData: {
                email: req.body.email
            }
        };

        res.render('login', ctx);
    }

});

router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/');
});

module.exports = router;