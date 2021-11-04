<template>
    <div>
        <ul>
            <li v-for="m in messageList" :key="m.id" >
                <!-- 路由传参的第一种写法:  :to=" `ES6模板语法` " -->
                <!-- <router-link :to="`/home/message/detail/${m.id}/${m.title}`">{{m.title}}</router-link>&nbsp;&nbsp; -->
                
                <!-- 路由传参的第二种写法：对象式写法， 使用 :to= "{}" 使用两个参数  path 和 query -->
                <router-link
                    replace 
                    :to="{
                        // path: '/home/message/detail',
                        name: 'xiangqing',  // 使用命名路由 简化路径
                        query: {
                            id: m.id,
                            title: m.title
                        }
                    }">
                {{m.title}}
                </router-link>
                <button @click='pushShow(m)'>push查看</button>
                <button @click='replaceShow(m)'>replace查看</button> 
            </li>
            <router-view></router-view>
        </ul> 
    </div>
</template>

<script>
    export default {
        name: 'Message',
        data () {
            return {
                messageList: [
                    {
                        id: '001',
                        title: '消息001'
                    },
                    {
                        id: '002',
                        title: '消息002'
                    },
                    {
                        id: '003',
                        title: '消息003'
                    },
                ]
            }
        },
        
        // 使用编程式路由导航 
        methods: {
            pushShow(m) {
                // console.log(this.$router)
                this.$router.push({   // 使用 路由的追加方式添加路由， $router.push({})
                    name: 'xiangqing',  
                    query: {
                        id: m.id,
                        title: m.title
                    }
                })
                
            },

            replaceShow(m) {
                this.$router.replace({   // // 使用 路由的 替换方式添加路由， $router.push({})
                    name: 'xiangqing',  
                    query: {
                        id: m.id,
                        title: m.title
                    }
                })
            },
        },
        beforeDestroy() {
            console.log('Message组件即将被销毁了')
        }
    }
</script>
