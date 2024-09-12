const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('./routes/users.js');

//! Connect to mongodb

mongoose.connect("mongodb+srv://sobhit230:sobhit230@cluster0.r5dwo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => console.log("DB connected")).catch((e) => console.log(e));


app.use(express.json());
app.use('/',router);

//! Start the server

const PORT = process.env.PORT || 3000;


app.get('/', function (req, res) {
    res.send('Hello World!');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});