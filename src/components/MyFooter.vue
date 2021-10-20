<template>
    <div class="todo-footer" v-show='total'>
    <label>
        <!-- 配置全选或者 全不选  -->
        <!-- <input type="checkbox" :checked="isAll"  @change="checkAll"/> -->
        
        <!-- 这里这里使用 v-model 实现， 绑定再 isAll上 -->
        <input type="checkbox" v-model="isAll" />

    </label>
    <span>
        <!-- 使用计算属性写，完成的个数  -->
        <span> 已完成{{doneTotal}} </span> / 全部 {{total}}
    </span>
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
    </div>
</template>

<script>
    export default {
        name: 'MyFooter',
        props: ['todos', 'checkAllTotal', 'clearAllTotal'],
        computed: {
            // todos 的长度， 也就是事件的总长度 
            total() {
                return this.todos.length
            },
            // 完成的个数 
            doneTotal() {
                // 返回的是 todo.done 为 true 的值 ， 如果为真返回 1,
                return this.todos.reduce((pre,todo) =>  pre + (todo.done ? 1 : 0) ,0)
            },
            // 全选的按钮
            isAll: {
                // 通过计算属性进行书写 
                get() {
                    return this.total === this.doneTotal && this.total > 0
                },
                set(value) {
                    this.checkAllTotal(value)
                }
            } 
            // isAll() {
            //     return this.total === this.doneTotal && this.total > 0
            // }
        },

        methods: {
            // checkAll(e) {
            //     // 传入参数 
            //     this.checkAllTotal(e.target.checked)
            // }


            // 清除已经完成的todo 
            clearAll() {
                // 调用就行
                this.clearAllTotal()
            }
        }
    }
</script>

<style scoped>
/*footer*/
    .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
    }
    .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
    }
    .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
    }
    .todo-footer button {
    float: right;
    margin-top: 5px;
    }
    button {
        background-color: red;
    }

</style>