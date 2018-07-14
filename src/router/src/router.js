function Router() {
// 路由储存
    this.routes = {};
// 当前路由
    this.currentUrl = '';
}
Router.prototype = {
// 路由处理
    route: function (path, callback) {
        this.routes[path] = callback || function(){};
    },
// 页面刷新
    refresh: function () {
// 当前的hash值
        this.currentUrl = location.hash.slice(1) || '/';
// 执行hash值改变后相对应的回调函数
        this.routes[this.currentUrl]();
    },
// 页面初始化
    init: function () {
// 页面加载事件
        window.addEventListener('load', this.refresh.bind(this), false);
// hash 值改变事件
        window.addEventListener('hashchange', this.refresh.bind(this), false);
    }
}