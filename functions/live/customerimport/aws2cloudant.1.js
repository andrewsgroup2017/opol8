process.env.AWS_ACCESS_KEY_ID = "AKIAI42I2LQSIIUMD73A"
process.env.AWS_SECRET_ACCESS_KEY = "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"
var AWS = require('aws-sdk');
const transcribeservice = new AWS.TranscribeService({
  region: 'us-east-2'
});
//test

/**
 * Create document in database.
 */
function insert(cloudantDb, doc, params) {
  return new Promise(function (resolve, reject) {
    cloudantDb.insert(doc, params, function (error, response) {
      if (!error) {
        console.log("success", response);
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

function getCloudantAccount(message) {
  // full cloudant URL - Cloudant NPM package has issues creating valid URLs
  // when the username contains dashes (common in Bluemix scenarios)
  var cloudantUrl;

  if (message.url) {
    // use bluemix binding
    cloudantUrl = message.url;
  } else {
    if (!message.host) {
      return 'cloudant account host is required.';
    }
    if (!message.username) {
      return 'cloudant account username is required.';
    }
    if (!message.password) {
      return 'cloudant account password is required.';
    }

    cloudantUrl = "https://" + message.username + ":" + message.password + "@" + message.host;
  }

  return require('cloudant')({
    url: cloudantUrl
  });
}

function getTranscriptionJob(params) {
  var params = {
    TranscriptionJobName: params.TranscriptionJobName /* required */
  };
  transcribeservice.getTranscriptionJob(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data); // successful response
  });
}

function listTranscriptionJobs() {
  console.log('listTranscriptionJobs invoked')
  return new Promise(function (resolve, reject) {
    var params = {
      MaxResults: 20,
      //   NextToken: 'STRING_VALUE',
      Status: 'COMPLETED'
    };
    transcribeservice.listTranscriptionJobs(params, function (err, data) {
      if (err) {
        console.log(err)
        reject(err)
      } // an error occurre
      else {
        // console.log(data)
        resolve(data); // successful response
      }
    });
  })
}

function checkifExistsCloudant() {
  console.log('listTranscriptionJobs invoked')
  return new Promise(function (resolve, reject) {

  })
}
async function main(params) {
  console.log('zip read_aws_save_cloudant.js invoked')
  // return new asyncPromise(function (resolve, reject) {
  const jobs = await listTranscriptionJobs()
  console.log(jobs.TranscriptionJobSummaries)
  // for (var thisJob of jobs.TranscriptionJobSummaries) {
  //   if (!checkifExistsCloudant(thisJob)) {
  //     const jobDetails = await getTranscriptionJob(thisJob)
  //   }
  // }
  resolve(jobs.TranscriptionJobSummaries)
  // })
}

exports.main = main