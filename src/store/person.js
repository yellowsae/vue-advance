// person组件相关的数据 
import axios from 'axios';
import { nanoid } from 'nanoid';
export default {
    namespaced: true,
    state: {
        personList: [{ id: '001', name: '张三' }]
    },
    actions: {
        // 处理逻辑 
        AddWang(context, value) {
            if (value.name.indexOf('王') === 0) {
                context.commit('Add_Person', value);
            } else {
                alert('要求姓王')
            }
        },

        // 使用 api 返回的数据 
        addMsg(context) {
            axios.get('https://autumnfish.cn/api/joke').then(
                response => {
                    context.commit('Add_Person', { id: nanoid(), name: response.data })
                    console.log(response.data)
                },
                error => {
                    console.log(error.message)
                })
        }
    },
    mutations: {
        Add_Person(state, value) {
            state.personList.unshift(value) // 添加数据 
        }
    },
    getters: {
        firstPersonName(state) {
            return state.personList[0].name
        }
    },
}