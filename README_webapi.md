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
    state:  返回历史记录栈栈顶的记录；


    (2)方法
    back():      返回到会话历史中前一个页面；
    forward():   去往会话历史中下一个页面；
    go():        Loads a page from the session history, identified by its relative location to the current page；
    pushState(): ****
    replaceState():


1.3 关于Navigator



1.4 关于hash




