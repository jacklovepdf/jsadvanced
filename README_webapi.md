1. location, history, Navigator and hash

1.1 关于location
    用于获取当前页面的地址以及将客户端重定向到新的页面；

    window.location.href returns the href (URL) of the current page
    window.location.hostname returns the domain name of the web host
    window.location.pathname returns the path and filename of the current page
    window.location.protocol returns the web protocol used (http: or https:)
    The window.location.port property returns the number of the internet host port
    The window.location.assign() method loads a new document.


1.2 关于history
    用于控制浏览器的会话历史;

    (1)属性--标准
    length: 返回一个整数，代表会话历史记录中的记录条数；
    state:  返回历史会话栈栈顶的会话状态；


    (2)方法
    back():      返回到会话历史中前一个页面；
    forward():   去往会话历史中下一个页面；
    go():        Loads a page from the session history, identified by its relative location to the current page；
    pushState(stateObj, title, url): 可以有三个参数，第一个参数（js object）是来存储与pushState()所创建的新的历史会话相关联的状态数据;第二个通常为null;第三个参数url为新的历史记录的url,
                需要注意的是pushState之后，浏览器不会去加载新的URL，当然有可能会在后面加载这个URL，比如浏览器此时重启了；
    replaceState(): 参数和pushState相同，不同点在于replaceState不会创建新的历史会话，而是修改当前历史会话的状态信息或者是URL信息；

    (3)事件
    popstate： 每次历史会话发生改变的时候popstate事件会被派发到Windows窗口，如果历史会话的变化是由pushState或者replaceState激活的，popstate事件对象的state属性会携带历史会话状态对象的副本；
    注意目前发现popstate事件只有history.back方法会触发；


1.3 关于Navigator
    window.navigator接口用于表示用户代理（主要是浏览器和客户端）的状态和特性

    (1) 属性（这里只列出标准属性，不包括实验属性,使用之前进行特性测试，防止某些浏览器不支持）
    battery: 返回一个电池管理对象，对象包含充电状态的字段；
    cookieEnabled：是否启用cookie；
    geolocation: 获取设备的地理位置；
    hardwareConcurrency: 返回逻辑处理器的核数；
    onLine：返回当前用户代理是否在线；
    userAgent: 返回当前用户代理名字字符串;
    storage: 返回单例StorageManager对象，为当前站点或者app提供访问浏览器存储的能力；
    serviceWorker: 返回当前页面的ServiceWorkerContainer对象, 用于注册，移除，升级以及与ServiceWorker通信;
    oscpu: 返回当前操作系统

   （2）方法
    vibrate(time): Causes vibration on devices with support for it

1.4 关于hash
    对于单页应用来说，hash路由页面路由常用解决方案（当然history api也很常用），对于当前主流的前端框架来说，都提供了现成的方案来帮开发者做这件事；
下面是一个简单的实现；
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>router</title>
</head>
<body>
<ul>
    <li><a href="#/">mine</a></li>
    <li><a href="#/blue">detail</a></li>
    <li><a href="#/green">search</a></li>
</ul>
<script>
    function Router() {
        this.routes = {};
        this.currentUrl = '';
    }
    Router.prototype.route = function(path, callback) {
        this.routes[path] = callback || function(){};
    };
    Router.prototype.refresh = function() {
        this.currentUrl = location.hash.slice(1) || '/';
        this.routes[this.currentUrl]();
    };
    Router.prototype.init = function() {
        window.addEventListener('load', this.refresh.bind(this), false);
        window.addEventListener('hashchange', this.refresh.bind(this), false);
    };
    window.Router = new Router();
    window.Router.init();

    // register router
    Router.route('/', function() {
        // do sth
    });
    Router.route('/blue', function() {
        // do sth
    });
    Router.route('/green', function() {
        // do sth
    });
</script>
</body>
</html>
```



