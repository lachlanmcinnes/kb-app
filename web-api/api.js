// import modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');

// import models
const User = require('./models/user');

// define app
const app = express();
const port = 5000;

// connect to mongo database
mongoose.connect('mongodb+srv://lachlan:Kingkong1@sit314.myekw.mongodb.net/SIT314?retryWrites=true&w=majority', {useNewUrlParser: true});

// parse body using body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// allow cross origin reponses
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/register', (req, res) => {
    let { username, password, department } = req.body;

    console.log('hello');

    User.findOne({ username }, (err, found) => {
        if (err) {
            return res.json({
                'success': false,
                'message': err
            })
        }
        else if (found) {
            return res.json({
                'success': false,
                'message': 'That username is taken. Please choose a different username.'
            })
        }
        else {
            let newUser = new User({
                'userId': new mongoose.Types.ObjectId(),
                'username': username,
                'password': password,
                'department': department
            });
            newUser.save(err => {
                return err
                    ? res.json({
                        'success': false,
                        'message': err
                    })
                    : res.json({
                        'success': true,
                        'message': 'New user created successfully.',
                        'userId': newUser.userId
                    })
            });
        }
    });
});

app.post('/authenticate', (req, res) => {
    let { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
        if (err) {
            return res.json({
                'success': false,
                'message': err
            });
        }
        else if (!user || password != user.password) {
            return res.json({
                'success': false,
                'message': 'Incorrect username or password.'
            });
        }
        else {
            return res.json({
                'success': true,
                'message': 'User authenticated successfully.',
                'userId': user.userId,
                'department': user.department,
            });
        }
    });
});

app.get('/users/:userId/details', (req, res) => {
    const { userId } = req.params;
    User.findOne({ userId }, (err, user) => {
        if (err || ! user) {
            return err
                ? res.json({
                    'success': false,
                    'message': err
                })
                : res.json({
                    'success': false,
                    'message': 'Invalid user id.'
                });
        }
        else {
            let { department } = user;
            return res.json({
                'success': true,
                'message': 'Successfully retrieved user details.',
                department
            });
        }
    });
});

app.get('/', (req,res) => {
    return res.json({
        'success':true
    });
});

// start listener
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});