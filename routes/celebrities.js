const router = require("express").Router();
const Celebrity = require('../models/celebrity')

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
        .then(celebritiesFromDB => {
            console.log(celebritiesFromDB)
            res.render('celebrities/index', { celebritiesFromDB })
        })
        .catch(err => next(err))
});



router.get('/celebrities/newForm', (req, res, next) => {
    res.render('celebrities/newForm')

})


router.post('/celebrities', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body
    Celebrity.create({
        name: name,
        occupation: occupation,
        catchPhrase: catchPhrase

    })
        .then(createdCelebrity => {
            res.redirect(`celebrities/${createdCelebrity._id}`)
        })
})

router.get('/celebrities/:id', (req, res, next) => {
    const id = req.params.id
    Celebrity.findById(id)
        .then(celebritiesFromDB => {
            res.render('celebrities/show', { celebritiesFromDB })
        })

})

router.get('/celebrities/delete/:id', (req, res, next) => {
    const id = req.params.id
    Celebrity.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(err => {
            next(err)
        })
})
router.get('/celebrities/:id/edit', (req, res, next) => {
    const id = req.params.id
    console.log(req.params.id)

    Celebrity.findById(id)
        .then(celebrityFromDB => {
            console.log(celebrityFromDB)
            res.render('celebrities/edit', { celebrityFromDB })
        })
        .catch(err => next(err))
});



router.post('/celebrities/edit/:id', (req, res, next) => {
    const id = req.params.id
    const { name, occupation, catchPhrase } = req.body
    Celebrity.findByIdAndUpdate(id, {
        name,
        occupation,
        catchPhrase
    }, { new: true })
        .then(updatedCelebrity => {
            res.redirect(`/celebrities/${updatedCelebrity._id}`)
        })
        .catch(err => next(err))
});



module.exports = router;