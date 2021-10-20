export const hunhe = {
    methods: {
        showInfo() {
            alert(this.name)
        }
    }
}


// 多个混合模块 
export const hunhe2 = {
    data() {
        return {
            x: 1,
            y: 2
        }
    },
    mounted() {
        console.log('@' + "你好啊")
    }
}