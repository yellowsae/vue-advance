// 引入Vue 
import Vue from 'vue'

// 引入 App管理组件 
import App from './App.vue'

// 关闭提示
Vue.config.productionTip = false

// 创建 vm  
new Vue({
    el: '#app', // 挂载的容器 
    render: h => h(App), // 直接使用组件名 app ， 表示会创建 <App></App>
    // render: h => h('h2', '你好vue')
});

let a = 123;