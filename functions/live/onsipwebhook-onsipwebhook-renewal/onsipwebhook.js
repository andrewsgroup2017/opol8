const axios = require('axios')
const qs = require('qs')
// var parser = require('xml2json')

var prettyjson = require('prettyjson');
var sessionId = ''
const onsipApi = axios.create({
  baseURL: 'https://api.onsip.com/api',
  timeout: 10000,
  'Content-Type': 'application/x-www-form-urlencoded',
  'cache-control': 'no-cache'
});

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

function WebhookSubscriptionBrowse(sessionId) {
  return new Promise(function (resolve, reject) {
    resolve(onsipApi.post(
      "",
      qs.stringify({
        Action: "WebhookSubscriptionBrowse",
        SessionId: sessionId,
        OrganizationId: "74954", //71398
        // Name: "Test Subscription",
        Output: "json",
        // TargetUrl: 'https://openwhisk.ng.bluemix.net/api/v1/web/andrewsgroup_dev/onsip-webhook/webhook.json',
        // SslVerify: true
      })))
  })
}

function WebhookSubscriptionAdd(sessionId) {
  return new Promise(function (resolve, reject) {
    resolve(onsipApi.post(
      "",
      qs.stringify({
        Action: "WebhookSubscriptionAdd",
        SessionId: sessionId,
        OrganizationId: "74954", //71398
        Name: "Test Subscription2",
        Output: "json",
        TargetUrl: 'https://openwhisk.ng.bluemix.net/api/v1/web/andrewsgroup_dev/onsip-webhook/webhook.json',
        SslVerify: true
      })))
  })

}

function WebhookSubscriptionRenew(sessionId, websubId) {
  return new Promise(function (resolve, reject) {
    resolve(onsipApi.post(
      "",
      qs.stringify({
        Action: "WebhookSubscriptionRenew",
        SessionId: sessionId,
        Output: "json",
        WebhookSubscriptionId: websubId,

      })))
  })

}

async function main(params) {


  const session = await getSession()
  // console.log(session.data.Response.Context.Session.SessionId)
  // const hook = await WebhookSubscriptionAdd(session.data.Response.Context.Session.SessionId)
  const hookList = await WebhookSubscriptionBrowse(session.data.Response.Context.Session.SessionId)
  const renew = await WebhookSubscriptionRenew(session.data.Response.Context.Session.SessionId, hookList.data.Response.Result.WebhookSubscriptionBrowse.WebhookSubscriptions.WebhookSubscription.WebhookSubscriptionId)

  // console.log(session.data.Response.Context.Session.SessionId)
  // console.log(hookList.data.Response.Result.WebhookSubscriptionBrowse.WebhookSubscriptions.WebhookSubscription.WebhookSubscriptionId)
  // console.log(hookList)
  console.log(renew.data)
  // console.log(session)
  return renew.data

  // return session
  // return JSON.parse(parser.toJson(session.body)).Response.Context.Session.SessionId
  // return JSON.parse(parser.toJson(session.body)).Response.Context.Session.SessionId

  // var jp = JSON.parse(parser.toJson(session.body))
  // sessionId = JSON.parse(parser.toJson(session.body)).Response.Context.Session.SessionId
  // // console.log(sessionId)
  // console.log(prettyjson.render(session));

}

exports.main = main