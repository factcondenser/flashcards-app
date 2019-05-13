export const registerServiceWorker = async () => {
  await navigator.serviceWorker.register('/service-worker.js', { scope: './' });
  console.log('[Companion]', 'Service worker registered!');
}

export const subscribeWorkerToService = async (vapidPublicKey) => {
  // When serviceWorker is supported, installed, and activated,
  // subscribe the pushManager property with the vapidPublicKey
  const registration = await navigator.serviceWorker.ready
  console.log('[Companion]', 'Registration found!');
  await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: vapidPublicKey
  });
  console.log('[Companion]', 'Service worker subscribed!');
}

// // Check if the browser supports notifications
// if (!("Notification" in window)) {
//   console.error("This browser does not support desktop notification");
// } // Check whether notification permissions have already been granted
// else if (Notification.permission === "granted") {
//   console.log("Permission to receive notifications has been granted");
// } // Otherwise, we need to ask the user for permission
// else if (Notification.permission !== 'denied') {
//   Notification.requestPermission(function (permission) {
//     // If the user accepts, let's create a notification
//     if (permission === "granted") {
//       console.log("Permission to receive notifications has been granted");
//     }
//   });
// }
