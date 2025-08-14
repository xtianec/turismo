import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const Home        = () => import('@/pages/Home.vue')
const GuidesList  = () => import('@/pages/GuidesList.vue')
const GuideProfile= () => import('@/pages/GuideProfile.vue')
const Login       = () => import('@/pages/Login.vue')
const Register    = () => import('@/pages/Register.vue')
const Chat        = () => import('@/pages/Chat.vue')

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: Home },
  { path: '/guides', name: 'GuidesList', component: GuidesList },
  { path: '/guide/:id', name: 'GuideProfile', component: GuideProfile, props: true },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/chat/:id', name: 'Chat', component: Chat, props: true }
]

export default createRouter({ history: createWebHistory(), routes })
