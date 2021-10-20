<template>
    <div>
        <h2>学生姓名： {{name}}</h2>
        <h2>学生的性别: {{sex}}</h2>

        <!-- 使用 plug 中的数据  -->
        <input type="text" v-fbind:value="name">
        <button @click='showInfo'>查看原型上的信息</button>
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
            showInfo() {
                // 找到plug 定义的数据 
                alert(this.$myProperty)
            }
        }
    }
</script>
