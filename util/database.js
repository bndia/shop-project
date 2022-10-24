const mongodb = require('mongodb');
require('dotenv').config();
const MongoClient = mongodb.MongoClient;

let _db;

const MONGODB_URI = process.env.MONGODBURI;

const mongoConnect = callback => {
    MongoClient.connect(
        MONGODB_URI
    )
        .then(client => {
            console.log("Connected!");
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
}


exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
