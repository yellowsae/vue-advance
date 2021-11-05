<template>
    <h2>我是About的内容</h2>    
</template>

<script>
export default {
    name: "About",
    // beforeDestroy() {
    //     console.log('About组件即将被销毁',this)
    // },
    // mounted() {
    //     console.log('About组件即将被挂载')
    // }

    // 组件内路由守卫 
    // 在进入组件时候调用 
    beforeRouteEnter (to, from, next) {
        if (to.meta.isAuth) { //使用路由元信息
            if (localStorage.getItem('user') === 'yellowsae') {
                next()
            } else {
                alert('请登录')
            }
        } else {
            next()
        }
    },

    // 在离开当前组件时候调用 
    beforeRouteLeave (to, from, next) {
        console.log('About组件路由要离开了')
        next()
    }
}
</script>