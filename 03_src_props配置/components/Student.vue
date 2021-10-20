<template>
    <div>
        <h2>学生姓名： {{name}}</h2>
        <h2>学生的性别: {{sex}}</h2>
        <h2>学生年龄: {{MyAge}}</h2>
        <button @click='add'>Age+1</button>
    </div>
</template>

<script>
    export default {
        name: 'Student',
        data() {
            return {
                // name: this.name,
                // sex: this.sex,
                MyAge: this.age,
            }
        },
    
        // 第一种使用方法：  简单定义 
        // props: ['name', 'sex', 'age'],

        // 第二种使用方法 ： 限制类型
        // props: {
        //     name: String,
        //     sex: String,
        //     age: Number,
        // }
        props: {
            name: {
                type: String,
                required: true,
            },
            sex: {  // required 必要值，在定义组件标签时， 必须要定义的属性
                type: String,
                required: true,
            },
            age: {  // 当没有设置age时候，使用 default
                type: Number,
                default: 99
            }
        },

        methods: {
            add() {
                this.MyAge++;
                console.log(this)
            }
        }
    }
</script>

<style>

</style>