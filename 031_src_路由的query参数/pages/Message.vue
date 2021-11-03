<template>
    <div>
        <ul>
            <li v-for="m in messageList" :key="m.id" >
                <!-- 路由传参的第一种写法:  :to=" `ES6模板语法` " -->
                <!-- <router-link :to="`/home/message/detail?id=${m.id}&title=${m.title}`">{{m.title}}</router-link>&nbsp;&nbsp; -->
                
                <!-- 路由传参的第二种写法：对象式写法， 使用 :to= "{}" 使用两个参数  path 和 query -->
                <router-link :to="{
                    path: '/home/message/detail',
                    query: {
                        id: m.id,
                        title: m.title
                    }
                }">
                {{m.title}}
                </router-link> 
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
        }
    }
</script>
