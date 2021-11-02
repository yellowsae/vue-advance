<template>
    <div>
        <h1>当前的求和为: {{sum}}</h1>
        <h1>当前的求和放大10倍为: {{bigSum}}</h1>
        <h2>学生姓名是 : {{name}}, 年龄是  {{age}}</h2>
        <!-- <ul style='color: red'>
            <li v-for='p in personList' :key="p.id">{{p.name}}</li>
        </ul> -->


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
    import {mapState,mapGetters,mapMutations,mapActions} from 'vuex';

    export default {
        name: 'Count',
        data(){
            return {
                n: 1,
            }
        },
        computed: {
            ...mapState(['sum', 'name', 'age']),   // 读取personList 
            ...mapGetters(['bigSum'])
        },
        methods: {
            ...mapMutations(['INCREMENT']),  // 数组式 
            ...mapMutations(['DECREMENT']),  
            ...mapActions(['incrementOdd']),  // 数组式 
            ...mapActions(['incrementWite']),  // 数组式
        },
        mounted(){
            console.log(this)
        }
    }
</script>

<style scoped>
    button {
        margin-left: 5px;
    }
</style>