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

1.3 关于Navigator



1.4 关于hash




