<template>
    <div>
        <button @click='isShow = !isShow'>显示 / 隐藏</button>
        <!-- <h1 class='go' v-show='isShow'>你好啊！</h1> -->

        <!-- 使用动画标签， transition  , 使用的样式需要修改vue中的命名方式-->
        <!-- 使用 appear 初始化时出现样式  -->
        <transition  appear>
            <h1 v-show='isShow'>你好啊！</h1>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'Test',
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

    /* .come {
        animation: test 1s linear;
    }

    .go {
        animation: test 1s reverse; 
    } */

    /* 进入时的动画  */
    .v-enter-active {
        animation: test 0.5s linear;
    }

    /* 结束时的动画 */
    .v-leave-active {
        animation: test 0.5s reverse; 
    }

    @keyframes test {
        from {
            transform: translateX(-100%)
        }
        to {
            transform: translateX(0px)
        }
    }

</style>