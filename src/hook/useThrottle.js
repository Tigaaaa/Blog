export default function(speed,fn){
    let lastTime=0;

    return function throttle(...args){
        let nowTime=new Date().getTime();
        if(lastTime==0){
            fn.call(this,...args);
            lastTime=nowTime;
        }
        else if(nowTime-lastTime>=speed){
            lastTime=nowTime;
            fn.call(this,...args)
        }
        

    }
}