import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { firebaseApp, auth } from './firebase.js';
import jQuery from 'jquery';
import "bootstrap/dist/css/bootstrap.css"; // Import bootstrap
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/app.scss';
import 'popper.js';




window.$ = window.jQuery = jQuery;

let app = '';

auth.onAuthStateChanged(function(user) {
  if (!app) {
    app = createApp(App);
    app.use(router, bootstrap);
    app.config.globalProperties.$isAuthenticated = !!user; // Set global variable
    app.mount("#app");
  }
});
