import { createRouter, createWebHistory } from 'vue-router'
// createRouter: 创建router实例对象
// createWebHistory: 创建history模式的路由

import test from "../views/test.vue";
import rate_calculator from "@/views/rate_calculator.vue";
import calculator from "@/views/calculator.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:"/test",
      component:test
    },
    {
      path:"/",
      component:calculator
    },
    {
      path:"/rate_calculator",
      component:rate_calculator
    }
  ]
})

export default router
