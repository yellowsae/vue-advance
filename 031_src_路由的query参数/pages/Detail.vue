<template>
    <ul>
        <li>消息编号： {{$route.query.id}}</li>
        <li>消息标题: {{$route.query.title}}</li>
    </ul>
</template>

<script>
    export default {
        name:'Detail',
        // 接收路由参数 
        // 查看传递过来的参数 
        mounted() {
            console.log(this.$route)
        }
    }
</script>

<style>

</style>