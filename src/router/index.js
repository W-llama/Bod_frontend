import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
import UserComponent from '../views/SignUp.vue';
import LoginComponent from '../components/Login.vue';
import ChallengeDetails from '../components/ChallengeContent.vue';


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
  { path: '/challenges/:challengeId',
    component: ChallengeDetails,
    props: route => ({
      id: Number(route.params.id)
    })
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
