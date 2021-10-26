<template>
    <div class='demo'>
        <h2>学生姓名： {{name}}</h2>
        <h2>学生的性别: {{sex}}</h2>
        <button @click='getStudentName'>点击获取Student姓名</button>
        <button @click='unbind' >给Student组件解除绑定事件</button>
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
            getStudentName() {
                this.$emit('hidie',this.name)
                // this.$emit('demo')
            },
            unbind() {
                this.$off('hidie');  // 解绑一个自定义事件 
                // this.$off(['hidie','demo']);  // 解绑多个自定义事件
                // this.$off();  // 解绑所有自定义事件 
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