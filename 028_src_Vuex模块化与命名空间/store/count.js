// Count 组件相关的数据对象 
export default { // export default 
    namespaced: true,
    state: {
        sum: 0,
        name: 'Yellowsea',
        age: 20,
    },
    actions: {
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
    },
    mutations: {
        INCREMENT(state, value) {
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
        },
    },
    getters: {
        bigSum(state) {
            return state.sum * 10
        }
    },
}