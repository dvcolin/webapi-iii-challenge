const express = require('express');

const router = express.Router();

const UserDb = require('./userDb.js');


router.post('/', validateUser, (req, res) => {
        const user = req.user;

        UserDb.insert(user)
        .then(added => {
            res.status(201).json(added);
        })
        .catch(err => {
            res.status(500).json({ error: 'Error adding user to the database.' });
        })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    const post = req.post;
    const user = req.user;

    UserDb.insert({ ...post, user_id: user.id })
    .then(added => {
        res.status(201).json(added)
    })
    .catch(err => {
        console.log(post, user.id)
        res.status(500).json({ error: 'Error adding post to the database.' });
    })
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
    const userInfo = req.user;

    UserDb.getById(userInfo.id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({ error: 'The user data cannot be accessed' })
    })
});

router.get('/:id/posts', (req, res) => {
    const userId = req.params.id;

    UserDb.getById(userId)
    .then(user => {

    })

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const userId = req.params.id;

    UserDb.getById(userId)
    .then(result => {
        if (result) {
            req.user = result;
            
            next();
        } else {
            res.status(400).json({ message: "invalid user id" });
        }


    })
    .catch(err => {
        console.log(err);
    })

};

function validateUser(req, res, next) {
    const user = req.body;

    if (Object.getOwnPropertyNames(user).length !== 0) {
        if (!user.name) {
            console.log(user);
            res.status(400).json({ message: "missing required name field" });
        } else {
            req.user = user;
            next();
        }
    } else {
        res.status(400).json({ message: "missing user data" });
    }

};

function validatePost(req, res, next) {
    const post = req.body;

    if(Object.getOwnPropertyNames(post).length !== 0) {
        if (!post.body) {
            res.status(400).json({ message: "missing required text field" });
        } else {
            req.post = post;
            next();
        }
    } else {
        res.status(400).json({ message: "missing post data" });
    }

};

module.exports = router;
