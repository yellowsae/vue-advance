<template>
    <div class='deom'>
        <h2 @click='showInfo'>学校名称： {{name}}</h2>
        <h2>学校地点: {{address}}</h2>
    </div>
</template>

<script>
    // import {hunhe, hunhe2} from '../mixin.js';

    // 逻辑
    export default {
        name: "School",  // 组件的名字， 一般和文件名相同
        data() { 
            return {
                name: "SchoolName",
                address: 'SchoolAddress'
            }
        },

        // 引入混合模块 , 局部混合 
        // mixins: [hunhe, hunhe2]
    }
</script>

<style>
    .deom {
        background-color: orange;
    }
</style>