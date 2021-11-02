<template>
    <div>
        <h2>人员列表</h2>
        <h3 style='color: red'>Count组件中的sum为: {{sum}}</h3>
        <input type="text" placeholder="请输入人员信息" v-model='name'> 
        <button @click='Add'>添加</button>
        <ul>
            <li v-for='p in personList' :key="p.id">{{p.name}}</li>
        </ul>
    </div>
</template>

<script>
    import {nanoid} from 'nanoid';
    import {mapState} from 'vuex';
    export default {
        name: 'Persons',
        data(){
            return {
                name: ''
            }
        },
        
        computed: {
            // 获取到 state 中 personList的数据 
            // personList() {
            //     return this.$store.state.personList
            // },

            //
            ...mapState({'personList':'personList'}),  // 也可以使用 map 定义 
            // sum() {
            //     return this.$store.state.sum
            // }
            ...mapState({'sum':'sum'})
        },
        methods: {
            Add() {
                const personObj = {
                    "id": nanoid(),
                    "name": this.name
                }
                this.name = '',
                // 使用 mapMutations 
                this.$store.commit('Add_Person',personObj)  // 提交数据给 mutations
            }
        }
    }
</script>