export default [
    {
        name: 'login',
        path: '/',
        component: () => import(/* webpackChunkName: "Login" */ './pages/Login.vue')
    }
]