import { createRouter, createWebHistory } from 'vue-router'
import ProductView from '../views/Product/ProductView.vue'
import ProductCreate from "../views/Product/ProductCreate.vue";
import ProductEdit from "../views/Product/ProductEdit.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    },
    {
      path: '/products',
      name: 'Products',
      component: ProductView
    },
    {
      path: '/products/create',
      name: 'ProductCreate',
      component: ProductCreate
    },
    {
      path: '/products/:id',
      name: 'ProductEdit',
      component: ProductEdit
    },

  ]
})

export default router
