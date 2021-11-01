// 引入Vue核心库
import Vue from 'vue';

// 引入  Vuex 
import Vuex from 'vuex';

// 应用 Vuex 
Vue.use(Vuex)

// 准备好 actions 对象  --- 相应组件中用户的动作 
const actions = {

    // 一般actions 用来处理业务逻辑才写的，直接使用数据方法，不应该使用actions， 而是通过 commit 直接对话 mutations 

    // increment(context, value) { //在VC调用过来的方法， 能收到两个参数 一个是 context (上下文)， 和 收到的value 
    //     // console.log('收到的参数 ：', context, value)

    //     // 在actions，收到的 context 调用 commit 
    //     context.commit('INCREMENT', value)
    // },
    // decrement(context, value) {
    //     // 减法 
    //     context.commit('DECREMENT', value)
    // },


    incrementOdd(context, value) {
        if (context.state.sum % 2) {
            context.commit('INCREMENTODD', value)
        }
    },
    incrementWite(context, value) {
        setTimeout(() => {
            context.commit('INCREMENTWite', value)
        }, 500)
    }
}

// 准备好 mutations  对象， 修改 store 中的数据 
const mutations = {
    INCREMENT(state, value) { // 收到的是 state中的sum的数据对象具有getter/setter方法， 和actions传过来的 value 
        // console.log('mutations 收到的参数 ：', store, value);
        state.sum += value;
    },
    DECREMENT(state, value) {
        state.sum -= value
    },
    INCREMENTODD(state, value) {
        state.sum += value
    },
    INCREMENTWite(state, value) {
        state.sum += value
    }
}

// 准备好一个 state 对象 ， 用于保存具体的数据
const state = {
    sum: 0
}

// 创建Store ：Vuex.Store({})  并暴露 Store
export default new Vuex.Store({
    // 当 key 和 value 同名时，使用简写
    actions,
    mutations,
    state,
})