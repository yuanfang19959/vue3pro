
import { createRouter, createWebHashHistory } from "vue-router"
import Form from '../pages/form.vue'

const routers = [
    {
        path: '/form',
        name: 'form',
        meta: {
            title:'定期抄见'
        },
        component: Form
    },
    {
        redirect: '/form'
    },
    {
        path: '/user',
        name: 'user',
        meta: {
            title:'户号'
        },
        component: () => import('@/pages/userlist.vue')
    },
]

const router = new createRouter({
    history: createWebHashHistory(), 
    routes: routers
})

export default router