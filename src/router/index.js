import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [{
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/login')
    }, {
        path: '/',
        // name: 'layout',
        component: () =>
            import ('../views/layout'),
        children: [{
            path: '',
            name: 'home',
            component: () =>
                import ('../views/home')
        }, {
            path: '/my',
            name: 'my',
            component: () =>
                import ('../views/my')
        }, {
            path: '/video',
            name: 'video',
            component: () =>
                import ('../views/video')
        }, {
            path: '/qa',
            name: 'qa',
            component: () =>
                import ('../views/qa')
        }, ]

    }, {
        path: '/profile',
        name: 'profile',
        component: () =>
            import ('../views/profile')
    }, {
        path: '/search',
        name: 'search',
        component: () =>
            import ('../views/search')
    },
    {
        path: '/article/:articleId',
        name: 'article',
        component: () =>
            import ('../views/article'),
        props: true
    }
]
const router = new VueRouter({
    routes
})

export default router