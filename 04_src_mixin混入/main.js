// 引入Vue 
import Vue from 'vue'

// 引入 App管理组件 
import App from './App.vue'

// 引入混合组件
import { hunhe, hunhe2 } from './mixin.js';

// 全局使用混合 
Vue.mixin(hunhe)
Vue.mixin(hunhe2)

// 关闭提示
Vue.config.productionTip = false

// 创建 vm  
new Vue({
    el: '#app',
    render: h => h(App),
});