<template>
    <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header"><h2>Vue Router Demo</h2></div>

        <button @click='forward'>前进</button>
        <button @click='back'>后退</button>
        <button @click='go'>测试以下go</button>
    </div>
</template>

<script>
    export default {
        name: 'Banner',
        methods: {
            forward() {
                // console.log(this.$router)
                this.$router.forward()  // 路由api 前进 
            },
            back() {
                this.$router.back()  // 路由 api 后退
            },
            go() {
                this.$router.go(1) // 接收参数的 
            }
        }
    }
</script>

<style>
    button {
        margin: 5px;
    }
</style>