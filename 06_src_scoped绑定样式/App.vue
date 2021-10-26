<template>
    <div>
        <School/>
        <Student/>
    </div>
</template>

<script>
    import School from '../06_src_scoped绑定样式/components/School.vue'
    import Student from '../06_src_scoped绑定样式/components/Student.vue'
    
    export default {
        components: {
            School,
            Student
        }
    }
</script>

<style scoped>
    
</style>