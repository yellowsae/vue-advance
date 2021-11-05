<template> 
    <div>
        <Hidie-row>
            <Hidie-button>默认按钮</Hidie-button>
            <Hidie-button type="primary">主要按钮</Hidie-button>
            <Hidie-button type="success">成功按钮</Hidie-button>
            <Hidie-button type="info">信息按钮</Hidie-button>
            <Hidie-button type="warning">警告按钮</Hidie-button>
            <Hidie-button type="danger">危险按钮</Hidie-button>
        </Hidie-row>
        
        <Hidie-row>
            <Hidie-button round>圆角按钮</Hidie-button>
            <Hidie-button type="primary" round>主要按钮</Hidie-button>
            <Hidie-button type="success" round>成功按钮</Hidie-button>
            <Hidie-button type="info" round>信息按钮</Hidie-button>
            <Hidie-button type="warning" round>警告按钮</Hidie-button>
            <Hidie-button type="danger" round>危险按钮</Hidie-button>
        </Hidie-row>


        
        <Hidie-row>
            <Hidie-button icon="el-icon-search" circle></Hidie-button>
            <Hidie-button type="primary" icon="el-icon-edit" circle></Hidie-button>
            <Hidie-button type="success" icon="el-icon-check" circle></Hidie-button>
            <Hidie-button type="info" icon="el-icon-message" circle></Hidie-button>
            <Hidie-button type="warning" icon="el-icon-star-off" circle></Hidie-button>
            <Hidie-button type="danger" icon="el-icon-delete" circle></Hidie-button>
        </Hidie-row>


        <i class="el-icon-edit"></i>
        <i class="el-icon-share"></i>
        <i class="el-icon-delete"></i>
        <Hidie-button type="primary" icon="el-icon-search">搜索</Hidie-button>



        <Hidie-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期">
        </Hidie-date-picker>
    </div>  

    
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                value1: ''
            }
        }
    }
</script>

