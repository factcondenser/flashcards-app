// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import { registerServiceWorker, subscribeWorkerToService } from '../service-worker-companion';
import "../application.css";

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('flashcards_data');
  const { flashcards, vapid_public_key: vapidPublicKey, current_user: userInfo } = JSON.parse(node.getAttribute('data'));
  if (navigator.serviceWorker) {
    if (!navigator.serviceWorker.controller) {
      registerServiceWorker();
    }
    subscribeWorkerToService(new Uint8Array(vapidPublicKey));
  };

  ReactDOM.render(
    <App flashcards={flashcards} userInfo={userInfo}/>,
    document.body.appendChild(document.createElement('div')),
  )
})
