import { createRouter, createWebHistory } from 'vue-router'
import SurveyView from '../views/SurveyView.vue'
import WelcomeView from '../views/WelcomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: WelcomeView
  },
  {
    path: '/survey',
    name: 'Survey',
    component: SurveyView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
