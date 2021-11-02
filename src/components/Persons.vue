<template>
    <div>
        <h2>人员列表</h2>
        <h3>Count组件中的sum为: {{sum}}</h3>
        <input type="text" placeholder="请输入人员信息" v-model='name'> 
        <button @click='add'>添加</button>
        <ul>
            <li v-for='p in personList' :key="p.id">{{p.name}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Persons',
        data(){
            return {
                name: ''
            }
        },
        computed: {
            personList() {
                return this.$store.state.personList
            }
        }
    }
</script>

<style>

</style>