// export function camel (str) {
//   const camel = (str || '').replace(/-([^-])/g, g => g[1].toUpperCase());

//   return capitalize(camel);
// }

// export function camelActual (str) {
//   return (str || '').replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
// }

// export function kebab (str) {
//   return (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
// }

// export function capitalize (str) {
//   str = str || '';

//   return `${str.substr(0, 1).toUpperCase()}${str.slice(1)}`;
// }

// export function findProduct (store, id) {
//   return store.state.store.products.find(p => p.id === id);
// }

// export function isOnSale (variants) {
//   return variants.some(variant => {
//     return parseFloat(variant.price) < parseFloat(variant.compareAtPrice);
//   });
// }

// export function randomNumber (min, max) {
//   return Math.floor(Math.random() * max) + min;
// }

// export function randomString (length = 5) {
//   let text = '';
//   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   for (let i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }

//   return text;
// }

const location = () => {

  return new Promise(resolve => {
    let vm = this
    let errorHandler = function (error) {
      if (error.code === 1) {
        // log('Error: PERMISSION_DENIED: User denied access to their location')
      } else if (error.code === 2) {
        // log(
        //   'Error: POSITION_UNAVAILABLE: Network is down or positioning satellites cannot be reached'
        // )
      } else if (error.code === 3) {
        // log("Error: TIMEOUT: Calculating the user's location too took long")
      } else {
        // log('Unexpected error code')
      }
      resolve('error')
    }
    const geolocationCallback = function (location) {
      resolve(location)
    }
    if (
      typeof navigator !== 'undefined' &&
      typeof navigator.geolocation !== 'undefined'
    ) {
      // log('Asking user to get their location')
      navigator.geolocation.getCurrentPosition(
        geolocationCallback,
        errorHandler
      )
    } else {
      // log(
      //   'Your browser does not support the HTML5 Geolocation API, so this demo will not work.'
      // )
    }

  })
}


const randomElement = (arr = []) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

const kebab = str => {
  return (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

const toggleFullScreen = () => {
  let doc = window.document
  let docEl = doc.documentElement

  let requestFullScreen =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullScreen ||
    docEl.msRequestFullscreen
  let cancelFullScreen =
    doc.exitFullscreen ||
    doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen ||
    doc.msExitFullscreen

  if (!doc.fullscreenElement &&
    !doc.mozFullScreenElement &&
    !doc.webkitFullscreenElement &&
    !doc.msFullscreenElement
  ) {
    requestFullScreen.call(docEl)
  } else {
    cancelFullScreen.call(doc)
  }
}

export default {
  randomElement,
  toggleFullScreen,
  kebab,
  location
}