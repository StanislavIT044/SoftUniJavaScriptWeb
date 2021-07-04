const router = require('express').Router();

const { isUser } = require('../middlewares/guards');

router.get('/shared-trips', async (req, res) => {
    const trips = await req.storage.getAllTrips();

    res.render('trips/shared-trips', { trips });
});

router.get('/offer-trip', isUser(), (req, res) => {
    res.render('trips/trip-create');
});
router.post('/offer-trip', isUser(), async (req, res) => {
    const tripData = {
        startPoint: req.body.startPoint,
        endPoint: req.body.endPoint,
        date: req.body.date,
        time: req.body.time,
        carImegeUrl: req.body.carImegeUrl,
        carBrand: req.body.carBrand,
        seats: req.body.seats,
        price: req.body.price,
        description: req.body.description,
        creator: req.user._id,
    };

    try {
        await req.storage.createTrip(tripData);

        res.redirect('/trips/shared-trips');
    } catch (error) {
        console.log(error);
    }
});

router.get('/trip-details/:id', async (req, res) => {
    const trip = await req.storage.getTripById(req.params._id);
    console.log(req.params._id)
    res.render(`trips/trip-details`, trip);
});

module.exports = router;