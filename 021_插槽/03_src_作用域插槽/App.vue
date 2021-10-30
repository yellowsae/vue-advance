<template> 
    <div class="container">
        
        <!-- 作用域插槽，当数据没有在使用组件者里 时，可以使用作用域插槽进行
            数据的传输，改变使用相同组件，不同的样式  -->


        <Category  title='游戏'> 
            <!-- 接收数据，必须要使用template标签和 slot-scope属性接收 -->
            <template slot-scope='info'>
                <ul>
                    <li v-for='(g, index) in info.games' :key="index">{{g}}</li>
                </ul>
                <!-- {{info}}  接收到的 info 是一个数据对象 
                    { "games": [ "游戏1", "游戏2 ", "游戏3", "游戏4" ] }
                -->
            </template>
        </Category>

        <Category  title='游戏'> 
            <!-- 接收数据，必须要使用template标签和 slot-scope属性接收 -->
            <template slot-scope='info'>
                <ol>
                    <li v-for='(g, index) in info.games' :key="index">{{g}}</li>
                </ol>
                <!-- {{info}}  接收到的 info 是一个数据对象 
                    { "games": [ "游戏1", "游戏2 ", "游戏3", "游戏4" ] }
                -->
            </template>
        </Category>


    </div>  
</template>

<script>
    import Category from './components/Category'
    export default {
        name: 'App',
        components: {Category},
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
