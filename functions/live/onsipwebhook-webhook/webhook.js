function main(params) {
  var openwhisk = require('openwhisk');
  var ow = openwhisk();

  switch (params.type) {
    case 'call.dialog.created':
      console.log('created ' + params.streamId)
      ow.actions.invoke({
        actionName: "invoker/onsip-webhook/logcallscloudant",
        params
      });
      return {
        statusCode: 200,
      };
      break;
    case 'call.dialog.confirmed':
      console.log('confirmed' + params.streamId)
      ow.actions.invoke({
        actionName: "invoker/onsip-webhook/logcallscloudant",
        params
      });
      return {
        statusCode: 200,
      };
      break;
    case 'call.dialog.terminated':
      console.log('terminated' + params.streamId)
      ow.actions.invoke({
        actionName: "invoker/onsip-webhook/logcallscloudant",
        params
      });
      return {
        statusCode: 200,
      };
      break;
    case 'call.dialog.referred':
      console.log('referred' + params.streamId)
      ow.actions.invoke({
        actionName: "invoker/onsip-webhook/logcallscloudant",
        params
      });
      return {
        statusCode: 200,
      };
      break;
    case 'call.dialog.failed':
      console.log('failed' + params.streamId)
      ow.actions.invoke({
        actionName: "invoker/onsip-webhook/logcallscloudant",
        params
      });
      return {
        statusCode: 200,
      };
      break;
    case 'call.recording.uploaded':
      console.log('recording uploaded ' + params.streamId)
      ow.actions.invoke({
        actionName: "invoker/onsip-webhook/logcallscloudant",
        params
      });
      return {
        statusCode: 200,
      };
      break;
    default:
      // console.log(params)
      console.log('error')
      return {
        statusCode: 200,
      };
  }

  //   return new Promise(function(resolve, reject) {

  //     var openwhisk = require('openwhisk');
  //     var list = ['1'];
  //     var ow = openwhisk();

  //     var actions = list.map(function (item) {
  //       return ow.actions.invoke({actionName: "invoker/onsip-webhook/logcallscloudant", params: params});
  //     });

  //     return Promise.all(actions).then(function (results) {
  //         console.log(results);
  //         return resolve(
  //           {
  //           statusCode: 200,
  //           headers: { 'Content-Type': 'application/json' },
  //           body: results,
  //           }
  //             );
  //     });
  //   });
}

// async function main(params) {
//       return new Promise(function(resolve, reject) {

//     var openwhisk = require('openwhisk');
//     var list = ['Susie', 'Freya', 'Ruth'];
//     var ow = openwhisk();

//     var actions = list.map(function (item) {
//       return ow.actions.invoke({actionName: "invoker/hello", params: {name: item}});
//     });

//     return Promise.all(actions).then(function (results) {
//         console.log(results);
//         // return resolve({payload: "All OK"});
//           return resolve({
//     statusCode: 200,
//     headers: { 'Content-Type': 'application/json' },
//     body: 'goodjob onsip',
//   });
// }
//     });
//   });
//     console.log('params ', params)
//   return {
//     statusCode: 200,
//     headers: { 'Content-Type': 'application/json' },
//     body: 'goodjob onsip',
//   };
// }
exports.main = main;