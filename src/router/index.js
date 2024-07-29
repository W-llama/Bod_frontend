
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
import UserComponent from '../views/SignUp.vue';
import LoginComponent from '../views/Login.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'signup',
    component: UserComponent
  },
  {
    path: '/login',
    name: 'login',
    component: LoginComponent
  },
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
