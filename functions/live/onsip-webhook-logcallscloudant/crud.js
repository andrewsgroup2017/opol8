'use strict';
process.env.CLOUDANT_URL = 'https://8e41cb6a-9660-44fc-a60e-3cbd4c952423-bluemix:35a7b60d8d7c5b651dc2534ee9c085d10415247383808c4cffa6cef2bbc307e6@8e41cb6a-9660-44fc-a60e-3cbd4c952423-bluemix.cloudant.com'
if (!process.env.CLOUDANT_URL) {
  console.error("Please put the URL of your Cloudant instance in an environment variable 'CLOUDANT_URL'");
  process.exit(1);
}
var moment = require('moment')
// load the Cloudant library
var async = require('async');
var Cloudant = require('@cloudant/cloudant');
var cloudant = Cloudant({
  url: process.env.CLOUDANT_URL
});
var db = cloudant.db.use('phonelogs');
var doc = null;

// // create a database
// var createDatabase = function (callback) {
//   console.log("Creating database '" + dbname + "'");
//   cloudant.db.create(dbname, function (err, data) {
//     if (err) {
//       console.log('Error:', err);

//     }
//     // console.log('Data:', data);
//     db = cloudant.db.use(dbname);
//     callback(err, data);
//   });
// };

// create a document
exports.createDocument = function (docId, callId, doc) {
  // console.log(moment()._d)
  // console.log(moment())
  return new Promise(function (resolve, reject) {

    db.insert({
      _id: docId,
      createdTime: new Date(),
      callId: callId,
      confirmed: false,
      transcript: false,
      // doc
      // callId: doc.callId,
      // fromUri: doc.fromUri,
      // toUri: doc.toUri,
      direction: doc.direction,
      phonenumber: doc.phonenumber,
      account: doc.account,
      // terminated: doc.false,
      // referred: doc.false,
      // sdr: doc.sdr,
      // failed: doc.false,
    }, function (err, data) {
      if (err) {
        console.log("Error Creating document " + docId);
        console.log(err)
        resolve(err)
      }
      console.log("Creating document " + docId);
      console.log(data)
      resolve(data)
    });
  })
};
// update a document
exports.updateDocument = function (doc) {
  console.log("Updating document " + doc._id);
  return new Promise(function (resolve, reject) {
    doc.updateTime = new Date()
    db.insert(
      doc
      // {
      //   updatedTime: new Date(),
      //   // doc
      //   // callId: doc.callId,
      //   callId: doc.callId,
      //   fromUri: doc.fromUri,
      //   toUri: doc.toUri,
      //   direction: doc.direction,
      //   phonenumber: doc.phonenumber,
      //   created: doc.true,
      //   terminated: doc.false,
      //   referred: doc.false,
      //   sdr: doc.sdr,
      //   failed: doc.false,
      // }

      ,
      function (err, data) {
        // console.log('Error:', err);
        // console.log('Data:', data);
        // keep the revision of the update so we can delete it
        // doc._rev = data.rev;
        // callback(err, data);
        if (err) {
          console.error(err.reason)
          resolve(err.reason)
        }
        console.warn(data)
        resolve(data)
      });
  });
};

exports.getAllUnconfirmedLogs = function () {
  return new Promise(function (resolve, reject) {

    db.list({
      include_docs: true
    }, function (err, data) {
      resolve(data.rows)
    });
  })
}
// read a document
exports.readDocument = function (docId) {
  return new Promise(function (resolve, reject) {
    db.get(docId, function (err, data) {

      if (err) {
        console.log("Error reading document: " + err.reason);
        resolve(null)
      } else {
        console.log("Reading document " + docId);
        resolve(data)
      }

    });
  });
};



// deleting a document
var deleteDocument = function (callback) {
  console.log("Deleting document 'mydoc'");
  // supply the id and revision to be deleted
  db.destroy(doc._id, doc._rev, function (err, data) {
    console.log('Error:', err);
    console.log('Data:', data);
    callback(err, data);
  });
};

// // deleting the database document
// var deleteDatabase = function (callback) {
//   console.log("Deleting database '" + dbname + "'");
//   cloudant.db.destroy(dbname, function (err, data) {
//     console.log('Error:', err);
//     console.log('Data:', data);
//     callback(err, data);
//   });
// };