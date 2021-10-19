<template>
<!-- 使用组件  -->
    <div>
        <img src="./assets/logo.png" alt="logo">
        <school></school>
        <student></student>
    </div>
</template>

<script>

    // App.vue 管理组件 
    // 引入单个组件 
    import School from './components/School.vue'
    import Student from './components/Student.vue'

    export default {
        // 注册组件
        components: {
            School,
            Student
        }
    }
</script>

<style>

</style>