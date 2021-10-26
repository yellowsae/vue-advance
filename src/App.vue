<template>
    <div class='app'>
        <h2>{{msg}}</h2>

        <!-- 组件自定义绑定事件  -->

        <!-- 通过父组件给子组件传递函数类型的props实现， 子给父传递数据 -->
        <School :getSchoolName='getSchoolName' />

        <!-- 通过父组件给子组件邦迪一个自定义事件实现 ： 子给父传输数据  (第一宗) -->
        <!-- <Student @hidie='getStudentName'/> -->

        <!-- 通过父组件给子组件邦迪一个自定义事件实现 使用 ref 实现 ：子给父传输数据  (第一种) -->
        <Student ref='studen'/>
    </div>
</template>

<script>
    import School from './components/School.vue'
    import Student from './components/Student.vue'
    
    export default {
        components: {
            School,
            Student
        },
        data() {
            return {
                msg: "你好啊 !!"
            }
        },
        methods: {
            getSchoolName(name) {
                console.log("App调用School组件，获取到School的name ",name)
            },
            getStudentName(name) {
                console.log("App调用Student组件，获取到Studentl的name ",name)
            }
        },

        // 生命周期钩子
        mounted() {
            // 通过  refs 获取到 vc 身上的 student 使用 $on 调用 自定义事件
            this.$refs.studen.$on('hidie',this.getStudentName)
        }
    }
</script>

<style scoped>
    .app {
        background-color: #ccc;
    }
</style>