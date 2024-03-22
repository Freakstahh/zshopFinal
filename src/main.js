import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";


import "bootstrap/dist/css/bootstrap.css"; // Import bootstra
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import 'bootstrap-vue/dist/bootstrap-vue.css'



createApp(App).use(router,bootstrap).mount("#app");
