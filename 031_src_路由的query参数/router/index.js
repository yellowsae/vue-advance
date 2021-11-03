// 该文件专门用于创建整个应用的 路由器
import VueRouter from 'vue-router';

//引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'

// 创建一个路由器， 并暴露出去 
export default new VueRouter({
    // 路由的对象
    routes: [{ // 匹配的路径   注意这里 ： routes 而不是 routers 
            path: '/about',
            component: About
        },
        {
            path: '/home',
            component: Home,

            //使用嵌套路由 在一级路由下， 使用 children 配置项
            // 注意 children 下的 path 不能使用  "/"  "/news" , 因为路由器已经默认加上了
            children: [{
                    path: 'news',
                    component: News
                },
                {
                    path: 'message',
                    component: Message,
                    children: [{
                        path: 'detail',
                        component: Detail
                    }]
                }
            ]
        }
    ]
})