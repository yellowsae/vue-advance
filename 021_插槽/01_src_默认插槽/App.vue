<template> 
    <div class="container">
        <Category  title='美食' > 
            <!-- 提供数据给插槽  -->
            <!-- <ul>
                <li v-for='(food, index) in foods' :key="index">{{food}}</li>
            </ul> -->
            <img src="./assets/logo.png" alt="">
        </Category>
        <Category   title='游戏'>  
            <ul>
                <li v-for='(g, index) in games' :key="index">{{g}}</li>
            </ul>
        </Category>
        <Category   title='电影' >
            <!-- <ul>
                <li v-for='(video, index) in videos' :key="index">{{video}}</li>
            </ul> -->
            <video  controls src=""> </video>
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
    .container {
        display: flex;
        justify-content: space-between;
    }
</style>
