<template>
    <div class='deom'>
        <h2>学校名称： {{name}}</h2>
        <h2>学校地点: {{address}}</h2>
        <h2>{{msg}}</h2>
    </div>
</template>

<script>

    // 使用 pubsub 
    import pubsub from 'pubsub-js';
    export default {
        name: "School",  
        data() { 
            return {
                name: "SchoolName",
                address: 'SchoolAddress',
                msg: ''
            }
        },
        methods: {
            // 记得写接收的参数 
            showInfo(pubName,data) {
                console.log('我是 School 组件我收到了 Student 传过来的数据 ',pubName,data )
                this.msg  = data
            },
        },
        mounted() {
            // 使用 vue 的全局事件总线 
            // this.$bus.$on('hello', this.showInfo)

            // 使用 pubsub , this.showInfo 回调函数 
            this.pid = pubsub.subscribe('hello', (pubName,data) => {
                console.log('我是 School 组件我收到了 Student 传过来的数据 ',pubName,data )
                this.msg  = data
            })

        },
        beforeDestroy() {
            //  调用后，在准备销毁前 
            // this.$bus.$off('hello')
            // 取消 消息订阅 
            pubsub.unsubscribe(this.pid)
        }

    }
</script>

<style scoped>
    .deom {
        background-color: orange;
        padding: 5px;
        margin: 5px;
    }
</style>