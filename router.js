import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const main = () => import('~/pages/index').then(m => m.default || m)
const index = () => import('~/pages/section/index').then(m => m.default || m)
const section = () => import('~/pages/section/_section').then(m => m.default || m)
const element = () => import('~/pages/section/_element').then(m => m.default || m)

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
                path: '/:section',
                component: index,
                children: [
                    {
                        path: ':pagen?',
                        name: 'section',
                        component: section,   
                    },
                    {
                        path: 'filter/:filter(.*)*/apply/:pagen?',
                        name: 'filter',
                        component: section,
                    },
                    {
                        path: ':element',
                        name: 'element',
                        component: element,
                    },
                ]
            }
        ]
    })
}