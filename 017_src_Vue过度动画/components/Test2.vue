<template>
    <div>
        <button @click='isShow = !isShow'>显示 / 隐藏</button>

        <transition  appear>
            <h1 v-show='isShow'>你好啊！</h1>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'Test2',
        data () {
            return {
                isShow: true,
            }
        }
    }
</script>

<style scoped>
    h1 {
        background-color: orange;
    }
    /* 通过过度方式实现动画 */
    /* 进入的起点， 离开的终点 */
    .v-enter,
    .v-leave-to {
        transform: translateX(-100%);
    }

    .v-enter-active, 
    .v-leave-active  {
        /* 动画时间 */
        transition: 0.5 linear;
    }

    .v-enter-to, 
    .v-leave  {
        transform: translateX(0);
    }

</style>