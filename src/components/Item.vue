<template>
<li>
    <label>
            <!-- :checked='todoInfo.done' 这样写才能动态接收到 todoInfo中的信息 -->
        <input 
            type="checkbox" 
            :checked='todoInfo.done' 
            @change="handlCheck(todoInfo.id)" 
        />
        
        <!-- 使用 v-model 也能双向数据绑定实现动态数据变化功能，但是不太推荐，因为有点违反原则，因为修改了 props  -->
        <!-- <input 
            type="checkbox" 
            v-model='todoInfo.done'
        /> -->
        
        <span>{{todoInfo.title}}</span>
    </label>
    <button 
        class="btn btn-danger" 
        @click='handlDelet(todoInfo.id)' >删除</button>
</li>
</template>

<script>
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
                this.$bus.$emit('DeleteTodo',id)
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


</style>