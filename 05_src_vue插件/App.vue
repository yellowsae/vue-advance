<template>
    <div>
        <h2 v-text='msg' ref='title'></h2>
        <School/>
        <Student/>
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
    }
</script>
