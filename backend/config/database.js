const mongoose = require('mongoose');

function connectDB() {
    mongoose.set('strictQuery', true);
    mongoose.connect("mongodb://localhost/neemtreeassignment", { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on('error', (error) => console.log(error));
    db.once('open', () => console.log('MongoDB Connected !!!'));
}

module.exports = connectDB;
