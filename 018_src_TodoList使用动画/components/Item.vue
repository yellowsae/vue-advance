<template>
    <transition 
        appear
        name='animate__animated animate__bounce'
        enter-active-class='animate__backInDown'
        leave-active-class='animate__backOutLeft'
    >
        <li>
            <label>
                    <!-- :checked='todoInfo.done' 这样写才能动态接收到 todoInfo中的信息 -->
                <input 
                    type="checkbox" 
                    :checked='todoInfo.done' 
                    @change="handlCheck(todoInfo.id)" 
                />

                <span v-show="!todoInfo.isEdit" >{{todoInfo.title}}</span>
                <input 
                    type="text" 
                    :value="todoInfo.title"
                    v-show="todoInfo.isEdit"
                    @blur='handleBlur(todoInfo,$event)'
                    ref='inputTitle'
                >
            </label>
            <button class="btn btn-danger" @click='handlDelet(todoInfo.id)' >删除 </button>
            <button class="btn btn-edit" @click='handleEdit(todoInfo)' v-show='!todoInfo.isEdit' > 编辑 </button>

        </li>
    </transition>
</template>

<script>
    import 'animate.css';
    import pubsub from 'pubsub-js';
    export default {
        name: "Item",
        // 接收todos对象
        props: ['todoInfo'],
        methods: {
            // 勾选 or  取消勾选 
            handlCheck(id){
                // this.checkTodo(id)
                
                // 使用全局定义的方法 
                this.$bus.$emit('checkTodo',id)
            },

            // 删除 
            handlDelet(id) {
                // 调用 DeleteTodo(id) 返回给 App， 进行数据的删除 
                // this.DeleteTodo(id)

                // 使用全局定义的方法 
                // this.$bus.$emit('DeleteTodo',id)

                // 使用消息订阅完成 删除功能 
                // 发送消息， 到App中接收消息
                pubsub.publish('DeleteTodo', id)
            },

            // 编辑
            handleEdit(todoInfo) {
                // todoInfo.hasOwnProperty.call('isEdit')
                // Object.prototype.hasOwnProperty.call(tpdoInfo, 'isEdit')
                if(todoInfo.hasOwnProperty.call('isEdit')) {
                    todoInfo.isEdit = true
                }
                else {
                    this.$set(todoInfo, 'isEdit', true)
                }

                // 使用 Vue中的  $nextTick  获取焦点 
                // nextTick 所指定的回调会在DOM节点更新完毕后执行 , 所以在DOM数据发生改变后使用 nextTick()获取input框的焦点
                this.$nextTick(function () {
                    this.$refs.inputTitle.focus()
                })
            },

            // 失去焦点, 回调 真正执行修改逻辑
            handleBlur(todoInfo,e) {
                todoInfo.isEdit = false

                //使用 全局事件总线 将数据传给 App
                if(!e.target.value.trim()) return alert('请输入数据')
                else this.$bus.$emit('updateTodo',todoInfo.id, e.target.value)
            }
        }   
    }
</script>

<style scoped>
    /*item*/
    li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
    }
    li label {
    float: left;
    cursor: pointer;
    }
    li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
    }
    li button {
    float: right;
    display: none;
    margin-top: 3px;
    }
    li:before {
    content: initial;
    }
    li:last-child {
    border-bottom: none;
    }
    li:hover{
    background: #ddd;
    }
    li:hover button{
    display: block;
    background-color: red;
    }

    .btn-edit {
    color: #fff;
    background-color: skyblue;
    border: 1px solid skyblue;
    }
    
    .btn-edit:hover {
    color: #fff;
    border: 1px solid skyblue;
    background-color: skyblue;

    }

</style>