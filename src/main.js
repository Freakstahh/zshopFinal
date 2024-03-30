import { createApp } from "vue";
import Vue from 'vue';
import App from "./App.vue";
import router from "./router";
import { firebaseApp, auth } from './firebase.js';
import jQuery from 'jquery';
import "bootstrap/dist/css/bootstrap.css"; // Import bootstrap
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/app.scss';
import 'popper.js';
import Swal from "sweetalert2";

window.Swal = Swal;

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

window.Toast = Toast;
window.$ = window.jQuery = jQuery;

let app = '';

auth.onAuthStateChanged(function(user) {
  if (!app) {
    app = createApp(App);
    app.use(router, bootstrap, Swal);
    app.config.globalProperties.$isAuthenticated = !!user; // Set global variable
    app.mount("#app");
  }
});
