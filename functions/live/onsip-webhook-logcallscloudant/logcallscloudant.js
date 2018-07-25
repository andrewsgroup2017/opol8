const phonelogs = require('./crud')
const axios = require('axios')
const qs = require('qs')
var moment = require('moment')
var unirest = require('unirest')
const onsipApi = axios.create({
  baseURL: 'https://api.onsip.com/api',
  timeout: 10000,
  'Content-Type': 'application/x-www-form-urlencoded',
  'cache-control': 'no-cache'
});
const smApi = axios.create({
  baseURL: 'https://api.servicemonster.net/v1',
  timeout: 10000,
  'Content-Type': 'application/json',
  'Authorization': 'Basic ZTZleGc0Nkw6bUM0RHM5MXFnZXdPUzFv'
});


var getDirection = function (callFrom, callTo) {
  if (callFrom.split('@')[1] != 'andrewsgroup.onsip.com') {
    return 'in'
  } else {
    return 'out'
  }

}
var getNumber = function (callFrom, callTo, direction) {
  if (direction == 'out') {
    // console.log(callTo)
    return callTo.substring(
      callTo.lastIndexOf("sip:") + 5,
      callTo.lastIndexOf("@"));
  } else {
    return callFrom.substring(
      callFrom.lastIndexOf("sip:") + 5,
      callFrom.lastIndexOf("@"))
  }
}

function getSession() {
  return new Promise(function (resolve, reject) {
    resolve(onsipApi.post(
      "",
      qs.stringify({
        Action: "SessionCreate",
        Username: "ash@andrewsgroup.onsip.com",
        Password: "Sugarlips42!",
        Output: "json"
      })))
  })
}



function getSessionDetailRecords(sessionId, callId) {
  var tenminutes = moment().subtract(60, 'minutes')
  var plushour = moment().add(1, 'minutes')

  return new Promise(function (resolve, reject) {
    var result = onsipApi.post(
      "",
      qs.stringify({
        Action: "SdrBrowse",
        SessionId: sessionId,
        StartDateTime: tenminutes._d,
        EndDateTime: plushour._d,
        Limit: 99,
        CalcFound: true,
        Output: "json",
      })).then(result => {
      if (result.data.Response.Result.SdrBrowse.Sdrs.Sdr.length > 0) {
        for (var call of result.data.Response.Result.SdrBrowse.Sdrs.Sdr) {
          if (call.CallId == callId) {
            console.log("found it !")
            resolve(call)
          }
        }
      } else {
        if (result.data.Response.Result.SdrBrowse.Sdrs.Sdr) {
          if (result.data.Response.Result.SdrBrowse.Sdrs.Sdr.CallId == callId) {
            console.log("found ", call.callId)
            resolve(call)
          }
        }
      }
      console.log("not found")
      resolve(false)
    }).catch(error => {
      console.log('error ', error)
    })
  })
}

async function confirmLog(sessionId, doc) {
  var confirmedDoc = await getSessionDetailRecords(sessionId, doc.callId)
  return new Promise(function (resolve, reject) {
    if (confirmedDoc) {
      // var temp = confirmedDoc
      // temp.
      //   doc.sdr = confirmedDoc
      Object.assign(doc, confirmedDoc)
      doc.confirmed = true

      resolve(phonelogs.updateDocument(doc))
    } else {
      resolve(false)
    }
  })
}

async function getAccount(_phoneNumber) {
  String.prototype.insert = function (index, string) {
    if (index > 0)
      return this.substring(0, index) + string + this.substring(index, this.length);
    else
      return string + this;
  };
  var phoneNumber = _phoneNumber.substr(_phoneNumber.length - 7)
  phoneNumber = phoneNumber.insert(3, "-");
  return new Promise(function (resolve, reject) {

    console.log(phoneNumber)
    unirest.get(`https://api.servicemonster.net/v1/accounts?wField=phone1&wValue=${phoneNumber}&wOperator=like`)
      .headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Basic ZTZleGc0Nkw6bUM0RHM5MXFnZXdPUzFv"
      })
      .end(function (response) {
        if (response.body.items.length < 1) {
          unirest.get(`https://api.servicemonster.net/v1/accounts?wField=phone2&wValue=${phoneNumber}&wOperator=like`)
            .headers({
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': "Basic ZTZleGc0Nkw6bUM0RHM5MXFnZXdPUzFv"
            })
            .end(function (response) {
              console.log(response.body)
              if (response.body.items.length < 1) {
                resolve('notfound')
              } else {
                for (var account of response.body.items) {
                  console.log(account)
                  resolve(account)
                  break
                }
              }
              // for (var account of response.body.items) {
              //   console.log(account)
              //   resolve(account)
              // }
            })
        }
        for (var account of response.body.items) {
          console.log(account)
          resolve(account)
          break
        }

      });
  })
}


async function main(params) {
  switch (params.type) {
    case 'confirm':
      console.log('confirming run ')
      try {
        var list = []
        var logs = await phonelogs.getAllUnconfirmedLogs()
        var session = await getSession()
        var sessionId = session.data.Response.Context.Session.SessionId
        for (var log of logs) {
          if (!log.doc.confirmed) {
            if (log.doc.callId) {
              list.push(await confirmLog(sessionId, log.doc))
            }
          }
        }
        return { //Basic ZTZleGc0Nkw6bUM0RHM5MXFnZXdPUzFv
          status: 200,
          data: list
        }
      } catch (error) {
        return {
          status: 500,
          data: list
        }
      }

      break
    case 'call.dialog.created':
      console.log('call.dialog.created ' + params.streamId)
      var direction = getDirection(params.payload.fromUri, params.payload.toUri)
      var phonenumber = getNumber(params.payload.fromUri, params.payload.toUri, direction)
      var account = await getAccount(phonenumber)
      var call = {
        callId: params.payload.callId,
        direction: direction,
        account: account,
        phonenumber: phonenumber,
        //   created: true,
        //   terminated: false,
        //   referred: false,
        //   failed: false,
      }
      // console.log(params.streamId)
      // console.log(call)

      var created = await phonelogs.createDocument(params.streamId, params.payload.callId, call)
      // console.log(created)
      return {
        // result: created
        result: 'created'
      }
      break;
    case 'call.dialog.created':
      console.log('created v1' + params.streamId)
      return {
        result: 'created'
      }
      // var doc = await phonelogs.readDocument(params.streamId)

      // doc.terminated = true
      // console.log('termianted getting session detail record')

      // var session = await getSession()
      // console.log(session.data.Response.Context.Session.SessionId)
      // const sdr = await getSessionDetailRecords(session.data.Response.Context.Session.SessionId, doc.params.callId)
      // doc.sdr = sdr
      // return await phonelogs.updateDocument(doc)
      // // return {
      // //   result: 'terminated'
      // // }
      break;
    case 'call.dialog.failed':
      console.log('failed v1' + params.streamId)
      var doc = await phonelogs.readDocument(params.streamId)
      return {
        result: 'failed'
      }

      // var session = await getSession()
      // console.log('failed getting session detail record')
      // // var session = await getSession()
      // doc.sdr = await getSessionDetailRecords(session.data.Response.Context.Session.SessionId, doc.params.callId)
      doc.failed = true
      return await phonelogs.updateDocument(doc)
      // console.log(_sdr)
      // return {
      //   result: 'failed'
      // }
      break;
    case 'call.dialog.terminated':
      console.log('terminated ' + params.streamId)
      // var doc = await phonelogs.readDocument(params.streamId)
      // var session = await getSession()
      // const _sdr = await getSessionDetailRecords(session.data.Response.Context.Session.SessionId, params.payload.callId)
      // console.log(_sdr)
      return {
        result: 'confirmed'
      }
      break;
    case 'call.dialog.referred':
      console.log('referred ' + params.streamId)
      var doc = await phonelogs.readDocument(params.streamId)

      doc.referred = true
      // return await phonelogs.updateDocument(doc)
      return {
        result: 'tarminated'
      }
      break;

    case 'call.recording.uploaded':
      // console.log('recording.uploaded ' + params.streamId)
      var doc = await phonelogs.readDocument(params.streamId)
      var recording = {
        bucket: params.payload.bucket,
        key: params.payload.key,
        service: params.payload.service
      }
      doc.recording = recording
      // if (doc.sdr == 'notavaialable') {
      //   console.log('recording updateding sdr ')
      //   var session = await getSession()
      //   const _sdr = await getSessionDetailRecords(session.data.Response.Context.Session.SessionId, params.payload.callId)
      //   doc.sdr = _sdr
      //   return await phonelogs.updateDocument(doc)
      // }
      return await phonelogs.updateDocument(doc)

      break;
    default:
      console.log('from web? => ', params.type)
      return {
        payload: "fromweb"
      }
  }
  //  var message = "Type: " + params.type;
  return {
    payload: "ok"
  }
}
exports.main = main

// process.env.AWS_ACCESS_KEY_ID = "AKIAI42I2LQSIIUMD73A"
// process.env.AWS_SECRET_ACCESS_KEY = "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"
// var AWS = require('aws-sdk');
// var prettyjson = require('prettyjson');


// const transcribeservice = new AWS.TranscribeService({
//   region: 'us-east-2'
// });
// const cloudantUrl = 'https://8e41cb6a-9660-44fc-a60e-3cbd4c952423-bluemix:35a7b60d8d7c5b651dc2534ee9c085d10415247383808c4cffa6cef2bbc307e6@8e41cb6a-9660-44fc-a60e-3cbd4c952423-bluemix.cloudant.com'
// const dbName = 'transcripts'
// // const dbName = 'library'
// var db

// //test

// /**
//  * Create document in database.
//  */
// function insert(cloudantDb, doc, params) {
//   return new Promise(function (resolve, reject) {
//     cloudantDb.insert(doc, params, function (error, response) {
//       if (!error) {
//         console.log("success", response);
//         resolve(response);
//       } else {
//         console.log("error", error);
//         reject(error);
//       }
//     });
//   });
// }

// function readDocument(cloudantDb, docId, params) {
//   return new Promise(function (resolve, reject) {
//     cloudantDb.get(docId, params, function (error, response) {
//       if (!error) {
//         console.log('success', response);
//         resolve(response);
//       } else {
//         console.error('error', error);
//         reject(error);
//       }
//     });
//   });
// }

// function getTranscriptionJob(params) {
//   var params = {
//     TranscriptionJobName: params.TranscriptionJobName /* required */
//   };
//   transcribeservice.getTranscriptionJob(params, function (err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else console.log(data); // successful response
//   });
// }

// function listTranscriptionJobs() {
//   console.log('listTranscriptionJobs invoked')
//   return new Promise(function (resolve, reject) {
//     var params = {
//       MaxResults: 20,
//       //   NextToken: 'STRING_VALUE',
//       Status: 'COMPLETED'
//     };
//     transcribeservice.listTranscriptionJobs(params, function (err, data) {
//       if (err) {
//         console.log(err)
//         reject(err)
//       } // an error occurre
//       else {
//         resolve(data); // successful response
//       }
//     });
//   })
// }

// function removeExistingJobs(jobsList) {
//   console.log('checkifExistsCloudant invoked')
//   return new Promise(function (resolve, reject) {
//     for (var job of jobsList.TranscriptionJobSummaries) {
//       // console.log(job)
//       console.log(prettyjson.render(job));
//       readDocument(cloudantDb, job.TranscriptionJobName, params)
//     }
//   })
// }

// function getDatabase() {
//   var cloudantOrError = require('cloudant')({
//     url: cloudantUrl
//   });
//   if (typeof cloudantOrError !== 'object') {
//     return Promise.reject(cloudantOrError);
//   }
//   db = cloudantOrError;
//   if (!dbName) {
//     return Promise.reject('dbname is required.');
//   }
//   db = db.use(dbName);
//   if (typeof db !== 'object') {
//     return Promise.reject(db);
//   }
//   return Promise.resolve(db)
// }

// function insertBooks() {
//   return new Promise(function (resolve, reject) {
//     var books = [{
//         author: "Charles Dickens",
//         title: "David Copperfield"
//       },
//       {
//         author: "David Copperfield",
//         title: "Tales of the Impossible"
//       },
//       {
//         author: "Charles Dickens",
//         title: "Great Expectation"
//       }
//     ]

//     db.bulk({
//       docs: books
//     }, function (er) {
//       if (er) {
//         throw er;
//       }

//       resolve(console.log('Inserted all documents'));
//     });
//   })
// }

// function determineExtension() {

// }

// function getActors() {

// }



// function insertTranscript(transcriptionJob) {
//   return new Promise(function (resolve, reject) {

//     var transcript = {
//       jobName: transcriptionJob.TranscriptionJobName,
//       mediaFileUri: transcriptionJob.Media.MediaFileUri,
//       transcript: transcript.results.transcripts[0].transcript,
//       extension: determineExtension(),
//       phoneNumber: _phoneNumber,
//       direction: _direction,
//       actors: getActors()
//     }

//     var transcript = {

//     }
//     db.bulk({
//       docs: books
//     }, function (er) {
//       if (er) {
//         throw er;
//       }

//       resolve(console.log('Inserted all documents'));
//     });
//   })
// }

// async function createIndex() {
//   // Note, you can make a normal JavaScript function. It is not necessary
//   // for you to convert it to a string as with other languages and tools.
//   var book_indexer = function (doc) {
//     if (doc.author && doc.title) {
//       // This looks like a book.
//       index('title', doc.title);
//       index('author', doc.author);
//     }
//   }

//   var ddoc = {
//     _id: '_design/library',
//     indexes: {
//       books: {
//         analyzer: {
//           name: 'standard'
//         },
//         index: book_indexer
//       }
//     }
//   };

//   db.insert(ddoc, function (er, result) {
//     if (er) {
//       throw er;
//     }

//     console.log('Created design document with books index');
//   });
// }
// async function searchDB(author) {
//   db.search('library', 'books', {
//     q: 'author:' + author
//   }, function (er, result) {
//     if (er) {
//       throw er;
//     }

//     console.log('Showing %d out of a total %d books', result.rows.length, result.total_rows);
//     for (var i = 0; i < result.rows.length; i++) {
//       console.log('Document id: %s', result.rows[i].id);
//     }
//   });
// }
// async function getIndexes() {
//   // return new Promise(function (resolve, reject) {

//   db.index(function (er, result) {
//     if (er) {
//       throw er;
//     }

//     console.log('The database has %d indexes', result.indexes.length);
//     for (var i = 0; i < result.indexes.length; i++) {
//       console.log('  %s (%s): %j', result.indexes[i].name, result.indexes[i].type, result.indexes[i].def);
//     }

//     result.should.have.a.property('indexes').which.is.an.Array;
//     done();
//   });
//   // })
// }

// async function main(params) {
//   console.log('zip aws2cloudant.js invoked')
//   db = await getDatabase()
//   // const books = await insertBooks(cloudantDb)
//   // return await createIndex(cloudantDb)
//   return getIndexes();
//   //return searchDB('David Copperfield')

//   // try {
//   //   const jobsList = await listTranscriptionJobs()
//   //   jobsList = await removeExistingJobs(jobsList)
//   //   console.log(jobsList)
//   //   return jobsList
//   // } catch (error) {
//   //   console.log(error)
//   //   return error
//   // }

// }

// exports.main = main