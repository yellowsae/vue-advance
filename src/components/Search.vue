<template>
    <section class="jumbotron">
        <h3 class="jumbotron-heading">Search Github Users</h3>
        <div>
            <input type="text" placeholder="enter the name you search" v-model="keyWord" />&nbsp;
            <button @click='searchUser'>Search</button>
        </div>
    </section>
</template>

<script>
    import axios from "axios";
    export default {
        name: 'Search',
        data() {
            return {
                keyWord: ''
            }
        },
        methods: { 
            searchUser() {
                // 正在加载中 
                this.$bus.$emit('getUsers',{isFirst:false, isLoading: true, errorMsg: '', users: []})

                // 请求数据 , 请求参数使用了 ES6的 `` 语法 
                axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
                    response => {
                        // 请求成功时 
                        this.$bus.$emit('getUsers',{ isLoading: false, errorMsg: '', users:response.data.items})
                    },
                    error => {
                        // 请求失败时 
                        this.$bus.$emit('getUsers',{isLoading: false, errorMsg: error.message, users: []})
                    }
                )
            }
        }
    }
</script>
