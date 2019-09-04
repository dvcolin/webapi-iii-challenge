const express = require('express');

const router = express.Router();

const UserDb = require('./userDb.js');

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
    UserDb.get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ error: 'User data could not be accessed.' })
    })
});

router.get('/:id', validateUserId, (req, res) => {
    const userBody = req.user;

    UserDb.getById(userBody.id)
    .then(user => {
        res.status(200).json(userBody)
    })
    .catch(err => {
        res.status(500).json({ error: 'The user data cannot be accessed' })
    })
});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const user = req.body;
    const userId = req.params.id;

    UserDb.getById(userId)
    .then(result => {
        if (result) {
            req.user = user;
        } else {
            res.status(400).json({ message: "invalid user id" });
        }

        next();
    })
    .catch(err => {
        console.log(err);
    })

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
