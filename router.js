import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const main = () => import('~/pages/index').then(m => m.default || m)
const index = () => import('~/pages/section/index').then(m => m.default || m)
const section = () => import('~/pages/section/_section').then(m => m.default || m)
const element = () => import('~/pages/section/_element').then(m => m.default || m)
const order = () => import('~/pages/order/index').then(m => m.default || m)
const basket = () => import('~/pages/basket/index').then(m => m.default || m)
const advantages = () => import('~/pages/advantages/index').then(m => m.default || m)

export function createRouter () {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '',
                name: 'main',
                component: main,
            },
            {
                path: '/our-advantages',
                name: 'advantages',
                component: advantages,
            },
            {
                path: '/order',
                name: 'order',
                component: order,
            },
            {
                path: '/basket',
                name: 'basket',
                component: basket,
            },
            {   
                path: '/:section',
                component: index,
                children: [
                    {
                        path: ':pagen(\\d+)?',
                        name: 'section',
                        component: section,   
                    },
                    {
                        path: ':element',
                        name: 'element',
                        component: element,
                    },
                    {
                        path: 'filter/:filter(.*)*/apply/:pagen?',
                        name: 'filter',
                        component: section,
                    },
                ]
            },   
        ]
    })
}