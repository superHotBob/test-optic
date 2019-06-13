import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const main = () => import('~/pages/index').then(m => m.default || m)
const index = () => import('~/pages/section/index').then(m => m.default || m)
const section = () => import('~/pages/section/_section').then(m => m.default || m)
const element = () => import('~/pages/section/_element').then(m => m.default || m)
const order = () => import('~/pages/order/index').then(m => m.default || m)
const basket = () => import('~/pages/basket/index').then(m => m.default || m)
const favorites = () => import('~/pages/favorites/index').then(m => m.default || m)
const compare = () => import('~/pages/compare/index').then(m => m.default || m)
const brands = () => import('~/pages/brands/index').then(m => m.default || m)
const e_brands = () => import('~/pages/brands/_element').then(m => m.default || m)
const search = () => import('~/pages/search/index').then(m => m.default || m)
const news = () => import('~/pages/news/index').then(m => m.default || m)
const newsItem = () => import('~/pages/news/item/index').then(m => m.default || m)
const advantages = () => import('~/pages/company/advantages/index').then(m => m.default || m)
const about = () => import('~/pages/company/about/index').then(m => m.default || m)
const reviews = () => import('~/pages/company/reviews/index').then(m => m.default || m)
const exchange = () => import('~/pages/company/exchange/index').then(m => m.default || m)
const delivery = () => import('~/pages/company/delivery/index').then(m => m.default || m)
const payment = () => import('~/pages/company/payment/index').then(m => m.default || m)
const support = () => import('~/pages/company/support/index').then(m => m.default || m)
const howOrder = () => import('~/pages/company/howOrder/index').then(m => m.default || m)
const discounts = () => import('~/pages/company/discounts/index').then(m => m.default || m)
const glasses_manufacturer = () => import('~/pages/company/glasses_manufacturer/index').then(m => m.default || m)
const confidentiality = () => import('~/pages/company/confidentiality/index').then(m => m.default || m)
const original = () => import('~/pages/company/original/index').then(m => m.default || m)
const bestprice = () => import('~/pages/company/bestprice/index').then(m => m.default || m)

const personal = () => import('~/pages/personal/index').then(m => m.default || m)
const userOrder = () => import('~/pages/personal/user-order').then(m => m.default || m)
const orders = () => import('~/pages/personal/orders').then(m => m.default || m)
const userProfile = () => import('~/pages/personal/user-profile').then(m => m.default || m)
const profiles = () => import('~/pages/personal/profiles').then(m => m.default || m)
const profile = () => import('~/pages/personal/profile').then(m => m.default || m)
const subscribe = () => import('~/pages/personal/subscribe').then(m => m.default || m)


export function createRouter () {
    return new Router({
        mode: 'history',
        scrollBehavior (to, from, savedPosition) {
            return { x: 0, y: 0 }
        },
        routes: [
            {
                path: '',
                name: 'main',
                component: main,
            },
            {
                path: '/personal',
                name: 'personal',
                component: personal,
            },
            {
                path: '/search/:pagen(\\d+)?',
                name: 'search',
                component: search,
            },
            {
                path: '/compare',
                name: 'compare',
                component: compare,
            },
            {
                path: '/personal/user-profile',
                name: 'userProfile',
                component: userProfile,
            },
            {
                path: '/personal/profiles',
                name: 'profiles',
                component: profiles,
            },
            {
                path: '/personal/profiles/profile',
                name: 'profile',
                component: profile,
            },
            {
                path: '/personal/subscribe',
                name: 'subscribe',
                component: subscribe,
            },
            {
                path: '/favorites',
                name: 'favorites',
                component: favorites,
            },
            {
                path: '/brands/:pagen(\\d+)?',
                name: 'brands',
                component: brands,
            },
            {
                path: '/brands/:element',
                name: 'e_brands',
                component: e_brands,
            },
            {
                path: '/news/:pagen(\\d+)?',
                name: 'news',
                component: news,
            },
            {
                path: '/news/:element',
                name: 'newsItem',
                component: newsItem,
            },
            {
                path: '/company/our-advantages',
                name: 'advantages',
                component: advantages,
            },
            {
                path: '/company/about',
                name: 'about',
                component: about,
            },
            {
                path: '/company/reviews',
                name: 'reviews',
                component: reviews,
            },
            {
                path: '/company/exchange',
                name: 'exchange',
                component: exchange,
            },
            {
                path: '/company/delivery',
                name: 'delivery',
                component: delivery,
            },
            {
                path: '/company/payment',
                name: 'payment',
                component: payment,
            },
            {
                path: '/company/support',
                name: 'support',
                component: support,
            },
            {
                path: '/company/howOrder',
                name: 'howOrder',
                component: howOrder,
            },
            {
                path: '/company/discounts',
                name: 'discounts',
                component: discounts,
            },
            {
                path: '/company/glasses_manufacturer',
                name: 'glasses_manufacturer',
                component: glasses_manufacturer,
            },
            {
                path: '/company/confidentiality',
                name: 'confidentiality',
                component: confidentiality,
            },
            {
                path: '/company/original',
                name: 'original',
                component: original,
            },
            {
                path: '/company/bestprice',
                name: 'bestprice',
                component: bestprice,
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
                path: '/personal/orders',
                name: 'orders',
                component: orders,
            },
            {
                path: '/personal/orders/:id(\\d+)',
                name: 'userOrder',
                component: userOrder,
            },
            {   
                path: '/:section',
                component: index,
                children: [
                    {
                        path: ':tag(t-.*)?/:pagen(\\d+)?',
                        name: 'section',
                        component: section,   
                    },
                    {
                        path: ':element',
                        name: 'element',
                        component: element,
                    },
                    {
                        path: ':element/specifications',
                        name: 'e_specifications',
                        component: element,
                        meta: {
                            title: ' - Характеристики'
                        }
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