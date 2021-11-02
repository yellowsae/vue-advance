import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 引入 Store 
import store from './store/index'

//创建VM 
new Vue({
    el: '#app',
    render: h => h(App),
    // 定义全局事件总线
    beforeCreate() {
        Vue.prototype.$bus = this
    },

    // 使用 Vue中的Store 
    store, // 引入 store 
});