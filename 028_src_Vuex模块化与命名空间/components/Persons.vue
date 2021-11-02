<template>
    <div>
        <h2>人员列表</h2>
        <h3 style='color: red'>Count组件中的sum为: {{sum}}</h3>
        <h3>{{firstPersonName}}</h3>
        <input type="text" placeholder="请输入人员信息" v-model='name'> 
        <button @click='Add'>添加</button>
        <button @click='AddWang'>添加一个姓王的人</button>
        <button @click='addMsg'>添加一条随机数据</button>
        <ul>
            <li v-for='p in personList' :key="p.id">{{p.name}}</li>
        </ul>
    </div>
</template>

<script>
    import {nanoid} from 'nanoid';
    export default {
        name: 'Persons',
        data(){
            return {
                name: '',
            }
        },
        computed: {
            // 由自己写的获取数据， 在使用模块化和命名空间时候 的获取数据 
            //使用方法 ：  this.$store.state.模块名.state中的数据
            personList() {
                return this.$store.state.personAbout.personList
            },
            sum() {
                return this.$store.state.countAbout.sum
            },

            firstPersonName() {
                // 自己写的计算属性获取 getters中的数据 比较特殊 是使用 [模块名/数据] 获取 
                return this.$store.getters['personAbout/firstPersonName']
            }
        },
        methods: {
            Add() {
                const personObj = {
                    "id": nanoid(),
                    "name": this.name
                }
                this.name = '',
                this.$store.commit('personAbout/Add_Person',personObj)  // 提交数据给 mutations
            },
            AddWang() {
                const personObj = {
                    "id": nanoid(),
                    "name": this.name
                }
                this.name = '',
                this.$store.dispatch('personAbout/AddWang',personObj)  
            },

            addMsg() {
                this.$store.dispatch('personAbout/addMsg')
            }
        },
    }
</script>