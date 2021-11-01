<template>
    <div>
        <h1>当前的求和为: {{sum}}</h1>
        <select v-model.number="n" >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <button  @click='increment'>+</button>
        <button @click='decrement'>-</button>
        <button @click='incrementOdd'>当前求和为奇数再加</button>
        <button @click='incrementWite'>等一等再加</button>
    </div>
</template>

<script>
    export default {
        name: 'Count',
        data(){
            return {
                n: 1,
                sum: 0
            }
        },
        methods: {
            increment() {
                this.sum  += this.n
            },
            decrement(){
                this.sum -= this.n
            },
            incrementOdd() {
                if (this.sum % 2) {
                    this.sum  += this.n
                }
            },
            incrementWite() {
                setTimeout(() => {
                    this.sum  += this.n
                },500)
            }
        }
    }
</script>

<style scoped>
    button {
        margin-left: 5px;
    }
</style>