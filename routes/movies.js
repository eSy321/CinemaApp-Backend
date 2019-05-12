const {Movies} = require('../models/movie');
const auth = require('../middleware/auth');
// const valideteObjectnumber = require('../middleware/validateObjectnumber.js');
const express = require("express")
const router = express.Router()

/** if get into /api/movies it returns you all the movies from the list */
router.get('/', async (req, res) => {
    const movie = await Movies.find(req.params);

    res.send(movie);
});

/** update seats for the current movie */
router.put('/:seanceNumber', async (req, res) => {
    const oldSeance = await Movies.findOne({number: req.params.seanceNumber});

    const movie = await Movies.findOneAndUpdate({number: req.params.seanceNumber}, ({
        seance: {
            hour: oldSeance.seance.hour,
            seats: req.body.seats
        }
    }));
        
    res.send(movie);
});

/** OPTIONALS */
/** create new movie */
router.post('/', async (req, res) => {
    const movie = new Movies({
        number: req.body.number,
        seance: {
            hour: req.body.hour,
            seats: req.body.seats
        }
    });

    movie = await movie.save();

    res.send(movie);
});

router.delete('/:number', async (req, res) => {
    const movie = await Movies.findOneAndRemove(({number: req.params.number}), () => {
        res.send(movie);
    });
});

module.exports = router;