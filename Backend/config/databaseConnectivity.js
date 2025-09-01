const mongoose = require('mongoose');
require('dotenv').config();

// const dbURI = 'mongodb://localhost:27017/demo';

const mongoConnect = async() => {
    const dbURI = process.env.MONGOURI;

    await mongoose.connect(dbURI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Failed to connect to MongoDB",err));
}

module.exports = {mongoConnect};