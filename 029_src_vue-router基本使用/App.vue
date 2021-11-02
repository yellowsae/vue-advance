<template> 
    <div>
    <div>
        <div class="row">
        <div class="col-xs-offset-2 col-xs-8">
            <div class="page-header"><h2>Vue Router Demo</h2></div>
        </div>
        </div>
        <div class="row">
        <div class="col-xs-2 col-xs-offset-2">
            <div class="list-group">
                <!-- 原生的HTML导航区  -->
            <!-- <a class="list-group-item" href="./about.html">About</a> -->
            <!-- <a class="list-group-item active" href="./home.html">Home</a> -->


            <!-- 使用了路由的导航区  -->
            <!-- 
                    router-link  ：vue-router 中提供的标签 ， 用于处理路由的导航区
                    to="/about" : url路径后的样子 
                    active-class='active'   表示该元素被激活时候的样式 
                    原生样式保持不变 
            -->
            <!-- Vue借助 router-link 标签实现路由的切换  -->
            <router-link class="list-group-item" active-class="active" to="/about">About</router-link>
            <router-link class="list-group-item "  active-class="active" to="/home">Home</router-link>
            </div>
        </div>
        <div class="col-xs-6">
            <div class="panel">
            <div class="panel-body">
                <!--router-view  指定组件的呈现位置  -->
                <router-view></router-view>
            </div> 
            </div>
        </div>
        </div>
    </div>

    </div>  
</template>

<script>
    export default {
        name: 'App',
    }
</script>

