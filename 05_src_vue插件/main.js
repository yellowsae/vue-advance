import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


// 引入插件 
import plug from './plug'

Vue.use(plug);


new Vue({
    el: '#app',
    render: h => h(App),
});