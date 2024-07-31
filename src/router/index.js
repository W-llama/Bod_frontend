import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
import UserComponent from '../views/SignUp.vue';
import LoginComponent from '../components/Login.vue';
import ChallengeDetails from '../components/ChallengeContent.vue';
import ChallengeList from "@/components/ChallengeList.vue";
import AdminView from '../views/Admin.vue'
import Verification from "@/components/VerificationFrom.vue";


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
  },
  {
    path: '/challenges',
    name: 'ChallengeList',
    component: ChallengeList
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView
  },
  {
    path: '/challenges/:challengeId/verify',
    name: 'VerificationModal',
    component: Verification,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
