<template>
    <div>
        <h2>学生姓名： {{name}}</h2>
        <h2>学生年龄: {{age}}</h2>
    </div>
</template>

<script>
    // 定义组件逻辑 
    //  export default 暴露引入部分，这样才可以引入此组件
    export default {
        name: 'Student',
        data () {
            return {
                name: 'Yellowsea',
                age: 18
            }
        }
    }
</script>

<style>

</style>