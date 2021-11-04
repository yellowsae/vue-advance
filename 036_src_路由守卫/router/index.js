// 该文件专门用于创建整个应用的 路由器
import VueRouter from 'vue-router';
//引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'

// 创建一个路由器， 并暴露出去 
const router = new VueRouter({
    // 路由的对象
    routes: [{ // 匹配的路径   注意这里 ： routes 而不是 routers 
            name: 'guanyu', // 命名路由 
            path: '/about',
            component: About,
            meta: {
                value: '关于',
                isAuth: true,
            }
        },
        {
            name: "zhuye",
            path: '/home',
            component: Home,
            meta: {
                value: '关于'
            },
            //使用嵌套路由 在一级路由下， 使用 children 配置项
            // 注意 children 下的 path 不能使用  "/"  "/news" , 因为路由器已经默认加上了
            children: [{
                    name: 'xinwen',
                    path: 'news',
                    component: News,
                    meta: {
                        isAuth: true,
                        value: '新闻'
                    },
                    beforeEnter(to, from, next) {
                        if (to.meta.isAuth) { //使用路由元信息
                            if (localStorage.getItem('user') === 'yellowsae') {
                                next()
                            } else {
                                alert('请登录')
                            }
                        } else {
                            next()
                        }
                    },
                },
                {
                    name: 'xinxi',
                    path: 'message',
                    component: Message,
                    meta: {
                        isAuth: true,
                        value: '信息'
                    },
                    children: [{
                        name: 'xiangqing', // 命名路由 
                        // path: 'detail/:id/:title', //使用占位符声明接收 params参数 ，如果使用query 接收参数不用这样的写法 
                        path: 'detail',
                        component: Detail,
                        meta: {
                            value: '关于'
                        },
                        // 使用路由的 props 参数
                        //第一种写法： props值为对象，该对象中所有的key-value的组合最终都会通过 props 传给 Detail组件 
                        // props: { a: '000', b: 'hello' }  // a 和 b 的数据都是写死的 

                        // 第二种写法: 布尔值写法， 若 props: true, 则把路由收到的所有 params 参数通过 props 传给 Detail组件 
                        // props: true, // 这个方法只能将 params 的参数传给 props ， 并不能接收到 query的参数 

                        // 第三种写法: 函数式，使用路由的回调函数收到的 $route, 使用 $route 根据返回数据定义 props 接收的数据，可以用在 params, 和 query 
                        props($route) {
                            return {
                                id: $route.query.id,
                                title: $route.query.title
                            }
                        }
                    }]
                }
            ]
        }
    ]
})

// router.beforeEach((to, from, next) => { // 收到的参数 
//     // if (to.path === '/home/news' || to.path === '/home/message') {  // 写to 去到的路径， 也可以写name 
//     if (to.meta.isAuth) { //使用路由元信息
//         if (localStorage.getItem('user') === 'yellowsae') {
//             next()
//         } else {
//             alert('请登录')
//         }
//     } else {
//         next()
//     }
// })

// 全局路由守卫， 后置 
router.afterEach((to, from) => { //  每次路由切换之后执行
    // 作用 , 可以在访问后执行一些DOM操作 , 比如修改标题 
    // console.log(to, from)
    if (to.meta.value) {
        document.title = to.meta.value // 修改网页标题
    } else {
        document.title = 'vue-test'
    }
})


export default router;