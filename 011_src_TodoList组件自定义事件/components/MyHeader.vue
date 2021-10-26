<template>
    <div class="todo-header">
        <input 
            type="text" 
            placeholder="请输入你的任务名称，按回车键确认" 
            v-model='title' 
            @keyup.enter="add"/>
    </div>
</template>

<script>
    import {nanoid} from 'nanoid'  // nanoid 随机生成一个ID 
    export default {
        name: 'MyHeader',
        data() {
            return {
                // 用 v-model 双向绑定的数据 
                title: ''
            }
        },
        // 接收App传入进来的方法 
        // props: ['receive'],

        methods: {
            add() {
                // 判断title是否为空,  trim去除两边空格
                if(!this.title.trim()) return alert('请输入数据')
                // 将输入的数据组装成一个对象
                const infoObj = {
                    id: nanoid(),   // nanoid的用法 
                    title: this.title,
                    done: false   // 添加事件默认为 false 
                }
                // 调用receive函数，给App组件返回值，让App组件添加一个对象 
                // this.receive(infoObj)
                // 使用自定义事件
                this.$emit('receive', infoObj)
                this.title =''  // 清空输入
            }
        }
    }
</script>

<style scoped>
/*header*/
.todo-header input {
    width: 560px;
    height: 28px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 7px;
    }
    .todo-header input:focus {
    outline: none;
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
    }
</style>