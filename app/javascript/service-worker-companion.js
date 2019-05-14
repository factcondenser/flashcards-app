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
