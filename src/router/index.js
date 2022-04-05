import {createRouter, createWebHistory} from 'vue-router'
import About from '../views/about'
import Birds from '../views/birds'
import Identification from '../views/identification';

const routes = [
    {
        path:'/about',
        name:'About',
        component:About,
    },
    {
        path:'/',
        name:'Home',
        component:Birds
    },
    {
        path:'/identification',
        name:'Identification',
        component:Identification
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),routes,
})

export default router