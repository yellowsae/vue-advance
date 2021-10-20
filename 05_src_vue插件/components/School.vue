<template>
    <div class='deom'>
        <!-- 使用过滤器 -->
        <h2>学校名称： {{name | MySlice}}</h2>
        <h2>学校地点: {{address}}</h2>
        <!-- 在pulg 中的方法 -->
        <button @click='showInfo'>点我查看信息</button>
    </div>
</template>

<script>
    export default {
        name: "School",  
        data() { 
            return {
                name: "SchoolName",
                address: 'SchoolAddress'
            }
        },
        methods: {
            showInfo() {
                // 在vm原型中的函数，
                this.$showMsg()
            }
        }
    }
</script>

<style>
    .deom {
        background-color: orange;
    }
</style>