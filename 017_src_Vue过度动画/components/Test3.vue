<template>
    <div>
        <button @click='isShow = !isShow'>显示 / 隐藏</button>
        
        <!-- 使用第三方库 设置样式 -->
        <!-- enter-active-class: 进来时的样式  -->
        <!--  -->
        <transition  
            appear
            name='animate__animated animate__bounce'
            enter-active-class='animate__rubberBand'
            leave-active-class='animate__backOutDown'
        >
            <h1 v-show='isShow'>你好啊！</h1>
        </transition>
    </div>
</template>

<script>
// 引入第三方样式的库 
    import 'animate.css';
    // https://animate.style/
    export default {
        name: 'Test3',
        data () {
            return {
                isShow: true,
            }
        }
    }
</script>

<style scoped>

/* 使用第三方库 指定样式 */
    h1 {
        background-color: orange;
    }

</style>