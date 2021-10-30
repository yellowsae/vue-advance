<template>
    <div class="category">
        <h3>{{title}}分类</h3>
        <!-- 数据在单个组件中，给组件的复用者，使用作用域插槽 -->
        <!--  传值方式 ： :games='games' -->
        <slot :games='games'></slot>
    </div>
</template>

<script>
    export default {
        name: 'Category',
        props: ['title'],
        data() {
            return {
                games: ['游戏1','游戏2 ','游戏3','游戏4'],
            }
        }
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
