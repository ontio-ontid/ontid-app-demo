import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import InvokeSc from '@/components/InvokeSc'
import NotFound from '@/components/404'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HelloWorld
        },
        {
            path: '/invokesc',
            name: 'InvokeSc',
            component: InvokeSc
        },
        {
            path: '*',
            component: NotFound
        }
    ]
})
