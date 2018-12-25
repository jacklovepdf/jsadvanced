
async function chainAnimationsAsync(elem, animations) {
    let ret = null;
    try {
      for(let anim of animations) {
          console.log("before 111")
        ret = await anim(elem);
        console.log("after 111 ret", ret);
      }
    } catch(e) {
      /* 忽略错误，继续执行 */
    }
    return ret;
  }
  let animations = [];
  animations[0] = function(){
      return new Promise((resolve, reject) => {
          console.log("animations[0]");
          setTimeout(function(){
              console.log("animations[0] after");
              resolve(0)
          }, 0)
      })
  }
  
  animations[1] = function(){
      return new Promise((resolve, reject) => {
          console.log("animations[0]");
          setTimeout(function(){
              console.log("animations[0] after");
              resolve(1)
          }, 0)
      })
  }
  
  chainAnimationsAsync(1, animations);