const {Movies} = require('../models/movie');
const auth = require('../middleware/auth');
const nodemailer = require('nodemailer');
// const valideteObjectnumber = require('../middleware/validateObjectnumber.js');
const express = require("express")
const router = express.Router()

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kinocoderscamp@gmail.com',
        pass: 'uczymysiereacta'
    }
});

/** if get into /api/movies it returns you all the movies from the list */
router.get('/', async (req, res) => {
    const movie = await Movies.find(req.params);

    res.send(movie);
});

/** get seance by number */
router.get('/:number', async (req, res) => {
    const movie = await Movies.findOne({
        number: req.params.number
    });

    res.send(movie);
});

/** update seats for the current movie */
router.put('/:number', async (req, res) => {
    const oldSeance = await Movies.findOne({number: req.params.number});

    const movie = await Movies.findOneAndUpdate({number: req.params.number}, ({
        seance: {
            hour: oldSeance.seance.hour,
            seats: req.body.seats
        }
    }));

    const mailOptions = {
        from: 'kinocoderscamp@gmail.com',
        to: `${req.body.email}`,
        subject: 'POTWIERDZENIE REZERWACJI',
        html: `<center><h1>Witaj ${req.body.name.value}, oto potwierdzenie rezerwacji.</h1><h3>Rezerwacja dotyczy seansu: {req.body.seance}</h3><p>Email został wygenerowany automatycznie</p><img src="http://www.salemtwincinema.com/images/footer-icons.gif"</img></center>`
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });

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