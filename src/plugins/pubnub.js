// /* eslint-disable */
// export function publish() {

//   pubnub = new PubNub({
//     subscribeKey: 'sub-c-6c0fa8d2-850d-11e8-ac0f-0e4b9865ddaa',
//     publishKey: 'pub-c-74b5b283-b890-42c5-96ad-5013b1c7c906',
//   })

//   function publishSampleMessage() {
//     console.log("Since we're publishing on subscribe connectEvent, we're sure we'll receive the following publish.")
//     let publishConfig = {
//       channel: 'hello_world',
//       message: {
//         title: 'greeting',
//         description: 'hello world!'
//       }
//     }
//     pubnub.publish(publishConfig, function (status, response) {
//       console.log(status, response)
//     })
//   }

//   pubnub.addListener({
//     status: function (statusEvent) {
//       if (statusEvent.category === 'PNConnectedCategory') {
//         publishSampleMessage()
//       }
//     },
//     message: function (msg) {
//       console.log(msg.message.title)
//       console.log(msg.message.description)
//     },
//     presence: function (presenceEvent) {
//       // handle presence
//     }
//   })
//   console.log('Subscribing..')
//   pubnub.subscribe({
//     channels: ['hello_world']
//   })
// }