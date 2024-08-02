import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/Home.vue';
import UserComponent from '../views/SignUp.vue';
import ChallengeDetails from '../components/ChallengeContent.vue';
import ChallengeList from "@/components/ChallengeList.vue";
import AdminView from '../views/Admin.vue'
import ChangePassword from "@/views/ChangePassword.vue";
import Verification from "@/components/VerificationFrom.vue";
import AdminChallengeDetail from "../views/AdminChallengeDetail.vue";
import MyPage from "@/views/MyPage.vue";
import AdminUsers from "@/views/AdminUsers.vue";
import VerificationList from "@/components/VerificationList.vue";

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
    path: '/myPage',
    name: 'myPage',
    component: MyPage
  },
  {
    path: '/changePassword',
    name: 'changePassword',
    component: ChangePassword
  },
  {
    path: '/challenges/:challengeId/verify',
    name: 'VerificationModal',
    component: Verification,
    props: true
  },
  {
    path: '/admin/challenges/:challengeId',
    name: 'adminChallengeDetail',
    component: AdminChallengeDetail,
    props: true
  },
  {
    path: '/admin/users',
    name: 'adminUsers',
    component: AdminUsers
  },
  {
    path: '/verificationList',
    component: VerificationList,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
