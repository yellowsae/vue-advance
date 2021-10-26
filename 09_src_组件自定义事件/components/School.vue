<template>
    <div class='deom'>
        <h2>学校名称： {{name}}</h2>
        <h2>学校地点: {{address}}</h2>
        <button @click='sendSchoolName'>点击获取学校的名字</button>

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
        props: ['getSchoolName'],
        methods: {
            sendSchoolName() {
                this.getSchoolName(this.name)
            }
        }
    }
</script>

<style scoped>
    .deom {
        background-color: orange;
        padding: 5px;
        margin: 5px;
    }
</style>