//Connect express, cors, and mongoDB

const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const UserModel = require('./models/User')

app.use(express.json());
app.use(cors());

//Allow all cors "access-origin"
app.options('*', cors());

mongoose.connect('mongodb+srv://seannarron9:dragon928@crud.4fkaje4.mongodb.net/user?retryWrites=true&w=majority', {
    useNewUrlParser: true,
})


//API
app.get("/users", (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
})

app.get('/users/:id', (req, res) => {

    const id = req.params.id

    UserModel.find({_id: id}, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
})

app.post('/insert', (req, res) => {
    
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

app.put('/update', (req, res) => {
    const id = req.body.id;
    const userName = req.body.userName;
    const userOrientation = req.body.userOrientation;
    try {
        UserModel.findById(id, (err, updatedData) => {
            updatedData.userName = userName;
            updatedData.userOrientation = userOrientation;
            updatedData.save();
            res.send("Updated!")

        })
    } catch (err) {
        console.log(err)
    }
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    try {
        UserModel.findByIdAndRemove(id).exec();
        res.send("Deleted!")
    } catch (err) {
        console.log(err)
    }
})


//Listen to port
app.listen(3001, () => {
    console.log('SERVER RUNNING!')
})