const router = require('express').Router();

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});
router.post('/register', async (req, res) => {
    try {
        await req.auth.register(req.body);
        res.redirect('/products');
    } catch (error) {
        const ctx = {
            title: 'Register',
            error: error.message,
            data: { username: req.body.username }
        };

        res.render('register', ctx);
    }
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});
router.post('/login', async (req, res) => {
    try {
        await req.auth.login(req.body);

        // res.redirect('/auth/login');
        res.redirect('/products');
    } catch (error) {
        const ctx = {
            title: 'Login',
            error: error.message,
            data: { username: req.body.username }
        };

        res.render('login', ctx);
    }
});


module.exports = router;