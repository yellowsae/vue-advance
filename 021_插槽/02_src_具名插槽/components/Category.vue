<template>
    <div class="category">
        <h3>{{title}}分类</h3>

        <!-- 定义一个插槽，等着组件使用者 写数据进行填充   slot -->

        <!-- 具名插槽 -->
        <slot  name="content"></slot>
        <slot name="footer"></slot>
    </div>
</template>

<script>
    export default {
        name: 'Category',
        props: ['title']
    }
</script>

<style>

    .category {
        background-color: skyblue;
        width: 200px;
        height: 300px;
    }
    
    h3 {
        background-color: orange;
        text-align: center;
    }
    img {
        width: 100%;
        height: 200px;
    }

    video {
        width: 100%;
    }
</style>
