<template>
    <div class="warp" @scroll="onScroll">
        <ul class="com-list">
            <li class="comments"
            v-for="com in list" :key="com.commentId">
                <div class="comment" @click="prepareCom(com)">
                    <p class="content">{{com.userName+'：'+com.content}}</p>
                    <div class="exp-bt">
                        <a v-show="!com.exp" class="hov" href="#" @click="expCom(com)">展开</a>
                        <a v-show="com.exp" class="hov" href="#" @click="colCom(com)">收起</a>
                    </div>
                </div>
                <div v-show="com.exp">
                    <div class="comment" v-for="c in com.childList" :key="c.commentId"
                    @click="prepareCom(c)">
                    {{c.userName}} 对 {{c.preName}} 说：{{c.content}}
                    </div>
                </div>
            </li>
        </ul>
        <div class="bot">{{load}}</div>
    </div>
    <div class="com-bottom" :class="{lock:isLock}">
        <el-icon  @click="cancelCom">
            <ArrowLeftBold v-show="preId"/>
            <ArrowDownBold v-show="!preId"/>
        </el-icon>
        <div class="inp">
            <p v-if="preName">对 {{preName}} 说：</p>
            <input v-model="content" placeholder="说点什么吧~" @focus="isLock=true">
        </div>
        <div class="com-bt" @click="postComment">发送</div>
    </div>
</template>

<script>
import {ref,reactive,toRefs} from 'vue'
import {getCom,getChildCom,postCom} from '@/utils/api'
import {useStore} from 'vuex'
import useLoad from '@/hook/useLoad'

export default{
    name:'com-listView',
    setup(){
        const store=new useStore();

        let isLock=ref(true);

        let newComment=reactive({
            userName:store.state.name,
            content:'',
            fatherId:'',
            preId:'',
            preName:''
        });
        
        const loads=useLoad(getCom,10);//加载更多

        //展开回复
        function expCom(com){
            if(!com.childList){
                getChildCom(com.commentId)
                .then(res=>{
                    console.log(res);
                    com.childList=res.data;
                })
                .catch(err=>console.log(err));
            }
            com.exp=true;
        }
        function colCom(com){
            com.exp=false;
        }
        //发起回复
        function prepareCom(com){
            isLock.value=true;
            newComment.fatherId=com.fatherId?com.fatherId:com.commentId;
            newComment.preId=com.commentId;
            newComment.preName=com.userName;
        }
        //取消
        function cancelCom(){
            if(newComment.preId)
                delCom();
            else
                isLock.value=false;
        }
        //清空回复对象
        function delCom(){
            newComment.content='';
            newComment.fatherId='';
            newComment.preId='';
            newComment.preName='';
        }
        //提交留言
        function postComment(){
            isLock.value=true;
            if(!newComment.content)
                alert('写点什么吧');
            else{
                postCom(newComment)
                .then((res)=>{
                    console.log(res);
                    alert(res.data.message);
                    if(res.status==200)
                        delCom();
                })
                .catch(err=>console.log(err))
            }
        }

        return {
            isLock,
            ...toRefs(newComment),
            ...loads,

            expCom,
            colCom,
            prepareCom,
            cancelCom,
            postComment
        }
    },
}
</script>

<style lang="scss" scoped>
.warp{
    height:100%;
    overflow-y:scroll;
    &::-webkit-scrollbar{
        width:0;
    }
    .com-list{
        max-width:100%;
        display:flex;
        flex-direction:column;
  
        .comments{
            margin:0.5rem;
            border:1px solid $border-col;
            .comment{
                background:#fff;
                border-bottom:0.1rem solid $border-col2;
                padding:1.5rem;
                p{
                    float:left;
                }
                .exp-bt{
                    float:right;
                    a{
                      color:$blue-a;
                    }
                }
                &:after{
                    display:block;
                    content:'';
                    clear:both;
                }
            }
        }   
    }
}

.bot{
    height:4rem;
    line-height:4rem;
    background-color:#fff;
    border-top:0.1rem solid $border-col;
    text-align:center;
}

.com-bottom{
    width:100%;
    height:10%;
    background-color:#fff;
    border-top:1px solid $border-col;
    position:absolute;
    bottom:-9%;
    transition:bottom 0.5s ease-in 0s;

    display:flex;
    justify-content:space-around;
    align-items:center;

    &:hover{
     bottom:0;
    }
    .inp{
        padding:0.5rem;
        width:70%;
        border:0.1rem solid $border-col;
        display:flex;
        justify-content:flex-start;
        align-items:center;

        input{
            flex:1;
        }
    }
    .com-bt{
        width:20%;
        height:3rem;
        line-height:3rem;
        text-align:center;
        border:1px solid $border-col;
        user-select:none; 
    }
    .el-icon{
        width:1rem;
        height:1rem;
    }
}
.lock{
     bottom:0;
}

</style>