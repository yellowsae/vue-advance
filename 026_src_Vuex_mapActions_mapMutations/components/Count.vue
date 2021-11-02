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
        <button  @click='INCREMENT(n)'>+</button>
        <button @click='DECREMENT(n)'>-</button>
        <button @click='incrementOdd(n)'>当前求和为奇数再加</button>
        <button @click='incrementWite(n)'>等一等再加</button>
    </div>
</template>

<script>
    // 引入 mapStatr, 和 mapGetters 
    import {mapState, mapGetters,mapMutations,mapActions} from 'vuex';

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
            // increment() {
            //     // this.$store.commit('INCREMENT',this.n)  // 没有使用 map简写
            // },

            // 当$store 使用 commit时， 也可使用 Vuex提供的map 进行简写 
            // 因为commit是和 Mutations 进行对话的，使用 mapMutations() 能够简写 $store.commit() 

            // 使用 mapMutations() 传参必须要写在模板中， 不然在mutations中的INCREMENT收到的是 evtent ，而不是参数
            // ...mapMutations({'INCREMENT':'INCREMENT'}),  // 对象式 
            
            ...mapMutations(['INCREMENT']),  // 数组式 
            

            // decrement(){
            //     this.$store.commit('DECREMENT',this.n)
            // },

            // 同理 
            // ...mapMutations({'decrement':'DECREMENT'}),  // 对象式
             // key 要和模板中的事件一致， value 需要和 mutations 中的方法一致
            
            ...mapMutations(['DECREMENT']),  // 模板中使用的方法名要一致才能使用数组式简写


            // *************************************** **
            // dispatch 使用  mapActions() 
            // incrementOdd() {
            //     this.$store.dispatch('incrementOdd',this.n)
            // },


            // 使用 mapActions() 对使用 $store.dispatch() 方法进行简写 , 
            // 使用方法和上边一样, mapActions()直接跟actions进行对话

            // ...mapActions({'incrementOdd':'incrementOdd'}), // 对象式
            ...mapActions(['incrementOdd']),  // 数组式 


            // incrementWite() {
            //     this.$store.dispatch('incrementWite',this.n)
            // }

            // ...mapActions({'incrementWite':'incrementWite'}),
            ...mapActions(['incrementWite']),  // 数组式
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