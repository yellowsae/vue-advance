<template>
    <div>
        <h2 v-text='msg' ref='title'></h2>

        <!-- 张三的学生的信息  -->
        <student ref='student' name='张三' sex='男' :age='18'></student>

        <!-- 李四学生的信息 -->
        <student ref='student' name='李四' sex='女' ></student>
    </div>
</template>

<script>
    // import School from './components/School.vue'
    import Student from './components/Student.vue'

    export default {
        components: {
            // School,
            Student
        },
        data(){
            return {
                msg: 'Hello Vue'
            }
        },
    }
</script>
