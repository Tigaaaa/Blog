export default function(speed,fn){
    let timer=null;
    let isFst=true;

    return function(...args){
        clearTimeout(timer);
        if(isFst){
            fn.call(this,...args);
            isFst=false;
            timer=setTimeout(()=>{isFst=true;}, speed);
        }else{
            timer=setTimeout(()=>{
                fn.call(this,...args);
                isFst=true;
            }, speed);
        }
    }
}