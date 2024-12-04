import { createRouter, createWebHistory } from 'vue-router'; 
import Home from '@/views/Home.vue';

const routes = [
    { path: '/', name: "home", component: Home },
    { path: '/autor', name: "autor", component: () => import('@/views/AboutView.vue') },
    { path: '/sedes', name: "sedes", component: () => import('@/views/sede/SedesView.vue') },
    { path: '/sedes/add', name: "sedeCreate", component: () => import('@/views/sede/SedeCreateVue.vue') },
    { path: '/sedes/edit/:id', name: "sedeEdit", component: () => import('@/views/sede/SedeEditView.vue') },
    { path: '/sedes/:id', name: "sedeAcomodacion", component: () => import('@/views/acomodacion/AcomodacionesView.vue') },
    { path: '/acomodacion/add/:id', name: "acomodacionCreate", component: () => import('@/views/acomodacion/AcomodacionesCreate.vue') },
    { path: '/acomodacion/edit/:id', name: "acomodacionEdit", component: () => import('@/views/acomodacion/AcomodacionesEdit.vue') },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;