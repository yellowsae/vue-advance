// 该文件专门用于创建整个应用的 路由器
import VueRouter from 'vue-router';

//引入组件
import About from '../components/About'
import Home from '../components/Home'


// 创建一个路由器， 并暴露出去 
export default new VueRouter({
    // 路由的对象
    routes: [{ // 匹配的路径   注意这里 ： routes 而不是 routers 
            path: '/about',
            component: About
        },
        {
            path: '/home',
            component: Home
        }
    ]
})