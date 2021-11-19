const mongoose = require('mongoose')
const router = require("express").Router();
const Celebrity = require('../models/celebrity')
const Movie = require('../models/Movie')


router.get("/movies/new", (req, res, next) => {
    Celebrity.find()
        .then((celebrities) => {
            res.render("movies/new", { celebrities });
        });
});

router.get("/movies", (req, res, next) => {
    Movie.find()
        .populate("cast")
        .then((movies) => {
            res.render("movies/index", { movies });
        });
});

router.post('/movies', (req, res, next) => {
    const { title, genre, plot, cast } = req.body
    Movie.create({
        title,
        genre,
        plot,
        cast
    })
        .then(createdMovie => {
            res.redirect('/movies')
        })
})

 router.get('/movies/:id/edit', (req, res, next) => {
     const id = req.params.id
     Movie.findById(id)
     .then(createdMovie => {
   res.render('movies/edit', { createdMovie })
    })
 .catch(err => next(err))
 });

router.post('/movies/edit/:id', (req, res, next) => {
    const { title, genre, plot, cast } = req.body
    Movie.findByIdAndUpdate(id, {
        title,
        genre,
        plot,
        cast
    }, { new: true })
    .then((updatedMovie) => {
        res.redirect(`/movies/${updatedMovie._id}`)
   })
  })



module.exports = router;