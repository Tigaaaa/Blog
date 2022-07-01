<template>
    <div class="warp">
        <ul class="com-list">
            <li class="comment" v-for="com in list" :key="com.commentId">
            {{com.userName+'：'+com.content}}</li>
        </ul>
        <div class="bot">{{load}}</div>
    </div>
    <div class="com-bottom" :class="{lock:isLock}">
        <div class="inp">
            <input v-model="newComment" placeholder="说点什么吧~" @focus="isLock=true" @blur="isLock=false">
        </div>
        <div class="com-bt" @click="postComment">发送</div>
    </div>
</template>

<script>
import {ref} from 'vue'
import {getCom,postCom} from '@/utils/api'
import {useStore} from 'vuex'
import useLoad from '@/hook/useLoad'

export default{
    name:'com-listView',
    setup(){
        const store=new useStore();

        let comment=['ffwgwgw我就饿饿附加费gwgw','ffwgwgwg改革若干五个任务fqefqfqqefqfqfqfeqwgw',
        'ffwgwgwgwgw','ffwgwgwgwgw','ffwgwgwgwgw',
        'ffwgwgwgwwwfsffqfq我给我给我给我给我fqfqfqqfwgw','ffwg五个任务给我给我给我wgwgwgw',
        'ffwgwgwgwgw','ffwgwgwefqfqgwgw','ffwgwgwgwfqfqfqfqfqgwqgqgw',
        'ffwgwgwgwwwfsffqfq我给我给我给我给我fqfqfqqfwgw','ffwg五个任务给我给我给我wgwgwgw',
        'ffwgwgwgwgw','ffwgwgwefqfqgwgw','ffwgwgwgwfqfqfqfqfqgwqgqgw']

        let isLock=ref(true);
        let newComment=ref('');
        
        const loads=useLoad(getCom,10);

        //提交留言
        function postComment(){
            isLock.value=true;
            if(!newComment.value)
                alert('写点什么吧');
            else{
                postCom(store.state.name,newComment.value)
                .then((res)=>{
                    console.log(res);
                    alert('发送成功！');
                    newComment.value='';
                })
                .catch(err=>console.log(err))
            }
        }

        return {
            ...loads,
            comment,
            isLock,
            newComment,

            postComment
        }
    }
}
</script>

<style scoped>
.warp{
    height:100%;
    overflow-y:scroll;
}
.warp::-webkit-scrollbar{
    width:0;
}
.com-list{
    width:100%;
    display:flex;
    flex-direction:column;
}
.comment{
    background:#fff;
    border:0.1rem solid #ddd;
    margin:0.5rem;
    padding:1.5rem;
    word-wrap:break-word;
    work-break:normal;
}
/*.comment:nth-child(4n+1){
    order:1;
}
.comment:nth-child(4n+2){
    order:2;
}
.comment:nth-child(4n+3){
    order:3;
}
.comment:nth-child(4n+4){
    order:4;
}*/
.bot{
    height:4rem;
    line-height:4rem;
    background-color:#fff;
    border-top:0.1rem solid #ddd;
    text-align:center;
}

.com-bottom{
    width:100%;
    height:10%;
    background-color:#fff;
    border-top:1px solid #ccc;
    position:absolute;
    bottom:-9%;
    transition:bottom 0.5s ease-in 0s;

    display:flex;
    justify-content:space-around;
    align-items:center;
}
.com-bottom:hover,.lock{
    bottom:0;
}
.inp{
    padding:0.5rem;
    width:70%;
    border:0.1rem solid #ccc;
}
.inp input{
    width:100%;
}
.com-bt{
    width:20%;
    height:3rem;
    line-height:3rem;
    text-align:center;
    border:1px solid #ccc;
    user-select:none; 
}

</style>