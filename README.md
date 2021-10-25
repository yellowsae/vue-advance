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











