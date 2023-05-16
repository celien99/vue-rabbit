// createRouter: 创建router实例对象
// createWebHistory: 创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component对应关系的位置
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        {
          path: '',
          name: 'name',
          component: () => import ('@/views/Home/index.vue')
        },
        {
          path: 'category/:id',
          component: () => import('@/views/Category/index.vue')
        },
        {
          path: 'category/sub/:id',
          component: () => import('@/views/SubCategory/index.vue')
        },
        {
          path: 'detail/:id',
          component: () => import('@/views/Detail/index.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/index.vue')
    }
  ],
  // 路由滚动行为定制
  scrollBehavior (){
    return {
      top: 0
    }
  }
})

export default router
