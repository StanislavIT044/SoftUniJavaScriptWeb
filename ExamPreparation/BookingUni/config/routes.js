const authController = require('../controllers/authController');
const homeController = require('../controllers/homeCotroller');
const hotelController = require('../controllers/hotelController');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/hotels', hotelController);
}