const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
    MongoClient.connect(
        'mongodb+srv://admin-ben:LRt1JhCxr5O3c1xl@cluster0.mgxzh.mongodb.net/?retryWrites=true&w=majority'
    )
        .then(client => {
            console.log("Connected!");
            callback(client);
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = mongoConnect;
