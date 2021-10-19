// 引入Vue 
import Vue from 'vue'

// 引入 App管理组件 
import App from './App.vue'

// 关闭提示
Vue.config.productionTip = false

// 创建 vm  
new Vue({
    el: '#app',
    render: h => h(App),
});