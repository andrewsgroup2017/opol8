// import { storage } from './firebase'
import firebase from '../plugins/firebase'

// firebase storage
let storage = firebase.storage()
// Error
const error = ''

export default {
  namespaced: true,
  state: {
    storage: storage,
    error: error
  },
  mutations: {
    uploadFile (state, file) {
      // let task = state.storage
      let task = storage
        .ref()
        .child(file.ref)
        .put(file.file)
      task.on(
        'state_changed',
        function progress (snapshot) {
          console.log(snapshot)
          // file.progress(snapshot)
        },
        function error (err) {
          file.error(err)
        },
        function completed () {
          // console.log(task.snapshot.ref.getDownloadURL)
          task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            file.completed(downloadURL)
            // console.log('File available at', downloadURL)
          })

          // file.completed(task.snapshot.task.uploadUrl_)
        }
      )
    },
    deleteFile (state, file) {
      let promis = state.storage
        .ref()
        .child(file.ref)
        .delete()
      promis
        .then(() => {
          file.result()
        })
        .catch(error => {
          file.error(error)
        })
    },
    uploadFiles (state, files) {
      for (let key in files.files) {
        if (files.files.hasOwnProperty(key)) {
          let task = state.storage
            .ref()
            .child(`${files.ref}/${files.files[key].name}`)
            .put(files.files[key])
          task.on(
            'state_changed',
            function progress (snapshot) {
              files.progress(snapshot)
            },
            function error (err) {
              files.error(err)
            },
            function completed () {
              files.completed()
            }
          )
        }
      }
    }
  },
  actions: {},
  getters: {}
}