<template>
    <div class='deom'>
        <h2>学校名称： {{name}}</h2>
        <h2>学校地点: {{address}}</h2>
        <button @click="change">点我切换学校名</button>
    </div>
</template>

<script>
    // 逻辑
    export default {
        name: "School",  // 组件的名字， 一般和文件名相同
        data() { 
            return {
                name: "SchoolName",
                address: 'SchoolAddress'
            }
        },
        methods: {
            change() {
                this.name = '点我切换学校名'
            }
            }
    }
</script>

<style>
    .deom {
        background-color: orange;
    }
</style>