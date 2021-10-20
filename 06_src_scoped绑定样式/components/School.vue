<template>
    <div class='deom'>
        <h2>学校名称： {{name}}</h2>
        <h2>学校地点: {{address}}</h2>

    </div>
</template>

<script>
    export default {
        name: "School",  
        data() { 
            return {
                name: "SchoolName",
                address: 'SchoolAddress'
            }
        },
        methods: {
        }
    }
</script>

<style scoped>
    .deom {
        background-color: orange;
    }
</style>