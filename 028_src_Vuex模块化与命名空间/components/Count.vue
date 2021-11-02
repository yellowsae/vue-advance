<template>
    <div>
        <h1>当前的求和为: {{sum}}</h1>
        <h1>当前的求和放大10倍为: {{bigSum}}</h1>
        <h2>学生姓名是 : {{name}}, 年龄是  {{age}}</h2>
        <ul style='color: red'>
            <li v-for='p in personList' :key="p.id">{{p.name}}</li>
        </ul>


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
    import {mapState, mapGetters,mapMutations,mapActions} from 'vuex';

    export default {
        name: 'Count',
        data(){
            return {
                n: 1,
            }
        },
        computed: {

            // 使用 模块化命名空间时， 用mpa时候，获取模板数据中的方法 
            //  ...mapState('模板名',['获取的数据']),  

            // 使用模板中的方法 
            //  ...mapMutations('模板名',{'方法名':'方法名'}), 

            ...mapState('countAbout',['sum', 'name', 'age',]),  
            ...mapState('personAbout',['personList']),
            ...mapGetters('countAbout',['bigSum'])
        },
        methods: {
            ...mapMutations('countAbout',{'INCREMENT':'INCREMENT'}), 
            ...mapMutations('countAbout',{"DECREMENT":'DECREMENT'}), 
            ...mapActions('countAbout',{'incrementOdd':"incrementOdd"}), 
            ...mapActions('countAbout',{'incrementWite':'incrementWite'}), 
        },
        mounted() {
            console.log(this)
        }
    }
</script>

<style scoped>
    button {
        margin-left: 5px;
    }
</style>