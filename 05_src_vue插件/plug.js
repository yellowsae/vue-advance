export default {
    install(Vue) {
        // 1. 过滤器 
        Vue.filter('MySlice', function(value) {
            return value.slice(0, 4);
        });


        //2. 添加全局指令 
        Vue.directive('fbind', {
            bind(element, binding) {
                element.value = binding.value;
            },
            // 指令所在元素被插入页面时调用
            inserted(element) {
                element.focus();
            },
            update(element) {
                element.focus();
            }

        });

        //3. 混合mixin
        Vue.mixin({
            data() {
                return {
                    x: 1,
                    y: 2
                }
            },
        });

        Vue.prototype.$showMsg = function() {
            alert('这是myMethod');
        };

        Vue.prototype.$myProperty = "你好Yellowsea";
    }
}