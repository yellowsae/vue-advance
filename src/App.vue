<template> 
    <div>
        <button @click='getmsg'>获取信息</button>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'App',
        methods: {
            getmsg() {
                axios.get('https://autumnfish.cn/api/joke/list?num=6').then(
                    response => {
                        console.log('发送请求成功', response.data);
                    },
                    error => {'发送请求失败', error.message}
                )
            }
        }
    }
</script>
