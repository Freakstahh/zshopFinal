import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import LandingPage from "../views/LandingPage.vue";
import Admin from "../views/Admin.vue";
import Products from "../views/Products.vue";
import {firebaseApp} from '../firebase.js';
import { auth } from '../firebase.js';


const routes = [
  {
    path: "/",
    name: "landingPage",
    component: LandingPage,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    meta: { requiresAuth: true },
    children: [
      {
        path: "products",
        name: "products",
        component: Products
      },
    ],
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = auth.currentUser

  if (requiresAuth && !currentUser) {
    next('/')
  } else {
    next()
  }
})



export default router;
