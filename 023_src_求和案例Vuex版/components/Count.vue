<template>
    <div>
        <!-- 在模板中读取 store的数据，不需要加上 this  -->
        <h1>当前的求和为: {{$store.state.sum}}</h1>

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
    export default {
        name: 'Count',
        data(){
            return {
                n: 1,
            }
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
            console.log(this.$store)
        }
    }
</script>

<style scoped>
    button {
        margin-left: 5px;
    }
</style>