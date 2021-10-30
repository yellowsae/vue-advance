<template> 
    <div class="container">


        <Category  title='美食' > 
            <!-- 使用 具名插槽  -->
            <img slot='content' src="./assets/logo.png" alt="">
            <a  slot='footer' href="#">更多美食</a>
        </Category>


        <Category  title='游戏'>  
            <ul slot="content">
                <li v-for='(g, index) in games' :key="index">{{g}}</li>
            </ul>
            <!-- 使用具名插槽  slot='footer'-->
            <div  class='foot' slot='footer'> 
                <a  href="#">单击游戏</a>
                <a href="#">网络游戏</a>
            </div>
        </Category>


        <Category   title='电影' >
            <video  slot='content' controls src=""> </video>

            <!-- 当使用具名插槽时用 template 标签包裹起来的内容，可以使用 v-slot 指令 -->
            <template v-slot:footer>
                <!-- 使用具名插槽 -->
                <div  class='foot' >
                    <a  href="#">经典</a>
                    <a href="#">热门</a>
                    <a href="#">推荐</a>
                </div>
                <h4>欢迎到电影院观看</h4>
            </template>
        </Category>
    </div>  
</template>

<script>
    import Category from './components/Category'
    export default {
        name: 'App',
        components: {Category},
        data() {
            return {
                foods: ['美食1','美食2','美食3','美食4'],
                games: ['游戏1','游戏2 ','游戏3','游戏4'],
                videos: ['视频1','视频2 ','视频3','视频4']
            }
        }
    }
</script>

<style scoped>
    .container,
    .foot {
        display: flex;
        justify-content: space-around;
    }
    h4 {
        text-align: center;
    }
</style>
