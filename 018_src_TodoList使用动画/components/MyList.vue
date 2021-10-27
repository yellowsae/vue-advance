<template>
    <ul class="todo-main">
        <!-- :todoInfo='todoObj'； 传入todos 对象，使用 props 接收
            必须写成 :todoInfo ， 因为这样接收的todoObj，才是表达式 -->

        <Item 
            v-for="todoObj in todoList" 
            :key="todoObj.id" 
            :todoInfo='todoObj'
        />
    </ul>

</template>

<script>

    import Item from './Item.vue'
    export default {
        name: 'MyList',
        components: {Item},

        // 接收 App传入的todoList（数据项）, 并且循环使用
        // 接收 App传入的 handlCheck 给 List 下的组件 Item 使用 
        props: ['todoList']
    }
</script>

<style scoped>
/*main*/
.todo-main {
    margin-left: 0;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
    }
    .todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
    }
</style>