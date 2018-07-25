process.env.AWS_ACCESS_KEY_ID = "AKIAI42I2LQSIIUMD73A"
process.env.AWS_SECRET_ACCESS_KEY = "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"
var AWS = require('aws-sdk');
var prettyjson = require('prettyjson');
var unirest = require('unirest')

const transcribeservice = new AWS.TranscribeService({
  region: 'us-east-2'
});
const cloudantUrl = 'https://8e41cb6a-9660-44fc-a60e-3cbd4c952423-bluemix:35a7b60d8d7c5b651dc2534ee9c085d10415247383808c4cffa6cef2bbc307e6@8e41cb6a-9660-44fc-a60e-3cbd4c952423-bluemix.cloudant.com'
const dbName = 'transcripts'
// const dbName = 'library'
var db

//test

/**
 * Create document in database.
 */
function insert(doc) {
  return new Promise(function (resolve, reject) {
    if (!doc) {
      resolve('error')
    }
    console.log('inserting ', doc.jobName)
    db.insert({
      jobName: doc.jobName,
      transcript: doc.transcript
    }, function (error, response) {
      if (!error) {
        // console.log("success", response);
        resolve(response);
      } else {
        console.log("error", error);
        reject(error);
      }
    });
  });
}

function readDocument(cloudantDb, docId, params) {
  return new Promise(function (resolve, reject) {
    cloudantDb.get(docId, params, function (error, response) {
      if (!error) {
        console.log('success', response);
        resolve(response);
      } else {
        console.error('error', error);
        reject(error);
      }
    });
  });
}




function removeExistingJobs(jobsList) {
  console.log('checkifExistsCloudant invoked')
  return new Promise(function (resolve, reject) {
    for (var job of jobsList.TranscriptionJobSummaries) {
      // console.log(job)
      console.log(prettyjson.render(job));
      readDocument(cloudantDb, job.TranscriptionJobName, params)
    }
  })
}

function getDatabase() {
  var cloudantOrError = require('cloudant')({
    url: cloudantUrl
  });
  if (typeof cloudantOrError !== 'object') {
    return Promise.reject(cloudantOrError);
  }
  db = cloudantOrError;
  if (!dbName) {
    return Promise.reject('dbname is required.');
  }
  db = db.use(dbName);
  if (typeof db !== 'object') {
    return Promise.reject(db);
  }
  return Promise.resolve(db)
}

function insertBooks() {
  return new Promise(function (resolve, reject) {
    var books = [{
        author: "Charles Dickens",
        title: "David Copperfield"
      },
      {
        author: "David Copperfield",
        title: "Tales of the Impossible"
      },
      {
        author: "Charles Dickens",
        title: "Great Expectation"
      }
    ]

    db.bulk({
      docs: books
    }, function (er) {
      if (er) {
        throw er;
      }

      resolve(console.log('Inserted all documents'));
    });
  })
}


function insertTranscript(transcriptionJob) {
  return new Promise(function (resolve, reject) {

    var transcript = {
      jobName: transcriptionJob.TranscriptionJobName,
      mediaFileUri: transcriptionJob.Media.MediaFileUri,
      transcript: transcript.results.transcripts[0].transcript,
      extension: determineExtension(),
      phoneNumber: _phoneNumber,
      direction: _direction,
      actors: getActors()
    }

    var transcript = {

    }
    db.bulk({
      docs: books
    }, function (er) {
      if (er) {
        throw er;
      }

      resolve(console.log('Inserted all documents'));
    });
  })
}

async function createIndex() {
  // Note, you can make a normal JavaScript function. It is not necessary
  // for you to convert it to a string as with other languages and tools.
  var book_indexer = function (doc) {
    if (doc.author && doc.title) {
      // This looks like a book.
      index('title', doc.title);
      index('author', doc.author);
    }
  }

  var ddoc = {
    _id: '_design/library',
    indexes: {
      books: {
        analyzer: {
          name: 'standard'
        },
        index: book_indexer
      }
    }
  };

  db.insert(ddoc, function (er, result) {
    if (er) {
      throw er;
    }

    console.log('Created design document with books index');
  });
}
async function searchDB(author) {
  db.search('library', 'books', {
    q: 'author:' + author
  }, function (er, result) {
    if (er) {
      throw er;
    }

    console.log('Showing %d out of a total %d books', result.rows.length, result.total_rows);
    for (var i = 0; i < result.rows.length; i++) {
      console.log('Document id: %s', result.rows[i].id);
    }
  });
}
async function getIndexes() {
  // return new Promise(function (resolve, reject) {

  db.index(function (er, result) {
    if (er) {
      throw er;
    }

    console.log('The database has %d indexes', result.indexes.length);
    for (var i = 0; i < result.indexes.length; i++) {
      console.log('  %s (%s): %j', result.indexes[i].name, result.indexes[i].type, result.indexes[i].def);
    }

    result.should.have.a.property('indexes').which.is.an.Array;
    done();
  });
  // })
}

function listTranscriptionJobs(token) {
  console.log('listTranscriptionJobs invoked')
  return new Promise(function (resolve, reject) {
    var params = {
      NextToken: token,
      MaxResults: 100,
      Status: 'COMPLETED'
    };
    transcribeservice.listTranscriptionJobs(params, function (err, data) {
      if (err) {
        console.log(err)
        resolve(err)
      } // an error occurre
      else {
        resolve(data); // successful response
      }
    });
  })
}

function getTranscriptionJob(name) {
  return new Promise(function (resolve, reject) {

    var params = {
      TranscriptionJobName: name /* required */
    };
    transcribeservice.getTranscriptionJob(params, function (err, data) {
      if (err) resolve(err); // an error occurred
      else resolve(data); // successful response
    });
  })
}

function getTranscript(url) {
  return new Promise(function (resolve, reject) {

    unirest.get(url)
      .headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',

      })
      .end(function (response) {
        resolve(response)
      })
  })
  // .end(function (response) {

  //   // return JSON.parse(response.raw_body).results.transcripts[0].transcript
  //   // console.log(JSON.parse(response.raw_body).results.transcripts[0].transcript)
  //   // var script = JSON.parse(response.raw_body).results.transcripts[0].transcript
  //   // console.log(JSON.parse(response.raw_body).results.transcripts[0].transcript)
  //   // if (JSON.parse(response.raw_body).results.transcripts[0].transcript) {
  //   //   resolve(JSON.parse(response.raw_body).results.transcripts[0].transcript)
  //   // } else {
  //   //   resolve('notavailable')
  //   // }
  //   // resolve(JSON.parse(response.raw_body).results.transcripts[0].transcript)
  // }).catch(error => {
  //   resolve(error)
  // })
  // })
}



async function main(params) {
  console.log('aws2cloudant.js invoked')
  db = await getDatabase()

  var finalList = []
  var jobList = await listTranscriptionJobs()
  finalList.push(jobList.TranscriptionJobSummaries)
  while (jobList.NextToken) {
    jobList = await listTranscriptionJobs(jobList.NextToken)
    finalList.push(jobList.TranscriptionJobSummaries)

  }
  var merged = [].concat.apply([], finalList);
  var completedList = []
  var transcriptList = []
  for (var job of merged) {
    job.transcript = ''
    var jobDetails = await getTranscriptionJob(job.TranscriptionJobName)
    var uri = null
    try {
      uri = jobDetails.TranscriptionJob.Transcript.TranscriptFileUri
    } catch (error) {
      console.log(error)
    }
    if (uri) {
      getTranscript(uri).then(result => {
        // console.log(JSON.parse(result.raw_body).results.transcripts[0].transcript)
        var entry = {}
        try {
          entry.transcript = JSON.parse(result.raw_body).results.transcripts[0].transcript
          entry.jobName = job.TranscriptionJobName
          if (entry.transcript) {
            insert(entry)
          }
        } catch (error) {}
      })
    }
  }
  console.log(transcriptList)
  // var jobList1 = await listTranscriptionJobs(jobList1.NextToken)
  // var jobList2 = await listTranscriptionJobs(jobList1.NextToken)
  // const books = await insertBooks(cloudantDb)
  // return await createIndex(cloudantDb)
  return transcriptList
  //return searchDB('David Copperfield')



}

exports.main = main