
function throttle(func, wait, options) {

    let timer = null;
    return function () { //返回节流之后的函数
        let context = this;
        let args = arguments;

        //第一次肯定执行，之后每隔指定时间执行一次，但是最后一次回调是否执行不能保证；
        if(timer){
            return ;
        }else {
            timer = setTimeout(function () {
                func.apply(context, args);
                timer = null; //清除定时器
            }, wait)
        }
    }
}

/*
* 需要完成通过时间戳来保证最后一次回调一定能够执行；
* */
function throttle1(func, wait, options) {

    let timer = null;
    return function () { //返回节流之后的函数
        let context = this;
        let args = arguments;

        //第一次肯定执行，之后每隔指定时间执行一次，但是最后一次回调是否执行不能保证；
        if(timer){
            return ;
        }else {
            timer = setTimeout(function () {
                func.apply(context, args);
                timer = null; //清除定时器
            }, wait)
        }
    }
}