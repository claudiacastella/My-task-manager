import { createRouter, createWebHistory } from "vue-router";
import Auth from '../pages/Auth.vue';
import Home from '../App.vue';
import Dashboard from '../pages/Dashboard.vue'

const routes = [
  {
    path:'/auth',
    name:'Auth',
    component: Auth,
  },
  {
    path:'/',
    name:'Home',
    component: Home,
  },
  {
    path:'/dashboard',
    name:'Dashboard',
    component: Dashboard,
  }

];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ENV),
  routes,
});

export default router;