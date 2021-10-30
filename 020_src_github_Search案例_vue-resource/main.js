import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 搜索案例， vue-resource 使用，可以发送请求
import VueResource from 'vue-resource'

// 使用插件 
Vue.use(VueResource) // 在所有的 vm 或者 vc 身上都多出了一个 $http 

new Vue({
    el: '#app',
    render: h => h(App),
    // 定义全局事件总线
    beforeCreate() {
        Vue.prototype.$bus = this
    }
});