

function debounce(func, wait) {
    let timer = null;
    return function () {
        let context = this; //函数执行上下文；
        let args = arguments; //获取函数的参数；

        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            func.apply(context, args);
        }, wait)
    }
}