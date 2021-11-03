<template>
    <ul>
        <!-- 接收的参数:  -->
        <!-- <li>消息编号： {{$route.params.id}}</li>
        <li>消息标题: {{$route.params.title}}</li> -->
        <li>消息编号： {{id}}</li>
        <li>消息标题: {{title}}</li>
        
        <li>{{id}}</li> 
        <li>{{title}}</li>
    </ul>
</template>

<script>
    export default {
        name:'Detail',
        // 接收路由参数 
        // 查看传递过来的参数
        
        // props: ['a', 'b'],  // 接收路由传递的参数  方法一 
        // props: ['id', "title"], // 方法二 
        props: ['id', "title"]  // 方法三
    }
</script>