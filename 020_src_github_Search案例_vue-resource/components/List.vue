<template>
    <div class="row">

        <!-- 初始化页面  -->
        <div class="card"
            v-show='info.users.length' 
            v-for='user in info.users' 
            :key="user.login"
        >
            <a :href="user.html_url" target="_blank">
            <img :src="user.avatar_url" style='width: 100px' id='avatar_url' />
            </a>
            <p class="card-text">{{user.login}}</p>
        </div>
        <!-- 欢迎词 -->
        <h2 v-show='info.isFirst'>欢迎使用</h2>

        <!-- 加载页面  -->
        <h2 v-show='info.isLoading'>加载中 。。。。。。。。</h2>

        <!-- 错误页面 -->
        <h2 v-show="info.errorMsg">{{info.errorMsg}}</h2>
    </div>
</template>

<script>
    export default {
        name: 'List',
        data() { 
            return {
                info: {
                    isFirst: true,
                    isLoading: false,
                    errorMsg: '',
                    users: [],
                }
            }
        },
        
        // 使用全局事件总线，接收兄弟间的数据  
        mounted() { 
            this.$bus.$on('getUsers',(infoObj) => {
                // {...this.info, ...infoObj} ， 合并对象，
                this.info = {...this.info, ...infoObj}
                console.log(this)
            })
        }
    }
</script>

<style scoped>

    .album {
    min-height: 50rem; /* Can be removed; just added for demo purposes */
    padding-top: 3rem;
    padding-bottom: 3rem;
    background-color: #f7f7f7;
    }

    .card {
    float: left;
    width: 33.333%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
    }

    .card > img {
    margin-bottom: .75rem;
    border-radius: 100px;
    }

    .card-text {
    font-size: 85%;
    }

    #avatar_url {
        border-radius: 50%;
    }


</style>