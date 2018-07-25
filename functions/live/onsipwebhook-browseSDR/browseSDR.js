const axios = require('axios')
process.env.CLOUDANT_URL = 'https://8e41cb6a-9660-44fc-a60e-3cbd4c952423-bluemix:35a7b60d8d7c5b651dc2534ee9c085d10415247383808c4cffa6cef2bbc307e6@8e41cb6a-9660-44fc-a60e-3cbd4c952423-bluemix.cloudant.com'
const qs = require('qs')
const moment = require('moment')
const unirest = require('unirest')
var Cloudant = require('@cloudant/cloudant');
var cloudant = Cloudant({
  url: process.env.CLOUDANT_URL
});
var db = cloudant.db.use('phonelogs');
var doc = null;
var sessionId = ''
const onsipApi = axios.create({
  baseURL: 'https://api.onsip.com/api',
  timeout: 10000,
  'Content-Type': 'application/x-www-form-urlencoded',
  'cache-control': 'no-cache'
});

function createDocument(doc) {
  // console.log(moment()._d)
  // console.log(moment())
  return new Promise(function (resolve, reject) {

    db.insert(doc, function (err, data) {
      if (err) {
        console.log("Error Creating document " + doc._id);
        console.log(err)
        resolve(err)
      }
      console.log("Creating document " + doc._id);
      console.log(data)
      resolve(data)
    });
  })
};

function getSessionDetailRecords(sessionId, callId) {
  var hourago = moment().subtract(10, 'minutes')
  var plushour = moment().add(1, 'hour')
  var prevMonthFirstDay = new moment().subtract(2, 'months').date(1)
  var lastDay = new moment().subtract(2, 'months').date(30)


  return new Promise(function (resolve, reject) {
    var result = onsipApi.post(
      "",
      qs.stringify({
        Action: "SdrBrowse",
        SessionId: sessionId,
        StartDateTime: prevMonthFirstDay._d,
        // EndDateTime: lastDay._d,
        // Limit: 10000,
        Limit: 10000,
        CalcFound: true,
        Output: "json",
      })).then(result => {
      // console.log(result.data.Response)
      // console.log(result.data.Response.Result.SdrBrowse.Sdrs.Sdr)
      resolve(result.data.Response.Result.SdrBrowse.Sdrs.Sdr)
      // for (var call of result.data.Response.Result.SdrBrowse.Sdrs.Sdr) {
      //   console.log(call.CallId)
      // }
      resolve("not found")
    }).catch(error => {
      console.log(error)
      resolve(error)

    })
  })
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

var getDirection = function (callFrom, callTo) {
  // console.log(callFrom.split('@')[0])
  if (callFrom.split('@')[1] == 'andrewsgroup.onsip.com' || callFrom.split('@')[0] == 'sip:19035663081' || callFrom.split('@')[0] == 'sip:19035663068') {
    return 'out'
  } else {
    return 'in'
  }
  console.log(error)
}
var getNumber = function (callFrom, callTo, direction) {
  // console.log(direction)
  if (direction == 'out') {
    return callTo.substring(
      callTo.lastIndexOf("sip:") + 4,
      callTo.lastIndexOf("@"));
  } else {
    // console.log(callFrom)
    return callFrom.substring(
      callFrom.lastIndexOf("sip:") + 4,
      callFrom.lastIndexOf("@"))
  }
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
    6

    // console.log(phoneNumber)
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
              // console.log(response.body)
              // console.log('2nd loop')
              if (response.body.items.length < 1) {
                unirest.get(`https://api.servicemonster.net/v1/accounts?wField=phone3&wValue=${phoneNumber}&wOperator=like`)
                  .headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Basic ZTZleGc0Nkw6bUM0RHM5MXFnZXdPUzFv"
                  })
                  .end(function (response) {
                    // console.log('3rd loop')
                    if (response.body.items.length < 1) {
                      resolve('notfound')
                    } else {
                      for (var account of response.body.items) {
                        // console.log(account)
                        resolve(account)
                        break
                      }
                    }
                  })
              } else {
                for (var account of response.body.items) {
                  // console.log(account)
                  resolve(account)
                  break
                }
              }
            })
        }
        for (var account of response.body.items) {
          // console.log('first loop')
          resolve(account)
          break
        }

      });
  })
}
async function main(params) {
  var nf = 0
  var t = 0
  var session = await getSession()
  var sdrs = await getSessionDetailRecords(session.data.Response.Context.Session.SessionId, null)
  for (var sdr of sdrs) {
    console.log(sdr.CallId)
    sdr._id = sdr.CallId

    var gd = getDirection(sdr.CallerAddress, sdr.CalleeAddress)
    var phonenumber = getNumber(sdr.CallerAddress, sdr.CalleeAddress, gd)
    var fixed = phonenumber.replace("+1", "")
    if (fixed.charAt(0) == '1') {
      var f = fixed.substr(1);
    }
    sdr.phoneNumber = f
    sdr.direction = gd
    sdr.SMAccountId = await getAccount(f)
    if (sdr.SMAccountId == 'notfound') {
      nf++
    }
    t++
    var doc = await createDocument(sdr)
  }
  console.log(t)
  console.log(nf)
}
exports.main = main;