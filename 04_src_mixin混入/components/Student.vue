<template>
    <div>
        <h2 @click='showInfo'>学生姓名： {{name}}</h2>
        <h2>学生的性别: {{sex}}</h2>
    </div>
</template>

<script>
    // 引入混合的配置文件 
    // import {hunhe, hunhe2} from '../mixin.js'
    export default {
        name: 'Student',
        data() {
            return {
                name: "Yellowsea",
                sex: "男"
            }
        },
        // mixins: [hunhe, hunhe2]
    }
</script>
