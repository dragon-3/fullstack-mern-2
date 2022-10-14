//Connect express, cors, and mongoDB

const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const UserModel = require('./models/User')

app.use(express.json());
app.use(cors());

//Allow all cors "access-origin"
// app.options('*', cors());

mongoose.connect('mongodb+srv://seannarron9:dragon928@crud.4fkaje4.mongodb.net/user?retryWrites=true&w=majority')


//API
app.get("/users", (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
})

app.post('insert', (req, res) => {
    
    const userName = req.body.userName;
    const userOrientation = req.body.userOrientation;

    const user = new UserModel({
        userName: userName,
        userOrientation: userOrientation
    })

    try {
        user.save();
        res.send("Inserted!")
    } catch (err) {
        console.log(err)
    }
    

})


//Listen to port
app.listen(3001, () => {
    console.log('SERVER RUNNING!')
})