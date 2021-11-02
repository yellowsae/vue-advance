// 引入Vue核心库
import Vue from 'vue';

// 引入  Vuex 
import Vuex from 'vuex';

// 引入数据 
import countAbout from './count';
import personAbout from './person';

// 应用 Vuex 
Vue.use(Vuex)



export default new Vuex.Store({
    // 在Vuex.$store 中使用 模块
    modules: {
        countAbout,
        personAbout,
    }
})