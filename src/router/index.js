import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Despesa from "@/views/Despesa/Despesa.vue";
import Fornecedor from "@/views/Fornecedor/Fornecedor.vue";

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/despesa', name: 'despesa', component: Despesa },
  { path: '/fornecedor', name: 'fornecedor', component: Fornecedor },
  // { path: '/conta', name: 'conta', component: Conta },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
