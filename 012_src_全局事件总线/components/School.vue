<template>
    <div class='deom'>
        <h2>学校名称： {{name}}</h2>
        <h2>学校地点: {{address}}</h2>
        <h2>{{msg}}</h2>
    </div>
</template>

<script>
    export default {
        name: "School",  
        data() { 
            return {
                name: "SchoolName",
                address: 'SchoolAddress',
                msg: ''
            }
        },
        methods: {
            // 记得写接收的参数 
            showInfo(data) {
                console.log('我是 School 组件我收到了 Student 传过来的数据 ')
                this.msg  = data
            },
        },
        mounted() {
            this.$bus.$on('hello', this.showInfo)
        },
        beforeDestroy() {
            //  调用后，在准备销毁前 
            this.$bus.$off('hello')
        }

    }
</script>

<style scoped>
    .deom {
        background-color: orange;
        padding: 5px;
        margin: 5px;
    }
</style>