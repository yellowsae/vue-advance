<template>
<div id="root">
    <div class="todo-container">
        <div class="todo-wrap">
            <!-- 并且使用 :receive 的形式， 不然props接收到的不是表达式， 而是字符串   -->
            <!-- :receive='receive'函数，  提共一个通道，让Heander返回的数据通过这个函数App能够接收到  -->

            <!--  @receive='receive' 组件自定义事件 -->
            <MyHeader  
                @receive='receive'
            />   
            <!-- 传输数据给List :todoList='todos'  -->
            <MyList  
                :todoList='todos'
            />

            <!-- 传入todos 给 Footer -->
            <MyFooter 
                :todos='todos'
                @checkAllTotal='checkAllTotal'
                @clearAllTotal='clearAllTotal'
                />
        </div>
    </div>
    </div>
</template>

<script>
    import pubsub from 'pubsub-js'
    import MyHeader from './components/MyHeader.vue'
    import MyList from './components/MyList.vue'
    import MyFooter from './components/MyFooter.vue'

    export default {
        components: {
            MyHeader,
            MyList,
            MyFooter
        },
        data() {
            return {
                // 定义数据 
                todos: JSON.parse(localStorage.getItem('todos'))  || [],
            }
        },
        methods: {
            // 定义函数在App和Header中数据进行传输
            receive(addTodo) {
                // 将数据传入添加到 data() 中 ， 在最前方添加 
                this.todos.unshift(addTodo)
            },

            // 定义给item组件中的check动态绑定 (爷爷给孙子传输数据)
            checkTodo(id) {
                // 绑定数据 
                this.todos.forEach(function(todo) {
                    // 将id数据对象中的 deon 进行取反 
                    if(todo.id === id) todo.done = !todo.done
                })
            },

            // 删除数据 
            DeleteTodo(_,id) {
                this.todos = this.todos.filter(todo => todo.id !== id);  // 过滤出todo.id 不等于 id 的数组对象，才能达到删除的目的
                // 返回一个一个新数组
            },

            // 定义全选，或者全不选 
            checkAllTotal(value) {
                this.todos.forEach(todo => todo.done = value)
            },

            // 清除已经完成的todo 
            clearAllTotal(){
                this.todos = this.todos.filter((todo) => !todo.done); // 得到todo.done为false的对象  
            }
        },
        watch: {
            todos: {
                deep: true,  // 开启深度监视
                    handler(value) {
                    // 监视todos数据，将todos转为JSON 
                    localStorage.setItem('todos',JSON.stringify(value))
                }
            }
        },

        // 使用 全局事件总线 实现  Item 和 App 之间进行通信 
        // App 接收方 
        mounted(){
            this.$bus.$on('checkTodo', this.checkTodo);
            // this.$bus.$on('DeleteTodo', this.DeleteTodo)

            // 订阅消息 
            this.pId = pubsub.subscribe('DeleteTodo', this.DeleteTodo)
        },
        beforeDestroy() {
            this.$bus.$off('checkTodo')
            // this.$bus.$off('DeleteTodo')
            
            // 销毁前取消订阅 
            pubsub.unsubscribe(this.pId)
        }
    }
</script>

<style scoped>
        /*base*/
    body {
    background: #fff;
    }
    .btn {
    display: inline-block;
    padding: 4px 12px;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    }
    .btn-danger {
    color: #fff;
    background-color: #da4f49;
    border: 1px solid #bd362f;
    }
    .btn-danger:hover {
    color: #fff;
    background-color: #bd362f;
    }
    .btn:focus {
    outline: none;
    }
    .todo-container {
    width: 600px;
    margin: 0 auto;
    }
    .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    }
</style>