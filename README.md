## Vue脚手架中结构的分析





**脚手架的文件们**

```tex
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

`vue.config.js`中

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
// mixin.js   需要创建 mixin.js  混合文件 
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









## 	Vue中的插件

插件的使用 

```js
// plug.js
// 自定义插件是一个 js文件， 
export default pulg = {  // 保留对象
    install(Vue,option) {
        //1. 添加全局过滤器 
        Vue.filter(xxxx);
        //2. 添加全局指令 
        Vue.directive(xxx);
        //3. 配置全局混入
        Vue.mixin(xxx);
        //4, 添加实例对象方法 
        Vue.prototype.$myMethod = function () {xxx};
        Vue.prototype.$myProperty  = xxx;
    }
}
```

```js
// main.js 
// 引入插件 
import plug from './plug'
Vue.use(plug);
```





**在组件中使用plug的方法**

```vue
//School.vue
<template>
    <div class='deom'>
        
        <!-- 使用过滤器 -->
        <h2>学校名称： {{name | MySlice}}</h2>
        <h2>学校地点: {{address}}</h2>
        <!-- 在pulg 中的方法 -->
        <button @click='showInfo'>点我查看信息</button>
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
            showInfo() {
                // 在vm原型中的函数，
                this.$showMsg()
            }
        }
    }
</script>
```

```vue
// Student.vue
<template>
    <div>
        <h2>学生姓名： {{name}}</h2>
        <h2>学生的性别: {{sex}}</h2>

        <!-- 使用 plug 中的数据  -->
        <input type="text" v-fbind:value="name">
        <button @click='showInfo'>查看原型上的信息</button>
    </div>
</template>

<script>
    export default {
        name: 'Student',
        data() {
            return {
                name: "Yellowsea",
                sex: "男"
            }
        },
        methods: {
            showInfo() {
                // 找到plug 定义的数据 
                alert(this.$myProperty)
            }
        }
    }
</script>
```



**总结**

功能： 用于增强Vue 

本质 ： 包含`install` 方法的一个对象，`install` 的第一个参数是`Vue` , 第二个以后的参数是插件使用者传递的数据 ，

自定义插件： 

```js
// 自定义插件是一个 js文件， 
export default pulg = {  // 保留对象
    install(Vue,option) {
        //1. 添加全局过滤器 
        Vue.filter(xxxx);
        //2. 添加全局指令 
        Vue.directive(xxx);
        //3. 配置全局混入
        Vue.mixin(xxx);
        //4, 添加实例对象方法 
        Vue.prototype.$myMethod = function () {xxx};
        Vue.prototype.$myProperty  = xxx;
    }
}
```

使用插件 ： 

```js
// 在`main.js` 引入插件 
//使用插件
Vue.use(plug);
```





## scoped样式

作用： 让样式在局部生效，防止冲入 
写法 ： `<style scoped></style>`

示例 ： 

```vue
// Student.vue 
<style>
    .demo {
        background-color:pink;
    }
</style>



// School.vue 
<style>
    .deom {
        background-color: orange;
    }
</style>
```

`Vue`组件中的`<style>`  最后都会整合成一个 style样式表，就会出现多个组件中具有相同的类名，为了避免出现者样的情况，在组件文件中加上 `<style scoped>`  避免冲突。 (当出现冲突时候，根据引入组件的先后顺序使用样式)



解决样式的冲突 ： `<style scoped>`  表示该组件样式，只服务于该组件。 

```vue
<style scoped>
    .deom {
        background-color: orange;
    }
</style>
```

`Vue`使用`scoped` 解决冲突的原理 ： 生成一串随机的数字作为标签，修改绑定样式的标签

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211020155736.png" alt="image-20211020155727904" style="zoom:50%;" />









## TodoList 案例



实现效果 

- 添加事件 / 删除事件 
- 全选 / 取消全选 
- 统计的完成事件
- 清除完成功能 

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211021104824.png" alt="image-20211021104810700" style="zoom:67%;" />



### 实现代码

页面分为三个组件，  `MyHeader` `MyList` `      MyFooter` ,   在 `MyList`在包含一个`Item` 组件 和它们的管理组件 `App`。 样式省略 



*App.vue*

在App中需要给它管理的组件下发数据，所以是在App中定义数据的， 对App所管理的组件进行交互， 比如添加，删除等， 也会组件传上来的数据进行处理 

```vue
<template>
<div id="root">
    <div class="todo-container">
        <div class="todo-wrap">
            <!-- 并且使用 :receive 的形式， 不然props接收到的不是表达式， 而是字符串   -->
            <!-- :receive='receive'函数，  提共一个通道，让Heander返回的数据通过这个函数App能够接收到  -->
            <MyHeader  
                :receive='receive'
            />   
            <!-- 传输数据给List :todoList='todos'  -->
            <MyList  
                :todoList='todos'
                :checkTodo='checkTodo' 
                :DeleteTodo='DeleteTodo'
            />

            <!-- 传入todos 给 Footer -->
            <MyFooter 
                :todos='todos'
                :checkAllTotal='checkAllTotal'
                :clearAllTotal='clearAllTotal'
            />
        </div>
    </div>
    </div>
</template>

<script>

    import MyHeader from './components/MyHeader.vue'
    import MyList from './components/MyList.vue'
    import MyFooter from './components/MyFooter.vue'

    export default {
        components: {
            MyHeader,
            MyList,
            MyFooter
        },
        data() {
            return {
                // 定义数据 
                todos: [
                    {
                        id: '001',
                        title: "事件1",
                        done: true
                    },
                    {
                        id: '002',
                        title: "事件2",
                        done: false
                    },
                    {
                        id: '003',
                        title: "事件3",
                        done: true
                    }
                ]
            }
        },
        methods: {
            // 定义函数在App和Header中数据进行传输， 添加输入的方法 
            receive(addTodo) {
                // 将数据传入添加到 data() 中 ， 在最前方添加 
                this.todos.unshift(addTodo)
            },

            // 定义给item组件中的check动态绑定 (爷爷给孙子传输数据)
            checkTodo(id) {
                // 绑定数据 
                this.todos.forEach(function(todo) {
                    // 将id数据对象中的 deon 进行取反 
                    if(todo.id === id) todo.done = !todo.done
                })
            },

            // 删除数据 
            DeleteTodo(id) {
                // 过滤出todo.id 不等于 id 的数组对象，才能达到删除的目的
                this.todos = this.todos.filter(todo => todo.id !== id);  
                // 返回一个一个新数组
            },

            // 定义全选，或者全不选 
            checkAllTotal(value) {
                this.todos.forEach(todo => todo.done = value)
            },

            // 清除已经完成的todo 
            clearAllTotal(){
                // 得到todo.done为false的对象  
                this.todos = this.todos.filter((todo) => !todo.done); 
            }
        }
    }
</script>
```







*MyHeader.vue*

分析代码， 在Header中需要输入一个事件，接下来，逻辑部分 我们就必须拿到 **事件的值、清空输入、将事件的值包装**成一个跟原数据一样的对象，然后返回给上层  App 组件

```vue
<template>
    <div class="todo-header">
        <input 
            type="text" 
            placeholder="请输入你的任务名称，按回车键确认" 
            v-model='title' 
            @keyup.enter="add"/>
    </div>
</template>

<script>
    import {nanoid} from 'nanoid'  // nanoid 随机生成一个ID 
    export default {
        name: 'MyHeader',
        data() {
            // 获取输入的值 
            return {
                // 用 v-model 双向绑定的数据 
                title: ''
            }
        },
        // 接收App传入进来的方法 
        props: ['receive'],

        methods: {
            
            // 添加事件 
            add() {
                // 判断title是否为空,  trim去除两边空格
                if(!this.title.trim()) return alert('请输入数据')
                // 将输入的数据组装成一个对象
                const infoObj = {
                    id: nanoid(),   // nanoid的用法 
                    title: this.title,
                    done: false   // 添加事件默认为 false 
                }
                // 调用receive函数，给App组件返回值，让App组件添加一个对象 
                this.receive(infoObj)
                this.title =''  // 清空输入
            }
        }
    }
</script>
```





*MyList.vue*

在List当中，对Item组件进行循环遍历，展示数据 ， 和为 Item 和 App之间的传递数据 ， 开启通道

```vue
<template>
    <ul class="todo-main">
        <!-- :todoInfo='todoObj'； 传入todos 对象，使用 props 接收
            必须写成 :todoInfo ， 因为这样接收的todoObj，才是表达式 -->
        <Item 
            v-for="todoObj in todoList" 
            :key="todoObj.id" 
            :todoInfo='todoObj'
            :checkTodo='checkTodo' 
            :DeleteTodo='DeleteTodo'
            />
            <!-- :checkTodo='checkTodo' , 父元素和子元素的通道 -->
    </ul>

</template>

<script>
    import Item from './Item.vue'
    export default {
        name: 'MyList',
        components: {Item},

        // 接收 App传入的todoList（数据项）, 并且循环使用
        // 接收 App传入的 handlCheck 给 List 下的组件 Item 使用 
        props: ['todoList', 'checkTodo', 'DeleteTodo']
    }
</script>
```



*MyFooter.vue*

Footer中需要 配置数据的 全选或者全不选， 和清空已完成的事件， 和对完成事件的统计 

```vue
<template>
<!-- v-show='total' 判断total， 控制隐藏 -->
    <div class="todo-footer" v-show='total'>
    <label>
        <!-- 配置全选或者 全不选，使用点击方法  -->
        <!-- <input type="checkbox" :checked="isAll"  @change="checkAll"/> -->
        
        <!-- 这里这里使用 v-model 实现， 绑定再 isAll上 -->
        <input type="checkbox" v-model="isAll" />

    </label>
    <span>
        <!-- 使用计算属性写，完成的个数  -->
        <span> 已完成{{doneTotal}} </span> / 全部 {{total}}
    </span>
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
    </div>
</template>

<script>
    export default {
        name: 'MyFooter',
        
        // App传入的参数 ， 方法 
        props: ['todos', 'checkAllTotal', 'clearAllTotal'],
        
        
        // 都是由计算属性写
        computed: {
            
            
            // todos 的长度， 也就是事件的总长度 
            total() {
                return this.todos.length
            },
            
            
            // 完成的个数 (统计)
            doneTotal() {
                // 返回的是 todo.done 为 true 的值 ， 如果为真返回 1,
                return this.todos.reduce((pre,todo) =>  pre + (todo.done ? 1 : 0) ,0)
            },
            
            
            // 全选的按钮  通过计算属性进行书写 
            isAll: {   // isAll的值是 v-model双向数据的绑定, true / false
                get() {
                    return this.total === this.doneTotal && this.total > 0
                },
                // 当数据发生变化时, 调用checkAllTotal函数，并且传入value的值
                set(value) {
                    // checkAllTotal()给app传入的参数
                    this.checkAllTotal(value)
                }
            } 
            // isAll() {
            //     return this.total === this.doneTotal && this.total > 0
            // }
        },

        methods: {
            // checkAll(e) {
            //     // 传入参数 
            //     this.checkAllTotal(e.target.checked)
            // }

            // 清除已经完成的todo 
            clearAll() {
                // 调用就行
                this.clearAllTotal()
            }
        }
    }
</script>
```



*Item.vue*

在 Item中需要对 App进行数据的交互，比如事件选中，App中的数据要同步，删除数据 

```vue
<template>
<li>
    <label>
            <!-- :checked='todoInfo.done' 这样写才能动态接收到 todoInfo中的信息 -->
        <input 
            type="checkbox" 
            :checked='todoInfo.done' 
            @change="handlCheck(todoInfo.id)" 
        />
        
        <!-- 使用 v-model 也能双向数据绑定实现动态数据变化功能，但是不太推荐，因为有点违反原则，因为修改			了 props  -->
        <!-- <input 
            type="checkbox" 
            v-model='todoInfo.done'
        /> -->
        
        
        <!--  数据的展示  -->
        <span>{{todoInfo.title}}</span>
    </label>
    <button class="btn btn-danger"  @click='handlDelet(todoInfo.id)' >删除</button>
</li>
</template>

<script>
    export default {
        name: "Item",
        
        // 接收todos对象, 和对App传入的参数，和删除方法 
        props: ['todoInfo','checkTodo', 'DeleteTodo'],
        methods: {
            // 勾选 or  取消勾选， 传入事件的id给App，让App对数据的done值进行修改 
            handlCheck(id){
                this.checkTodo(id)
            },

            // 删除， 传入事件的id给App，让App进行删除 
            handlDelet(id) {
                // 调用 DeleteTodo(id) 返回给 App， 进行数据的删除 
                this.DeleteTodo(id)
            }
        }   
    }
</script>

```





### TodoList总结

组要熟悉使用单组件开发的流程，基础的事件绑定方法和处理数据 ， 组件的上下级之间的传输数据，  



对组件化编码的流程 ： 

1. 拆分静态组件 ：  组件要按照 **功能** 点拆分， 命名不要于HTML元素冲突  
2. 实现动态组件 ： 考虑好数据存放的位置，数据是一个组件在使用，还是一些组件在使用 
   1. 一个组件在使用时 ： 放在组件自身即可 
   2. 一些组件都在使用时 ： 放在它们共同的父组件上  （状态提示）
3. 实现交互 ： 绑定事件开始 （基础） 



props适用于 ：

1. 父组件 ===>  子组件通信 （` :todoList='todos'` ）
2. 子组件 ===> 父组件通信 (要求父先给子一个函数)   ` :receive='receive'`   



使用 `v-model` 时要切记 ： v-model 绑定的值不能是 props 传过来的值， 因为 props 是不可以修改的  



props传过来的若是对象类型的值， 修改对象中的属性是 Vue 不会报错， 但是不推荐这样做 ，因为props 是不可以修改的  













## 浏览器本地存储

浏览器本地存储内容的大小一般支持5MB左右 (不同浏览器可能还不一样)

浏览器通过 `window.sessionStorage` 和 `window.localStorage` 属性实现本地存储机制 

相关API 

1. `xxxStorage.setItem('key','value')` : 该方法接收一个键和值对 添加到存储中，如果键名存在，则更新键值
2. `xxxStroage.getItem('person')`  :  接受一个键名作为参数， 返回键名对应的值 
3. `xxxStorage.removeItem('key')`  :  接受一个键名作为参数， 并把键名从存储中删除 
4. `xxxStorage.clear()`  ： 清空存储中的所有数据 



备注 ： 

1. SessionStorage存储的内容会随着浏览器窗口关闭而消失
2. LocalStorage存储的内容，需要手动清除才消失
3. `xxxStroage.getItem(xxx)`  :  如果xxx对应的value 获取不到， 那么getter的返回值是null 
4. `JSON.parse(null)`  的结果依然是 null 







## TodoList 本地存储 

使用监视属性`watch `  进行对 todos 的监视， 对于 todos的数据不要写死，使用 `localStorage.setItem()` 写到 todos 中，   在使用 `localStorage.getItem()` 写到本地存储中 

*App.vue*

```js
data() {
    return {
        // JSON.parse(localStorage.getItem('todos')) 将数据存储到本地 
        todos: JSON.parse(localStorage.getItem('todos'))  || [],
    }
},
    
watch: {
    todos: {
        deep: true,  // 开启深度监视
            handler(value) {
            // 监视todos数据，将todos转为JSON 
            localStorage.setItem('todos',JSON.stringify(value))
        }
    }
}
```







## 组件自定义事件 

因为开发过程中，需要子组件需要给父组件传输数据， 目前学到的一种方法 ：  通过父组件给子组件传递函数类型的props实现， 子给父传递数据

还可以使用组件自定义对象实现 子组件给父组件传递数据





### 绑定 



第一种方法 ： 通过父组件给子组件邦迪一个自定义事件实现 ： 子给父传输数据 

*App.vue*

```vue
<template>
    <div class='app'>
        <!-- 通过父组件给子组件邦迪一个自定义事件实现 ： 子给父传输数据  (第一种) -->
        <Student @hidie='getStudentName'/>  
        <!-- v-on:hidie  或者 @hidie 自定义事件  -->
    </div>
</template>

<script>
    methods: {
            getStudentName(name) {
                console.log("App调用Student组件，获取到Studentl的name ",name)
            }
        },
</script>
```



*Student.vue*

```vue
<template>
    <div class='demo'>
        <h2>学生姓名： {{name}}</h2>
        <h2>学生的性别: {{sex}}</h2>
        <!--  绑定点击事件 -->
        <button @click='getStudentName'>点击获取Student姓名</button>
    </div>
</template>

<script>
    ...
    methods: {
        getStudentName() {
            // 使用 this.$emit('自定义事件名', '返回的参数') 进行调用 
            this.$emit('hidie',this.name)
        }
    }
</script>
```



第二种方法 ： 

// App.vue

```vue
<template>
    <div class='app'>
        <!-- 通过父组件给子组件邦迪一个自定义事件实现 使用 ref 实现 ：子给父传输数据  (第二种) -->
        <Student ref='studen' />
    </div>
</template>

<script>
	... 
    // 生命周期钩子， mounted() 当App挂载完成后 
    mounted() {
    // 通过vc获取到  refs 身上的 student 使用 $on绑定 自定义事件， 然后回调 getStudentName 函数 
        this.$refs.studen.$on('hidie',this.getStudentName)
    }
</script>
```





### 解绑

```js
this.$off('hidie');  // 解绑一个自定义事件 
this.$off(['hidie','demo']);  // 解绑多个自定义事件
this.$off();  // 解绑所有自定义事件 
```



### 总结

1. 第一种组件间通信方式 ， 适用于 ：  子组件 ==> 父组件 

2. 使用场景 : A是父组件， B是子组件， B想给 A传输数据， 那么就要在A种给B绑定自定义事件  (事件的回调在A中)

3. 绑定自定义事件 ：

   1. 第一种方式 ： 在父组件中 : `<Student @hidie='getStudentName' @demo='mi'/>` 

   2. 第二种方式 ： 在父组件中 ： 

      ```js
      <Student  ref='xxx'/>
       ... 
      mounted() {
          this.$refs.xxx.$on('xxx',this.test)
      }
      ```

   3. 若想让自定义事件只能触发一次， 可以使用 `once` 修饰符 ，  或者 `$once` 方法 

4. 触发自定义事件 ： `this.$emit('hidie',传输的数据)`  

5. 解绑自定义事件 ： `this.$off('hidie')`   

6. 组件上也可以绑定原生的DOM事件 ， 需要使用 `native` 修饰符  `<Student @click.native='add'/>`

7. 注意： 通过 `this.$refs.xxx.$on('hidie', 回调) ` 绑定自定义事件时， 回调要么配置在 `methods` 中， 要么配置成箭头函数， 否则 this 的指向会出现问题 









## 全局事件总线

![image-20211026161139365](https://gitee.com/yunhai0644/imghub/raw/master/20211026161148.png)



兄弟组件之间需要互相传输数据，  需要一个”中间人“  做跳板，让它们之间的数据能够传输 。 中间人的身份必须要又 `$emit $on  $off ` 等方法，  考虑到 全局组件的原型 都 指向 VM  ，  所以在 VM原型上定义一个 全局事件总线 ，让所有的组件都能通过 this 访问到VM的原型， 进而使用VM原型上的方法  



**创建全局事件总线**

```js
// main.js
new Vue({
    el: '#app',
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this
    }
});
```

**提供数据方**

```js
...
methods: {
    sendStudentName() {
        // 使用 $bus.$emit() 自定义组件，和传递数据 
        this.$bus.$emit('hello', this.name)
    }
}
```

**接收数据方**

```js
methods: {
    // 记得写接收的参数 
    showInfo(data) {
        console.log('我是 School 组件我收到了 Student 传过来的数据 ',data)
        this.msg  = data
    },
},
...
mounted() { // 生命周期钩子，
    this.$bus.$on('hello', this.showInfo)
},
beforeDestroy() {
    //  调用后，在准备销毁前 
    this.$bus.$off('hello')
}
```





### 总结

1. 一种兄弟组件之间的通信方式 ，适用于任意组件(父子， 兄弟，爷孙， 父子之间最好使用 props)

2. 安装全局事件总线 ： 

   ```js
   // 在 main.js 中 
   new Vue({
       el: '#app',
       render: h => h(App),
       beforeCreate() {
           // 定义  $bus 作为 全局事件总线 ，值指向 VM 
           Vue.prototype.$bus = this
       }
   });
   ```

3. 使用事件总线 

   1. 接收数据一方 :  A想接收数据 ， 则 A组件中给 `$bus` 绑定自定义事件， 事件的**回调**留在 A组件组时 

      ```js
      methods: {
          demo(data) {....}  // 接收参数的方法
      }
      ... 
      mounted() { // 生命周期钩子
          this.$bus.$on('自定义事件', this.demo);  // 回调函数
      }
      
      
      // 或者将回调直接写在 mounted()中
      mounted() { // 生命周期钩子
          this.$bus.$on('自定义事件',(name) => {
              this.name = name
          });
      }
      ```

   2. 提供数据一方 ：  

      ```js
      // 定义方法 
      ...
      
      this.$bus.$emit('自定义事件', 需要传输的数据 )
      ```

4. 最好在`beforeDestroy`钩子中, 使用 `$off` 去解绑当前组件用到的事件 







## 消息订阅与发布

使用引入的库实现 （pubsub-js）

接收方

```js
mounted() {
    // 使用 vue 的全局事件总线 
    // this.$bus.$on('hello', this.showInfo)
    
    // 使用 pubsub , this.showInfo 回调函数 
    this.pid = pubsub.subscribe('hello', (pubName,data) => {
        console.log('我是 School 组件我收到了 Student 传过来的数据 ',pubName,data )
        this.msg  = data
    })

},
beforeDestroy() {
        //  调用后，在准备销毁前 
        // this.$bus.$off('hello')
        // 取消 消息订阅 
        pubsub.unsubscribe(this.pid)
    }
```

发送方

```js
methods: {
    sendStudentName() {
        // this.$bus.$emit('hello', this.name)

        // 发布消息，订阅消息的方法名 要和接收方的一致
        pubsub.publish('hello', this.name)
    }
}
```







### 总结 

1. 一种组件之间通信的方式， 适用于 任意组件之间的通信

2. 使用： 

   1. 安装 pubsub : `npm i  pubsub-js` 
   2. 组件中引入 ： `import  pubsub  from  'pubsub-js'`

   3. 接收数据方 ： 

      ```js
      methods() {
          demo(data) {...}
      }
          ...
      mounted() {
              this.pubid = pubsub.subscribe('xxx', this.demo) // 订阅消息 
          }
      ```

   4. 提供数据方 ： `pubsub.publish('xxx', 数据)` 

   5. 最好在 `beforeDestroy` 钩子中， 用 `pubsub.unsubscribe(pubid)`  去 取消订阅 







##  `$nextTick()`

`nextTick` 所指定的回调会在DOM节点更新完毕后执行 , 所以在DOM数据发生改变后使用 `nextTick()`获取input框的焦点

```js
// 使用 Vue中的  $nextTick  获取焦点 
// nextTick 所指定的回调会在DOM节点更新完毕后执行 , 所以在DOM数据发生改变后使用 nextTick()获取input框的焦点
this.$nextTick(function () {
    this.$refs.inputTitle.focus()
})
```



在Vue中 `nextTick()` 回经常用到， 比如在获取焦点

`nextTick()`

1. `nextTick()`语法 ： `this.$nextTick(回调函数)` 
2. 作用： 在**下一次**DOM更新结束后执行回指定的回调 
3. 什么使用使用 ： 当改变数据后， **要基于更新后的新DOM进行某些操作时**， 要在 nextTick 指定的回调函数中执行 



也就是在Vue数据发生改变后，发生数据变化， 重新解析模板， 生成新的数据，然后执行 `nextTick()` 中的回调函数 











## Vue封装的过度与动画 



```vue
<style scoped>
    h1 {
        background-color: orange;
    }
    /* 通过过度方式实现动画 */
    /* 进入的起点， 离开的终点 */
    .v-enter,
    .v-leave-to {
        transform: translateX(-100%);
    }

    .v-enter-active, 
    .v-leave-active  {
        /* 动画时间 */
        transition: 0.5 linear;
    }

    .v-enter-to, 
    .v-leave  {
        transform: translateX(0);
    }

</style>
```







1. 作用 ： 在插入、更新或移除DOM元素时， 在合适的时候给元素添加样式类名 

2. 图示

   ![vue动画](https://cn.vuejs.org/images/transition.png)

3. 写法： 

   1. 准备好样式 ： 

      - 元素进入时的样式 ： 
        1. v-enter :  进入的起点 
        2. v-enter-active : 进入过程中
        3. v-enter-to : 进入的终点 
      - 元素离的样式 ：
        1. v-leave : 离开的起点 
        2. v-leave-active : 离开的过程中 
        3. v-leave-to : 离开的终点 

   2. 使用 `<transition>` 包裹要过度的元素， 并配置name属性 

      ```html
      <transition name='hello'>
          <h1 v-show='isShow'>你好啊！</h1>
      </transition>
      ```

   3. 备注 ： 若有多个元素需要过度， 则需要使用 :  `<transition-group>` 且每个元素都要指定 `key` 值 
   
4. 使用第三方库 : https://animate.style/

   1. 安装 ： `npm install animate.css --save`

   2. 导入 ： `import 'animate.css';`

   3. 使用 :  

      ```vue
      <!-- 使用第三方库 设置样式 -->
      <!-- enter-active-class: 进来时的样式  -->
      <!--  -->
      <transition  
                  appear
                  name='animate__animated animate__bounce'
                  enter-active-class='animate__rubberBand'
                  leave-active-class='animate__backOutDown'
                  >
          <h1 v-show='isShow'>你好啊！</h1>
      </transition>
      ```











## Vue配置代理



**方式一**

在`vue.config.js` 中添加如下配置 （https://cli.vuejs.org/zh/config/#devserver）

```js
module.exports = {
  devServer: {
    proxy: 'http://localhost:8080'  // 代理的端口 
  }
}
```

说明 ： 

1. 优点 ： 配置简单， 请求资源时， 直接发给前端 8080 即可
2. 缺点： 不能配置多个代理，不能灵活的控制请求是否走代理 
3. 工作方式 ： 若按照上述配置请求了代理， 当请求了前端不存在的资源时， 那么该请求就会转发给服务器（优先匹配给前端资源）



**方式二**

在`vue.config.js` 中添加如下配置 （https://cli.vuejs.org/zh/config/#devserver）

```js
module.exports = {
  devServer: {
      proxy: {
          '/api': { // 匹配 所以 以 `/api` 开头的请求路径 
              target: 'http://localhost:8080', // 代理目标的基础路径
              ws: true, // 支持开启 WebSocks
              changeOrigin: true, // 请求的 host 请求ip 是否为反向代理的 
              pathRewrite: { '^/api': '' }, // 路径重写； 匹配以api开头的路径，重写为 '' 空  
          },
      }
  }
}
```

1. 优点 ： 可以配置多个代理，而且可以灵活控制请求是否走代理，
2. 缺点： 配置略为繁琐， 请求资源时必须加前缀







## github Search案例

实现内容

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211030115249.png" alt="image-20211030115234511" style="zoom:50%;" />



分析 ：可分为两个单个组件 ：  Search    List   

search 发送请求获取数据，  List负责接收数据，数据渲染  ， 涉及到， 两个单个组件中的数据间通信和 axios 请求 



写一个  axios请求 

```js
import axios from 'axios';

// 使用
axios.get(`url ${参数}`).then(
	response => {},  // 请求成功
    error => {}   // 请求失败
)
```



**实现代码 ：** 

*Search.vue*

```js
methods: { 
    searchUser() {
        
       // 使用全局事件总线  $bus 
        // 正在加载中 
        this.$bus.$emit('getUsers',{isFirst:false, isLoading: true, errorMsg: '', users: []})
        // 请求数据 
        axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
            response => {
                // 请求成功时 
                this.$bus.$emit('getUsers',{ isLoading: false, errorMsg: '', users:response.data.items})
            },
            error => {
                // 请求失败时 
                this.$bus.$emit('getUsers',{isLoading: false, errorMsg: error.message, users: []})
            }
        )
    }
}
```





*List.vue*

```vue
<template>
    <div class="row">
        <!-- 初始化页面  -->
        <div class="card"
            v-show='info.users.length' 
            v-for='user in info.users' 
            :key="user.login"
        >
            <a :href="user.html_url" target="_blank">
            <img :src="user.avatar_url" style='width: 100px' id='avatar_url' />
            </a>
            <p class="card-text">{{user.login}}</p>
        </div>
        <!-- 欢迎词 -->
        <h2 v-show='info.isFirst'>欢迎使用</h2>

        <!-- 加载页面  -->
        <h2 v-show='info.isLoading'>加载中 。。。。。。。。</h2>

        <!-- 错误页面 -->
        <h2 v-show="info.errorMsg">{{info.errorMsg}}</h2>
    </div>
</template>

<script>
    export default {
        name: 'List',
        data() { 
            return {
                info: {
                    isFirst: true,
                    isLoading: false,
                    errorMsg: '',
                    users: [],
                }
            }
        },
        
        // 使用全局事件总线，接收兄弟间的数据  
        mounted() { 
            this.$bus.$on('getUsers',(infoObj) => {
                // {...this.info, ...infoObj} ， 合并对象，
                this.info = {...this.info, ...infoObj}
                console.log(this)
            })
        }
    }
</script>

```





### vue-resource 发送请求 

`vue-resource` :  发送请求库，在vue 1.0版本用的比较多 ，目前使用最多的是 axios ， 需要了解一下 vue-resource ,  

安装 ：  `npm install vue-resource`

 在`main.js` 中引入(插件进入和使用方法) ： `import   vueResource  from  'vue-resource'` 使用 ：  `Vue.user(vueResource)`   ；  在所有的 vm 或者 vc 身上都多出了一个 `$http `

组件中使用 ： `this.$http.get()  |  this.$http.post()`









##  Vue插槽



### 默认插槽

// 在组件中定义默认插槽

```vue
<template>
        <!-- 定义一个插槽，等着组件使用者 写数据进行填充   slot -->
        <slot>默认插槽里可以定义默认内容，当没有使用该插槽时候，会显示默认的内容</slot>
</template>
```



// 使用插槽 

```vue
<template> 
        <Category  title='美食' > 
            <!-- 提供数据给插槽   <slot /> -->
            <img src="./assets/logo.png" alt="">
        </Category>
</template>
```



### 具名插槽

// 定义具名插槽 

```vue
<template>
        <!-- 定义一个插槽，等着组件使用者 写数据进行填充   slot -->
        <!-- 具名插槽 -->
        <slot  name="content"></slot>
        <slot name="footer"></slot>
</template>
```



// 使用具名插槽

```vue
<template> 
        <Category  title='美食' > 
            <!-- 使用 具名插槽 slot='content'  -->
            <img slot='content' src="./assets/logo.png" alt="">
            <a  slot='footer' href="#">更多美食</a>
        </Category>
</template>
```



### 作用域插槽

理解 ： 数据在组件自身，但是根据数据生成的结构需要组件的使用者来决定。 (games数据在Category组件中， 但使用数据所遍历出来的结构由 App组件来决定)



作用域插槽，当数据没有在使用组件者里 时，可以使用作用域插槽进行数据的传输，改变使用相同组件，不同的样式 



// 子组件中

```vue
<template>
    <div class="category">
        <!-- 数据在单个组件中，给组件的复用者，使用作用域插槽 -->
        <!--  传值方式 ： :games='games' -->
        <slot :games='games'></slot>
    </div>
</template>

<script>
    export default {
        name: 'Category',
        props: ['title'],
        data() {
            return {
                games: ['游戏1','游戏2 ','游戏3','游戏4'],
            }
        }
    }
</script>
```



// 父组件中 

```vue
<template> 
    <div class="container">
        
        <!-- 作用域插槽，当数据没有在使用组件者里 时，可以使用作用域插槽进行
            数据的传输，改变使用相同组件，不同的样式  -->
        <Category  title='游戏'> 
            
            <!-- 接收数据，必须要使用template标签和 slot-scope属性接收 -->
            <template slot-scope='info'>
                <ul>
                    <li v-for='(g, index) in info.games' :key="index">{{g}}</li>
                </ul>
                <!-- {{info}}  接收到的 info 是一个数据对象 
                    { "games": [ "游戏1", "游戏2 ", "游戏3", "游戏4" ] }
                -->
            </template>
        </Category>
    </div>  
</template>
```









### 总结 

作用 ： 让父组件可以向子组件指定的位置插入 **html** 结构， 也是一种组件间的通信方式 ， 适用于  父组件==> 子组件 

分类  ：  默认插槽、 具名插槽 、 作用域插槽 

使用方式 ： 

1. 默认插槽 ： 

   ```html
   //父组件中 
       <Category  title='游戏'> 
   		<div>HTML结构</div>
       </Category>
   
   // 子组件中 
   	<template>
           <div class="category">
               <h3>{{title}}分类</h3>
               <!-- 定义插槽 -->
               <slot>插槽默认内容</slot>
           </div>
   	</template>
   ```

2. 具名插槽 

   ```html
   //父组件中 
           <Category  title='美食' > 
               <!-- 使用 具名插槽 时带上名字  slot='content' -->
               <img slot='content' src="./assets/logo.png" alt="">
               <a  slot='footer' href="#">更多美食</a>
           </Category>
   
   
   // 子组件中 
   <template>
       <div class="category">
           <h3>{{title}}分类</h3>
           <!-- 具名插槽 name="content" -->
           <slot  name="content"></slot>
           <slot name="footer"></slot>
       </div>
   </template>
   ```

3. 作用域插槽

   理解 ： 数据在组件自身，但是根据数据生成的结构需要组件的使用者来决定。 (games数据在Category组件中， 但使用数据所遍历出来的结构由 App组件来决定)

   ```html
   // 父组件中
   <Category  title='游戏'> 
       <!-- 接收数据，必须要使用template标签和 slot-scope属性接收 -->
       <template slot-scope='info'>
           <ul>
               <li v-for='(g, index) in info.games' :key="index">{{g}}</li>
           </ul>
           <!-- {{info}}  接收到的 info 是一个数据对象 
   { "games": [ "游戏1", "游戏2 ", "游戏3", "游戏4" ] }
   -->
       </template>
   </Category>
   
   <Category  title='游戏'> 
       <!-- 接收数据，必须要使用template标签和 slot-scope属性接收 -->
       <template slot-scope='info'>
           <ol>
               <li v-for='(g, index) in info.games' :key="index">{{g}}</li>
           </ol>
           <!-- {{info}}  接收到的 info 是一个数据对象 
   { "games": [ "游戏1", "游戏2 ", "游戏3", "游戏4" ] }
   -->
       </template>
   </Category>
   
   // 子组件中 
   
   <template>
       <div class="category">
           <h3>{{title}}分类</h3>
           <!-- 数据在单个组件中，给组件的复用者，使用作用域插槽 -->
           <!--  传值方式 ： :games='games' -->
           <slot :games='games'></slot>
       </div>
   </template>
   
   <script>
       export default {
           name: 'Category',
           props: ['title'],
           data() {
               return {
                   games: ['游戏1','游戏2 ','游戏3','游戏4'],
               }
           }
       }
   </script>
   ```











## Vuex



官网 ： https://vuex.vuejs.org/zh/

概念 ： 在vue中实现集中式状态（数据） 管理的一个Vue插件，对Vue应用中多个组件共享状态进行集中式的管理 （读写） ， 也是一种组件间的通信方式 ，适合用于任意间的组件通信 



**何时使用** :  当多个组件需要共享数据时





### Vuex 工作原理

![vuex](https://vuex.vuejs.org/vuex.png)

分析 ：  Vuex主要的核心功能为 `state` `actions` `mutations`  ,  它们之间通信使用了的api有 `dispatch`  `commit`   。   `state` 用于存放数据的 ，  `actions`  用于处理逻辑 和 接受网络上传输的参数，或者vc提供的参数 ，  `mutations` 用于对数据加工，然后返回给 `state` 的 。

  在图中 `actions` 上方的 `backend API` 是表示`actions` 接收到的数据不仅仅是vc通过`dispatch` 提供的， 也可以是由 `backend API` 通过网络请求返回得到的数据 。

`mutations` 旁边的 `Devtools` 表示 vue提供的插件，调试工具 



Vuex工作流程 ：  需要建立文件 `/store/store.js`    因为vc引入Vuex后 会多出`$store` ， `store` 相当于Vuex的组件，使用Vuex的Api都要经过 `$store`。  在 `store.js` 中需要定义三个对象，也就是Vuex中的三个核心部分 ： `actions` `mutations`   `state`  。 然后在 `main.js` 中引入 `store.js` 文件，添加`store` 到vm中 







### 搭建Vuex环境 

1. 安装 : `npm  install vuex `

2. 创建 :  `src/store/index.js` 

   ```js
   // 引入Vue核心库
   import Vue from 'vue';
   
   // 引入  Vuex 
   import Vuex from 'vuex';
   
   // 应用 Vuex 
   Vue.use(Vuex)
   
   // 准备好 actions 对象  --- 相应组件中用户的动作 
   const actions = {}
   
   // 准备好 mutations  对象， 修改 store 中的数据 
   const mutations = {}
   
   // 准备好一个 state 对象 ， 用于保存具体的数据
   const state = {}
   
   // 创建Store ：Vuex.Store({})  并暴露 Store
   export default new Vuex.Store({
       // 当 key 和 value 同名时，使用简写
       actions,
       mutations,
       state
   })
   ```

3. 在 `main.js`中引入`store`

   ```js
   import Vue from 'vue'
   import App from './App.vue'
   
   Vue.config.productionTip = false
   
   // 引入 Store 
   import store from './store/index'
   
   //创建VM 
   new Vue({
       el: '#app',
       render: h => h(App),
       beforeCreate() {
           Vue.prototype.$bus = this
       },
   
       // 使用 Vue中的Store 
       store, // 引入 store 
   });
   ```

4. 在组件中查看 `store` 

   ```js
   mounted() {
       console.log(this)
   }
   ```

   <img src="https://gitee.com/yunhai0644/imghub/raw/master/20211031142945.png" alt="image-20211031142930879" style="zoom:50%;" />







### 基本使用 

1. 初始化数据， 配置 `actions`   配置`mutations`  操作文件 `store.js` 

   `store.js`

   ```js
   // 引入Vue核心库
   import Vue from 'vue';
   
   // 引入  Vuex 
   import Vuex from 'vuex';
   
   // 应用 Vuex 
   Vue.use(Vuex)
   
   // 准备好 actions 对象  --- 相应组件中用户的动作 
   const actions = {
   	// 相应组件中的动作 
       incrementOdd(context, value) {
           if (context.state.sum % 2) {
               context.commit('INCREMENTODD', value)
           }
       },
       incrementWite(context, value) {
           setTimeout(() => {
               context.commit('INCREMENTWite', value)
           }, 500)
       }
   }
   
   // 准备好 mutations  对象， 修改 store 中的数据 
   const mutations = {
       INCREMENT(state, value) { // 收到的是 state中的sum的数据对象具有getter/setter方法， 和actions传过来的 value 
           // console.log('mutations 收到的参数 ：', store, value);
           state.sum += value;
       },
       DECREMENT(state, value) {
           state.sum -= value
       },
       INCREMENTODD(state, value) {
           state.sum += value
       },
       INCREMENTWite(state, value) {
           state.sum += value
       }
   }
   
   // 准备好一个 state 对象 ， 用于保存具体的数据
   const state = {
       sum: 0
   }
   
   // 创建Store ：Vuex.Store({})  并暴露 Store
   export default new Vuex.Store({
       // 当 key 和 value 同名时，使用简写
       actions,
       mutations,
       state
   })
   ```

    `Count.vue`

   ```vue
   <script>
       methods: {
               // 使用 this.$store.despatch() 使用方法 increment，并把 this.n 传递给 actions 中的increment  , 或者直接使用 commit 越过 actions，直接把数据给 mutations
               increment() {
                   this.$store.commit('INCREMENT',this.n)
               },
               decrement(){
                   this.$store.commit('DECREMENT',this.n)
               },
               incrementOdd() {
                   this.$store.dispatch('incrementOdd',this.n)
               },
               incrementWite() {
                   this.$store.dispatch('incrementWite',this.n)
               }
           },
   </script>
   ```

   

2. 组件中读取 vuex 中的数据  ： `$store.state.sum`  

3. 组件中修改vuex中的数据 ： `$store.dispatch('actions中的方法名',数据)`  或 `$store.commit('mutations中的方法名',数据)` 

4. 备注 ： 若没有发送网络请求或者其他业务逻辑， 组件中也可以越过actions,  即不写 `dispatch` 直接写 `commit` 





### getters 的基本使用 

1. 概念 ：当state中的数据需要经过加工后再使用时， 可以通过 getters 对state 中的数据进行加工 

2. 在 `store.js` 中 追加`getters` 配置 

   ```js
   ... 
   // 准备好一个 getters 对象 ， 用于对数据的加工 
   const getters = {
       // 定义 bigSum 
       bigSum(state) {
           return state.sum * 10
       }
   }
   export default new Vuex.Store({
       ... 
       getters, // 配置getters 
   })
   ```

3. 在组件中读取getters 的数据  : `$store.getters.bigSum` 





### Vuex中四个map方法的使用 



#### mapSrate 和 mapGetter

当页面上展示出更多的 state 的数据 ，和 getter 数据时, 出现的问题 ：  `$store.state.sum `不符合 简单的模板语法

解决问题方法 ： 1. 通过计算属性 `computed` 简写函数 2. 通过Vuex中的`mapState `和 `mapGetter`方法进行简写 



*Count.vue*

```vue
<template>
	<h1>当前的求和为: {{$store.state.sum}}</h1>
</template>

<script>
    // 引入 mapStatr, 和 mapGetters 
    import {mapState, mapGetters} from 'vuex';
    export default {
        computed: {
            // 直接使用计算属性进行简写， 只能能在模板中简写的，但是计算属性中还是有点复杂
            // sum() {
            //     return this.$store.state.sum
            // },
            // name() {
            //     return this.$store.state.name
            // },
            // age() {
            //     return this.$store.state.age
            // },

            // 使用 mapState 方法 （对象式） 
            // 使用  ...mapState() 是ES6中 对象中，写入多个对象使用 ... 映射 
            // ...mapState({'sum':'sum', 'name': 'name', 'age':'age',}),

            // 使用 mapState 方法 （数组式）
            // 数组式，必须式定义映射的变量名 必须要和 state中的变量名一致
            ...mapState(['sum', 'name', 'age']), 

            // 计算属性的写法
            // bigSum() {
            //     return this.$store.getters.bigSum
            // }
            
            
            // 使用 ...mapGetters()
            // 对象式 {} 
            // ...mapGetters({'bigSum':'bigSum'}),

            //数组式 
            ...mapGetters(['bigSum'])
        },
        //生命周期钩子
        mounted() {
            // console.log(this.$store)
            //查看 mapState  和 mapGetters 
            const test  = mapState({'sum':'sum', 'name': 'name', 'age':'age',})
            // console.log(test) 
            // 返回的是 sum name age 的函数 ，只需把这个方法写到计算属性中就行
        }
    }
</script>
```







####  mapActions 和 mapMutations

`mapActions`和 `mapMutations` 一般用于在 `methods` 方法中使用

没有使用 map方法前 

```js
methods: {
            increment() {
                this.$store.commit('INCREMENT',this.n)
            },
            decrement(){
                this.$store.commit('DECREMENT',this.n)
            },
            incrementOdd() {
                this.$store.dispatch('incrementOdd',this.n)
            },
            incrementWite() {
                this.$store.dispatch('incrementWite',this.n)
            }
        },
```



当`$store `使用 commit时， 也可使用 Vuex提供的map 进行简写因为commit是和 Mutations 进行对话的，使用 mapMutations() 能够简写` $store.commit() `





```js
methods: {
        // 当$store 使用 commit时， 也可使用 Vuex提供的map 进行简写 
        // 因为commit是和 Mutations 进行对话的，使用 mapMutations() 能够简写 $store.commit() 

        // 使用 mapMutations() 传参必须要写在模板中， 不然在mutations中的INCREMENT收到的是 evtent ，而不是参数
    	// ...mapMutations({'INCREMENT':'INCREMENT'}),  // 对象式 

    	...mapMutations(['INCREMENT']),  // 数组式 

        // 同理 
        // ...mapMutations({'decrement':'DECREMENT'}),  // 对象式
        // key 要和模板中的事件一致， value 需要和 mutations 中的方法一致

        ...mapMutations(['DECREMENT']),  // 模板中使用的方法名要一致才能使用数组式简写


        // *************************************** **
        // dispatch 使用  mapActions() 

        // 使用 mapActions() 对使用 $store.dispatch() 方法进行简写 , 
        // 使用方法和上边一样, mapActions()直接跟actions进行对话

        // ...mapActions({'incrementOdd':'incrementOdd'}), // 对象式
        ...mapActions(['incrementOdd']),  // 数组式 

        // ...mapActions({'incrementWite':'incrementWite'}),
        ...mapActions(['incrementWite']),  // 数组式
},
```

使用 mapMutations()  和 mapActions() 传参必须要写在模板中， 不然在mutations中的INCREMENT收到的是 evtent ，而不是参数

```html
<button  @click='INCREMENT(n)'>+</button>
<button @click='DECREMENT(n)'>-</button>
<button @click='incrementOdd(n)'>当前求和为奇数再加</button>
<button @click='incrementWite(n)'>等一等再加</button>
```









#### 总结

1. `mapState` 方法 ： 用于帮助我们映射 `state` 中的数据为计算属性 

   ```js
   computed: {
       // 使用 mapState 方法 （对象式） 
       // 使用  ...mapState() 是ES6中 对象中，写入多个对象使用 ... 映射 
      	...mapState({'sum':'sum', 'name': 'name', 'age':'age',}),
   
       // 使用 mapState 方法 （数组式）
       // 数组式，必须式定义映射的变量名 必须要和 state中的变量名一致
       ...mapState(['sum', 'name', 'age']), 
   },
   ```

2. `mapGetters` 方法 ： 用于帮助我们映射 `getters` 中的数据为计算属性 

   ```js
   computed: {
       // 对象式 {} 
       ...mapGetters({'bigSum':'bigSum'}),
   
       //数组式 
       ...mapGetters(['bigSum'])
   } 
   ```

3. `mapActions` 方法 :  用于帮助我们生成与 `actions` 对话的方法， 即： 包含 `$store.dispatch(xxx)` 的函数

   ```js
   methods: {
       ...mapActions({'incrementWite':'incrementWite'}),  // 对象式
       ...mapActions(['incrementWite']),  // 数组式
   }
   ```

   

4. `mapMutations` 方法 ： 用于帮助我们生成与 `mutations` 对话的方法， 即： 包含 `$store.commit(xxx)` 的函数

   ```js
   methods: {
      	...mapMutations({'INCREMENT':'INCREMENT'}),  // 对象式 
   
       ...mapMutations(['INCREMENT']),  // 数组式 
   }
   ```

备注： mapActions 与 mapMutations 使用时， 若需要传递参数需要： 在模板中绑定事件时传递好参数，否则参数是事件对象 





### Vuex实现数据共享

实现过程 ： 把需要共享的数据放在`vuex`中的 `state` 中， 让两方组件都能使用 `this.$store.stare.xxx` 能够访问到数据，组件中逻辑引起 `state` 中的数据发生变化， 另一方的定义的数据也会发生变化 



//`index.js `  定义vuex中的数据 

```js
// 准备好一个 state 对象 ， 用于保存具体的数据
const state = {
    sum: 0,   // 需要共享的数据 
    name: 'Yellowsea',
    age: 20,
    
    // 让person组件显示数据
    personList: [{ id: '001', name: '张三' }]
}

```



// `person.vue` 中 

```vue
<template>
    <div>
        <h2>人员列表</h2>
        // 在 Person组件中使用 Cont组件的 sum 数据
        <h3 style='color: red'>Count组件中的sum为: {{sum}}</h3>
        <input type="text" placeholder="请输入人员信息" v-model='name'> 
        <button @click='Add'>添加</button>
        <ul>
            <li v-for='p in personList' :key="p.id">{{p.name}}</li>
        </ul>
    </div>
</template>
<script>
    ...
        computed: {
            // 获取到 state 中 personList的数据 
            // personList() {
            //     return this.$store.state.personList
            // },

            // 也可以使用 map 定义 
            ...mapState({'personList':'personList'}),   // 获取personList
                
            // sum() {
            //     return this.$store.state.sum
            // }
            ...mapState({'sum':'sum'})   // 获取sum 
        },
        methods: {
            Add() {
                const personObj = {
                    "id": nanoid(),
                    "name": this.name
                }
                this.name = '',
                // 使用 mapMutations 
                this.$store.commit('Add_Person',personObj)  // 提交数据给 mutations
            }
        }
    }
</script>
```



// `Count.vue`

```vue
<template>
    <div>
        <h1>当前的求和为: {{sum}}</h1>
        <h1>当前的求和放大10倍为: {{bigSum}}</h1>
        <h2>学生姓名是 : {{name}}, 年龄是  {{age}}</h2>
        <!-- 共享的数据 personList -->
        <ul style='color: red'>
            <li v-for='p in personList' :key="p.id">{{p.name}}</li>
        </ul>
        <select v-model.number="n" >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <button  @click='INCREMENT(n)'>+</button>
        <button @click='DECREMENT(n)'>-</button>
        <button @click='incrementOdd(n)'>当前求和为奇数再加</button>
        <button @click='incrementWite(n)'>等一等再加</button>
    </div>
</template>
<script>
    import {mapState, mapGetters,mapMutations,mapActions} from 'vuex';
		...
        computed: {
            ...mapState(['sum', 'name', 'age','personList']),   // 读取需要共享的personList 
            ...mapGetters(['bigSum'])
        },
        methods: {
            ...mapMutations(['INCREMENT']),  
            ...mapMutations(['DECREMENT']),  
            ...mapActions(['incrementOdd']),  
            ...mapActions(['incrementWite']),
        },
    }
</script>
```



//Person添加数据时调用的 `mutations() ` 方法 

```js
Add_Person(state, value) {  // state vuex中的state, value person中传过来的 value 
    state.personList.unshift(value) // 添加数据 
}
```

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211102125742.png" alt="image-20211102125729301" style="zoom:50%;" />





### Vuex 模块化  `namespace`

模块化和命名空间 ： 在 `store` 定义的关于组件的数据，可以机型分开 ，各自具有各自的 方法

//`index.js`

```js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
// Count 组件相关的数据对象 
const countAbout = {
    namespaced: true,
    state: {
        sum: 0,
        name: 'Yellowsea',
        age: 20,
    },
    actions: {
        incrementOdd(context, value) {
            if (context.state.sum % 2) {
                context.commit('INCREMENTODD', value)
            }
        },
        incrementWite(context, value) {
            setTimeout(() => {
                context.commit('INCREMENTWite', value)
            }, 500)
        }
    },
    mutations: {
        INCREMENT(state, value) {
            state.sum += value;
        },
        DECREMENT(state, value) {
            state.sum -= value
        },
        INCREMENTODD(state, value) {
            state.sum += value
        },
        INCREMENTWite(state, value) {
            state.sum += value
        },
    },
    getters: {
        bigSum(state) {
            return state.sum * 10
        }
    },
}
// person组件相关的数据 
const personAbout = {
    namespaced: true,
    state: {
        personList: [{ id: '001', name: '张三' }]
    },
    actions: {},
    mutations: {
        Add_Person(state, value) {
            state.personList.unshift(value) // 添加数据 
        }
    },
    getters: {},
}

export default new Vuex.Store({
    // 在Vuex.$store 中使用 模块 modules 
    modules: {
        // 导入定义的模块 
        countAbout,
        personAbout,
    }
})
```

// 查看组件中的 `this`  出现的方法     `$store.state` 中 出现了这两个模块 

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211102145921.png" alt="image-20211102145916781" style="zoom:50%;" />



**在组件中获取到模块中的数据** 

 // `Count.vue` 中 

```js
    computed: {

        // 使用 模块化命名空间时， 用mpa时候，获取模板数据中的方法 
        //  ...mapState('模板名',['获取的数据']),  

        ...mapState('countAbout',['sum', 'name', 'age',]),  
            ...mapState('personAbout',['personList']),  // 这个是 person中的共享数据 
            ...mapGetters('countAbout',['bigSum'])
    },
    methods: {
                // 使用模板中的方法 
                //  ...mapMutations('模板名',{'方法名':'方法名'}), 
        	...mapMutations('countAbout',{'INCREMENT':'INCREMENT'}), 
            ...mapMutations('countAbout',{"DECREMENT":'DECREMENT'}), 
            ...mapActions('countAbout',{'incrementOdd':"incrementOdd"}), 
            ...mapActions('countAbout',{'incrementWite':'incrementWite'}), 
    },
```



//`pseron.vue` 中 

```js
    computed: {
            // 由自己写的获取数据， 在使用模块化和命名空间时候 的获取数据 
   			//使用方法 ：  this.$store.state.模块名.state中的数据
            personList() {
                return this.$store.state.personAbout.personList
            },
            sum() {
                return this.$store.state.countAbout.sum
            },
             // getter
            firstPersonName() {
                // 自己写的计算属性获取 getters中的数据 比较特殊 是使用 [模块名/数据] 获取 
                return this.$store.getters['personAbout/firstPersonName']
            }
        },
        methods: {
            Add() {
                const personObj = {
                    "id": nanoid(),
                    "name": this.name
                }
                this.name = '',
                    // 提交数据给 mutations
                    // 使用 commit :  this.$store.commit('模块名/mutations中的方法,传输的数据) 
                this.$store.commit('personAbout/Add_Person',personObj) 
            },
            AddWang() {
                const personObj = {
                    "id": nanoid(),
                    "name": this.name
                }
                this.name = '', 
                // 提交数据给 mutations
               // this.$store.dispatch('模块名/actons中的方法',需要传输的数据) 
                this.$store.dispatch('personAbout/AddWang',personObj) 
            },
            // 网络请求 
            addMsg() {
                this.$store.dispatch('personAbout/addMsg')
            }
        },
```

// `index.js`

```js
import Vue from 'vue';
import Vuex from 'vuex';
import countAbout from './count';
import personAbout from './person';
Vue.use(Vuex)
export default new Vuex.Store({
    // 在Vuex.$store 中使用 模块
    modules: {
        countAbout,
        personAbout,
    }
})
```





// 将index.js 中的模块分割为单个文件 , 并且保留，在 index.js 中引入 

`count.js` 

```js
// Count 组件相关的数据对象 
export default { // export default 
    namespaced: true,
	...
}
```

// `person.js`

```js
// person组件相关的数据 
import axios from 'axios';
import { nanoid } from 'nanoid';
export default {
    namespaced: true,
    actions: {
        // 处理逻辑 
        AddWang(context, value) {
            if (value.name.indexOf('王') === 0) {
                context.commit('Add_Person', value);
            } else {
                alert('要求姓王')
            }
        },
        // 使用 api 返回的数据 
        addMsg(context) {
            axios.get('https://autumnfish.cn/api/joke').then(
                response => {
                    context.commit('Add_Person', { id: nanoid(), name: response.data })
                    console.log(response.data)
                },
                error => {
                    console.log(error.message)
                })
        }
    },
    getters: {
        firstPersonName(state) {
            return state.personList[0].name
        }
    },
    ... // 省略以下
}
```





#### Vuex模块化 + 命名空间总结

1. 目的： 让代码更好维护， 让数据分类更加明确 

2. 修改 ： `store.js`

   ```js
   const counAbout = {
       namespaced: true, // 开启命名空间 
       state: {},
       actions: {},
       mutations: {},
       getters: {}
   }
   
   const personAbout = {
       namespaced: true, // 开启命名空间 
       state: {},
       actions: {},
       mutations: {},
       getters: {}
   }
   
   export default new Vuex.Store({
       modules: {
           counAbout,
           personAbout
       }
   })
   ```

3. 开启命名空间后， 组件中读取 state 数据 

   ```js
   // 方式一 
   this.$store.state.personAbout.personList
   // 方式二 使用了 mapState模块 
   ...mapState('countAbout',['sum','name','age'])
   ```

4. 开启命名空间后， 组件中读取 getter数据 

   ```js
   // 方式一 
   this.$store.getter['personAbout/personList']
   // 方式二 
   ...mapGetter('countAbout',['bigSum'])
   ```

5. 开启命名空间后， 组件中调用 dispatch  

   ```js
   // 方式一 
   this.$store.dispatch('personAbout/AddWang',personObj)  // 提交数据给 actions
   // 方式二 
   ...mapActions('countAbout',{'incrementOdd':"incrementOdd"}), 
   ```

6. 开启命名空间后， 组件中调用 commit

   ```js
   //方式一 
   this.$store.commit('personAbout/Add_Person',personObj)  // 提交数据给 mutations
   //方式二 
   ...mapMutations('countAbout',{"DECREMENT":'DECREMENT'}), 
   ```











## Vue路由 



### 认识Vue中的路由

`vue-router `理解  ： vue的一个插件库， 专门用来实现SPA应用 

SPA应用 ： 

- 单页 Web应用 
- 整个应用只有一个完整的页面 
- 点击页面的导航链接不会 **刷新** 页面， 只会做页面的局部更新  
- 数据需要通过 ajax请求获取 

路由的理解 ： 

- 什么是路由 ： 一个路由就是一组映射关系  (key  ---- value) 
- key 为路径  ， value 可能是 function 或  component 

路由的分类 ： 

- 后端路由 ： 
  - 理解 ： value 是 function, 用于处理客户端提交的请求 
  - 工作过程 ： 服务器接收到一个请求时， 根据请求路径找到匹配的函数来处理请求，返回响应数据
- 前端路由 ： 
  - 理解 ： value 是 component , 用于展示页面内容  
  - 工作过程： 当浏览器的路径改变时， 对应的组件就会展示





<img src="../../AppData/Roaming/Typora/typora-user-images/image-20211102220931710.png" alt="image-20211102220931710" style="zoom:50%;" />



### 路由的基本使用

1. 安装`vue-router`  :  `npm install vue-router`

2. 引入 ： `import VueRouter from 'vue-router'`

3. 应用插件 ：  `Vue.use(VueRouter)`

   1. 编写router配置项 : 创建 `/src/router/index.js`

   ```js
   // 该文件专门用于创建整个应用的 路由器
   import VueRouter from 'vue-router';
   //引入组件
   import About from '../components/About'
   import Home from '../components/Home'
   // 创建一个路由器， 并暴露出去 
   export default new VueRouter({
       // 路由的对象
       // 匹配的路径   注意这里 ： routes 而不是 routers 
       routes: [{ 
               path: '/about',    //路由匹配的路径
               component: About	// 展示的组件 
           },
           {
               path: '/home',  
               component: Home
           }
       ]
   })
   ```

4. 实现切换（active-class可配置高亮样式） 

   ```vue
   <template>
   	<!-- 使用了路由的导航区  -->
       <!-- 
       router-link  ：vue-router 中提供的标签 ， 用于处理路由的导航区
       to="/about" : url路径后的样子 
       active-class='active'   表示该元素被激活时候的样式 
       原生样式保持不变 
       -->
   	<!-- Vue借助 router-link 标签实现路由的切换  -->
       <router-link 
           class="list-group-item" 
           active-class="active" 
           to="/about">About
       </router-link>
   </template>
   ```

5. 指定展示位置 

   ```vue
   <!--router-view  指定组件的呈现位置  --> 
   <router-view></router-view>
   ```

   



