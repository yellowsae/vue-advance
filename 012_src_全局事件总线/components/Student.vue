<template>
    <div class='demo'>
        <h2>学生姓名： {{name}}</h2>
        <h2>学生的性别: {{sex}}</h2>

        <button @click='sendStudentName'>把数据传输给 School 组件 </button>
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
            sendStudentName() {
                this.$bus.$emit('hello', this.name)
            }
        }


    }
</script>


<style scoped>
    .demo {
        background-color:pink;
        padding: 5px;
        margin: 5px;
    }
</style>