<template>
    <div class='app'>
        <h2>{{msg}}</h2>
        <School  />
        <Student />
    </div>
</template>

<script>
    import School from './components/School.vue'
    import Student from './components/Student.vue'
    
    export default {
        components: {
            School,
            Student
        },
        data() {
            return {
                msg: "你好啊 !!"
            }
        },
    }
</script>

<style scoped>
    .app {
        background-color: #ccc;
    }
</style>