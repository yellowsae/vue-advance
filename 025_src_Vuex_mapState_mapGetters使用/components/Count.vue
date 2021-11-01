<template>
    <div>
        <!-- 在模板中读取 store的数据，不需要加上 this  -->

        <h1>当前的求和为: {{sum}}</h1>
        <h1>当前的求和放大10倍为: {{bigSum}}</h1>
        
        <!-- 当页面上展示出更多的 state 的数据 ，和 getter 数据时, 
        出现的问题  ：   $store.state.sum 不符合 简单的模板语法
        解决问题方法 ： 1. 通过计算属性 computed 简写函数 2. 通过Vuex中的mapState 和 mapGetter方法进行简写 
        -->
        <h2>学生姓名是 : {{name}}, 年龄是  {{age}}</h2>

        <select v-model.number="n" >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <button  @click='increment'>+</button>
        <button @click='decrement'>-</button>
        <button @click='incrementOdd'>当前求和为奇数再加</button>
        <button @click='incrementWite'>等一等再加</button>
    </div>
</template>

<script>
    // 引入 mapStatr, 和 mapGetters 
    import {mapState, mapGetters} from 'vuex';

    export default {
        name: 'Count',
        data(){
            return {
                n: 1,
            }
        },
        computed: {

            // 直接使用计算属性进行简写， 只能能在模板中简写的，但是计算属性中还是有点复杂
            // sum() {
            //     return this.$store.state.sum
            // },
            // name() {
            //     return this.$store.state.name
            // },
            // age() {
            //     return this.$store.state.age
            // },

            //  ***************************************
            // 使用 mapState 方法 （对象式） 
            // 使用  ...mapState() 是ES6中 对象中，写入多个对象使用 ... 映射 
            // ...mapState({'sum':'sum', 'name': 'name', 'age':'age',}),

            // 使用 mapState 方法 （数组式）
            // 数组式，必须式定义映射的变量名 必须要和 state中的变量名一致
            ...mapState(['sum', 'name', 'age']), 

            // **********************
            // 计算属性的写法 
            // bigSum() {
            //     return this.$store.getters.bigSum
            // }
            
            // 对象式 {} 
            // ...mapGetters({'bigSum':'bigSum'}),

            //数组式 
            ...mapGetters(['bigSum'])
        },
        methods: {
            increment() {
                // 使用 this.$store.despatch() 使用方法 increment，并把 this.n 传递给 actions 中的increment
                this.$store.commit('INCREMENT',this.n)
            },
            decrement(){
                this.$store.commit('DECREMENT',this.n)
            },
            incrementOdd() {
                this.$store.dispatch('incrementOdd',this.n)
            },
            incrementWite() {
                this.$store.dispatch('incrementWite',this.n)
            }
        },
        mounted() {
            // console.log(this.$store)
            //查看 mapState  和 mapGetters 
            const test  = mapState({'sum':'sum', 'name': 'name', 'age':'age',})
            // console.log(test) // 返回的是 sum name age 的函数 ，只需呀把这个方法写到计算属性中就行

        }
    }
</script>

<style scoped>
    button {
        margin-left: 5px;
    }
</style>