import Vue from 'vue'
import App from './App.vue'

// 使用ElementUI 
// 完整引入 
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// 使用 
// Vue.use(ElementUI)


// 按需引入 
import { Button, Row, DatePicker } from 'element-ui';

// 注册全局组件 , 不需要引入样式
// Vue.component(组件名, 需要注册的组件)  
Vue.component('Hidie-button', Button)
Vue.component('Hidie-row', Row)
Vue.component('Hidie-date-picker', DatePicker)


Vue.config.productionTip = false
new Vue({
    el: '#app',
    render: h => h(App),
});