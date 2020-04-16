const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = express.Router();
const PORT = 4000;

let User = require('./userModel');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/candelaLabs', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

//Get All users
userRoutes.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

//Get user by ID
userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, users) {
        res.json(users);
    });
});

//Add user
userRoutes.route('/add').post(function(req, res) {
    let userData = new User(req.body);
    userData.save()
        .then(users => {
            res.status(200).json({'User': 'user added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new user failed');
        });
});

//Update user
userRoutes.route('/update/:id').post(function(req, res) {
    User.findById(req.params.id, function(err, users) {
        if (!users)
            res.status(404).send('data is not found');
        else
            users.name = req.body.name;
            users.dob = req.body.dob;
            users.ms = req.body.ms;
            users.smoking = req.body.smoking;

        users.save().then(users => {
                res.json('User updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

//Delete user
userRoutes.route('/remove/:id').delete(function(req, res) {
    User.findOneAndRemove(req.params.id, function(err, users) {
        if (err) {
            console.log(err);
            res.status(400).send('adding new user failed');
        } else {
            res.json(users);
        }
    });
});

app.use('/users', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});