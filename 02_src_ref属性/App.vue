<template>
    <div>
        <h2 v-text='msg' ref='title'></h2>
        <img src="./assets/logo.png" alt="logo">
        <school  ref='school'></school>
        <student ref='student'></student>
        <button @click='showInfo'>点我查看信息</button>
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
        data(){
            return {
                msg: 'Hello Vue'
            }
        },
        methods: {
            showInfo() {
                console.log(this);  // App组件的实例对象
                // 学习 组件中具有的 $refs 属性 
                console.log(this.$refs);   
                console.log(this.$refs.title);  // 真实DOM
                console.log(this.$refs.school);  // 组件的实例对象
            }
        }
    }
</script>
