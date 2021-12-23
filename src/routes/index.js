
import { createRouter, createWebHashHistory } from "vue-router"
import Form from '../pages/form.vue'

const routers = [
    {
        path: '/form',
        name: 'form',
        component: Form
    },
    // {
    //     redirect: '/user'
    // },
    {
        path: '/user',
        name: 'user',
        component: () => import('@/pages/userlist.vue')
    },
]

const router = new createRouter({
    history: createWebHashHistory(), 
    routes: routers
})

export default router