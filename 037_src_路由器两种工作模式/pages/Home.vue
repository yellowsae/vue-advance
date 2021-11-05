<template>
    <div>
        <h2>Home组件内容</h2>
        <div>
            <ul class="nav nav-tabs">
                <li>
                    <!-- 嵌套路由注意路径： to="/home/news" ，  必须要是 /父路径/子路径 -->
                    <router-link class="list-group-item " active-class='active' to="/home/news">News </router-link>
                </li>
                <li>
                    <router-link class="list-group-item "  active-class='active' to="/home/message">Message</router-link>
                </li>
            </ul>

            <!-- 使用 keep-alive 标签让组件保持活跃状态 -->
            <keep-alive include='News'>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template> 

<script>
    export default {
        name: 'Home',
    }
</script>
