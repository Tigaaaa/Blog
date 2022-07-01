import {ref,reactive,toRefs} from 'vue'
import throttle from './useThrottle'

export default function(selectFn,limit,id){
    let myList=reactive({
        list:[],
        offset:0
    })
    let load=ref('下滑加载更多');
            
    //加载5个文章
    function selectList(){
    selectFn(myList.offset,limit,id)
    .then((res)=>{
        if(res.data.length==0)
            load.value='到底啦';
        else{
            myList.list.push(...res.data);
            myList.offset+=limit;
            load.value='下滑加载更多';
        }
        window.removeEventListener('mousewheel',down)
    })
    .catch((err)=>console.log(err));
    }
    
    //监听滚轮下滑的加载更多操作，节流
    let down=throttle(1000,function(e){
        if(e.deltaY>0){//上滚
            load.value='loading...';
            selectList();
        }else
            window.removeEventListener('mousewheel',down)
    });

    //监听列表滚动
    function onScroll(e){
        //console.log(e.target.scrollTop,e.target.scrollHeight,e.target.offsetHeight);
        if(e.target.scrollTop+e.target.offsetHeight+0.5>=e.target.scrollHeight){
            window.addEventListener('mousewheel',down)
        }
    }
    
    //初始化列表
    selectList();

    return {
        ...toRefs(myList),
        load,
        onScroll,
    }
}