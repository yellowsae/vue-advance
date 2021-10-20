<template>
    <div class='demo'>
        <h2>学生姓名： {{name}}</h2>
        <h2>学生的性别: {{sex}}</h2>
    </div>
</template>

<script>
    export default {
        name: 'Student',
        data() {
            return {
                name: "Yellowsea",
                sex: "男"
            }
        },
        methods: {
        }
    }
</script>


<style scoped>
    .demo {
        background-color:pink;
    }
</style>