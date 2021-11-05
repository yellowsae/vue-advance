<template>
    <div>
        <ul>
            <li :style={opacity}> 欢迎学习 </li>
            <li>news001 <input></li>
            <li>news002 <input></li>
            <li>news003 <input></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'News',
        data() {
            return {
                opacity: 1,
            }
        },
        // mounted() {
        //     this.timer =  setInterval(() => {
        //         console.log('@')
        //         this.opacity -= 0.01
        //         if (this.opacity <= 0 ) {
        //             this.opacity = 1 
        //         }
        //     }, 16)
        // },
        // beforeDestroy() {
        //     console.log('News组件即将被销毁了')
        //     clearInterval(this.timer);
        // },

        // 当组件被激活状态 
        activated() {
            // console.log('News组件被激活了')
            this.timer =  setInterval(() => {
                console.log('@')
                this.opacity -= 0.01
                if (this.opacity <= 0 ) {
                    this.opacity = 1 
                }
            }, 16)
        },  

        // 当前组件失活状态 
        deactivated() {
            // console.log('News组件失活了')
            clearInterval(this.timer);
        },
    }
</script>

<style>

</style>