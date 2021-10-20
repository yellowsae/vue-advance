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

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211020000912.png" alt="image-20211019164045390" style="zoom:50%;" />





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









## props配置 

为了提高代码的复用，在组件中的可以使用 `props` 对组件的参数自定义 





### 为什么要使用 `props`  ?

在`App`组件中使用`student` 组件， 并且 `student` 的数据需要动态变化 。 

```vue
<template>
    <div>
        <h2 v-text='msg' ref='title'></h2>

        <!-- 张三的学生的信息  -->
        <student ref='student'></student>

        <!-- 李四学生的信息 -->
        <student ref='student'></student>
    </div>
</template>
```

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211020113251.png" alt="image-20211020113241692" style="zoom:50%;" />

出现的问题 ：  数据不会改变， 在`student` 组件中，数据是被写死的， 这样代码虽然复用，但是数据不是动态的 



**在vc中props的显示** ：  

直接出现在 组件对象的实例上， 在组件实例对象上可以直接使用它们 ，`this.xxx` ,  它们是可读的，修改会发生bug

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211020130018.png" alt="image-20211020125720639" style="zoom:50%;" />



### 使用 `props`

为了提高代码的复用，在组件中的可以使用 `props` 对组件的参数自定义 ， 在单个**组件中**需要使用到 props 。

**在组件中定义**

```js
export default {
    name: 'Student',
    // data() {
    //     return {
    //         name: this.name,
    //         sex: this.sex,
    //         age: this.age,
    //     }
    // },

    // 第一种使用方法：  简单定义 
    props: ['name', 'sex', 'age'],
    
    // 第二种使用方法 : 限制类型 
    props: {
        name: String,
        sex: String,
        age: Number
    },
    
    // 第三种使用方法： （限制类型， 限制必要性， 指定默认值 ）
    props: {
        name: {
            type: String,		// 类型
            required: true,		// 需要性
            default: '老王'   // 默认值
        }
    }
}
```

**使用组件时** 

```vue
// App.vue
<template>
    <div>
        <h2 v-text='msg' ref='title'></h2>
        <!-- 需要写上在该组件props中定义的  name, sex  age    -->
        <!-- 张三的学生的信息  -->
        <student ref='student' name='张三' sex='男' :age='18'></student>
        <!-- 李四学生的信息 -->
        <student ref='student' name='李四' sex='女' :age='20'></student>
    </div>
</template>
```

> 这里定义Number类型的age，需要设置为 `v-bind:age='18'` 或者 `:age='18'` ， 才能转为 Number 类型





### 需求绑定事件让age+1 

代码如下: 

```js
// Student.app
    export default {
        name: 'Student',
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
                this.age++;
            }
        }
    }
```

出现的问题： 

![image-20211020120029763](https://gitee.com/yunhai0644/imghub/raw/master/20211020120031.png)



> 原因 ： 虽然能够实现age+1 , 但是出现bug， 因为props是**只读**的， Vue底层会监视你对props的修改， 如果进行了修改， 就会发出警告，若业务需求确实需要修改， 那么请复制一份props的内容，到 data 中， 然后去修改data中的数据 

解决： 

```vue
<script>
    export default {
        name: 'Student',
        data() {
            return {
                MyAge: this.age,   // 定义 MyAge 为 props中的this , 然后修改它就不会发生报错
            }
        },
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
```



**小结** 配置 `props `

功能： 让组件接收外部传过来的数据 

接收数据方法 ： 

```js
    // 第一种使用方法：  简单定义 
    props: ['name', 'sex', 'age'],
    
    // 第二种使用方法 : 限制类型 
    props: {
        name: String,
        sex: String,
        age: Number
    },
    
    // 第三种使用方法： （限制类型， 限制必要性， 指定默认值 ）
    props: {
        name: {
            type: String,		// 类型
            required: true,		// 需要性
            default: '老王'   // 默认值
        }
    }
```

备注：   因为props是**只读**的， `Vue`底层会监视你对props的修改， 如果进行了修改， 就会发出警告，若业务需求确实需要修改， 那么请复制一份props的内容，到 data 中， 然后去修改data中的数据 











## mixin混合

当多个组件具有相同的配置文件时候，可以定义一个 `xxx.js` 的混合文件，通过引入，在配置中使用混合的配置项，可以达到配置的复用 



例如 ：  具有相同的配置

```js
// Student.vue
methods: {
    showInfo() {
        alert(this.name)
    }
}

// School.vue 
methods: {
    showInfo() {
        alert(this.name)
    }
}
```



### **实现复用**

```js
// mixin.js   混合文件 
export const hunhe = {
    methods: {
        showInfo() {
            alert(this.name)
        }
    }
}
```

```vue
// School.vue
<script>
    // 引入混合文件 
    import {hunhe} from '../mixin.js';
    export default {
        name: "School",  // 组件的名字， 一般和文件名相同
        data() { 
            return {
                name: "SchoolName",
                address: 'SchoolAddress'
            }
        },
        // 使用混合模块 
        mixins: [hunhe]
    }
</script>


// Student.vue
<script>
    // 引入混合的配置文件 
    import {hunhe} from '../mixin.js'
    export default {
        name: 'Student',
        data() {
            return {
                name: "Yellowsea",
                sex: "男"
            }
        },
        // 使用混合文件 
        mixins: [hunhe]
    }
</script>
```



所以具有相同的配置项， 要使用混合 `mixins` 



### 全局复用

```js
// mixin.js
export const hunhe = {
    methods: {
        showInfo() {
            alert(this.name)
        }
    }
}
// 多个混合模块 
export const hunhe2 = {
    // 定义数据
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
```

```js
// main.js 入口文件 
// 引入混合组件
import { hunhe, hunhe2 } from './mixin.js';
// 全局使用混合 
Vue.mixin(hunhe)
Vue.mixin(hunhe2)
```



所有的`vc` 都具有`mixin.js` 中的方法 

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211020135103.png" alt="image-20211020135052713" style="zoom:50%;" />

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211020135131.png" alt="image-20211020135124375" style="zoom:50%;" />



具有四个vc输入四次 `@` ,  在每个vc中都具有 `data() ` 中的数据 



**小结** `mixin(混入)`

功能： 可以把多个组件共用的配置提取成一个混入对象

使用方法 ： 

1. 第一步 ， 定义混合 例如 

   ```js
   export const _mixin = {
       data(){},
       methods: {} 
   }
   ```

2. 使用混入 

   ```js
   // 全局混入， 在main.js中
   //导入混合文件
   Vue.mixin(xxx)
   
   //局部混入 
   mixins: ['xxx']
   ```







