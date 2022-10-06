const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://admin-ben:LRt1JhCxr5O3c1xl@cluster0-mgxzh.mongodb.net/test?retryWrites=true')
        .then(result => {
            console.log("Connected!");
            callback(result);
        })
        .catch(err => {
            console.log(err);
        });
};

module.export = mongoConnect;