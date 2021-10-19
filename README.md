## Vue脚手架中结构的分析





**脚手架的文件们**

```bash
.
├── babel.config.js   // babel配置文件， 用于ES6->ES5语言的转变
├── node_modules	// 依赖包
├── package-lock.json   // 包版本控制文件 
├── package.json   // 包的说明书 
├── public   // 页面代码
    ├── favicon.ico   // 网页图标
    └── index.html	 // 页面文件
├── README.md   // README 介绍文件 
└── src   // 逻辑代码文件
	├── App.vue    // 管理者 App.vue 文件 
    ├── assets		// 放置静态资源的文件
    	└── logo.png
    ├── components   // 放置组件的文件 
    	└── HelloWorld.vue    // 组件文件 
    └── main.js		// 入口文件 
```





需要细讲的文件 

**`main.js`**

```js

// 引入Vue 
import Vue from 'vue'

// 引入 App管理组件 
import App from './App.vue'

// 关闭提示
Vue.config.productionTip = false

// 创建 vm  
new Vue({
  el: '#app',  // 挂载的容器 
  render: h => h(App),  // 怎么将app组件挂载到网页 ，
});

```





`index.html`

```html
<!DOCTYPE html>
<html lang="">

<head>
    <meta charset="utf-8">
    <!-- 让IE浏览器用最高版本渲染页面  -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <!-- 网页的图标 `%= BASE_URL %>` 经过Vue脚手架底层编译的路径，指向的时 /public 路径-->
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">

    <!-- 也是经过Vue底层编译过的名， `%= htmlWebpackPlugin.options.title %`  指向的是 package.json中的 name -->
    <title>
        <%= htmlWebpackPlugin.options.title %>
    </title>
</head>

<body>
    <!-- noscript 当浏览器不支持JS脚本时候， 这行代码会执行 -->
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>

    <!-- 容器  -->
    <div id="app"></div>
    <!-- built files will be auto injected -->
</body>

</html>
```





当使用单文件组件文件，替换初始化文件

<img src="../../../AppData/Roaming/Typora/typora-user-images/image-20211019164045390.png" alt="image-20211019164045390" style="zoom:50%;" />









## render 函数

在`main.js` 中创建的vm进行挂载app时候，使用了 `render()` 函数 

```js
render: h => h(App), 
```

因为在` main.js `中引入的  `vue `是属于在创建项目中的 `vue.runtime.esm.js `  是没有模板解析功能的 ;  解析不了 `template`，   所以使用了 `render()` 函数 



### render() 函数工作原理



```js
// 用法 
render(createElement) {  // 接收到的参数createElement（创建），   createElement是function类型 
    return createElement('h2', '你好vue')
}
// 简写 
render: (createElement) => createElement('h2', '你好vue');  //可以在页面中显示 

// 在Vue中使用 
render: (h) =>  h(App);   // 直接使用组件名 app ， 表示会创建 <App></App>
```





**在项目中使用引入vue的文件**

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211019170657.png" alt="image-20211019170500483" style="zoom:50%;" />



![image-20211019170512721](https://gitee.com/yunhai0644/imghub/raw/master/20211019170513.png)





### 不同版本的 vue

1. vue.js 与 vue.runtiem.xxx.js 的区别 ： 
   1. vue.js 是完整版的 Vue,  包含 ： 核心功能 + 模板解析器 
   2. vue.runtime.xxx.js 是运行版本的 Vue，  只包含：核心功能 ： 没有模板解析器  
2. 因为`Vue.runtime.xxx.js `没有模板解析器， 所以不能使用 `template` 配置项， 需要使用` render` 函数接收到的 `createElement`函数去指定具体内容
3. 好处： 减少体积 ... 







## Vue修改默认配置 

https://cli.vuejs.org/zh/config/#vue-config-js

`vue.config.js` 是一个可选的配置文件，如果项目的 (和 `package.json` 同级的) 根目录中存在这个文件，那么它会被 `@vue/cli-service` 自动加载。



例如修改`main.js `入口文件 

```js
module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',  // 把main.js 改了， 就是改了入口文件的 
  },
      lintOnSave: false    // 关闭语法错误提示 
}
```







## ref 属性

**定义ref**

```vue
<template>
    <div>
        <h2 v-text='msg' ref='title'></h2>
        <img src="./assets/logo.png" alt="logo">
        <school  ref='school'></school>
        <student ref='student'></student>
        <button @click='showInfo'>点我查看信息</button>
    </div>
</template>
```

```js
export default {
    components: {
        School,
        Student
    },
    data(){
        return {
            msg: 'Hello Vue'
        }
    },
    methods: {
        showInfo() {
            console.log(this);  // App组件的实例对象
            // 学习 组件中具有的 $refs 属性 
            console.log(this.$refs);   
            console.log(this.$refs.title);  // 真实DOM
            console.log(this.$refs.school);  // 组件的实例对象
        }
    }
}
```







在`App.vue `中的实例对象 上的`$refs `

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211019234409.png" alt="image-20211019234354996" style="zoom:50%;" />

**ref属性的作用**

在父组件中在子组件使用 ref 属性，  会在 父组件的实例对象中 的 `vc.$refs`  中出现， 可以获取到 真实的DOM元素信息 ， 也可以获取到子组件的实例对象(子组件的this) , 所以有很大的空间复用子组件的数据， 方法 等 



![image-20211019234804347](https://gitee.com/yunhai0644/imghub/raw/master/20211019234806.png)











**总结**

1. 被用来给元素或子组件注册引用信息 (id的替代者)
2. 应用在html 标签上获取的是真实的DOM元素， 应用在组件标签上是组件的实例对象 (vc) 
3. 使用方式 ： 
   1. 达标识 ： `<h1 ref='xxx'>... </h1>` 或 `<School ref='school'></School>` 
   2. 获取 :  `this.$refs.xxx`

















