<template>
    <ul>
    <transition-group name="out">
        <li v-for="art in list" :key="art.id">
            <div class="title"><p class="hid">{{art.title}}</p></div>
            <button class="mod" @click="modifyArt(art.id)">修改</button>
            <button class="del" @click="deleteArt(art.id,art.coverUrl)">删除</button>
        </li>
    </transition-group>
    </ul>
</template>

<script>
import {getList,delArt} from '@/utils/api.js'
import {useRouter} from 'vue-router'
import {reactive,toRefs} from 'vue'

    export default{
        name:'articleList',
        setup(){
            const router=useRouter();

            let myList=reactive({
                list:[]
            })

            function modifyArt(id){
                router.push({
                    path:'/server/modArt',
                    query:{
                        id:id
                    }
                })
            }

            function deleteArt(id,coverUrl){
                if(confirm("确认删除？")){
                    delArt(id,coverUrl)
                    .then(()=>{
                        myList.list=myList.list.filter(a=>{return a.id!=id});
                    })
                    .catch((err)=>console.log(err));
                }
            }

            
            getList(-1)
            .then((res)=>{
                myList.list=res.data;
            })
            .catch((err)=>console.log(err));

            return {...toRefs(myList),modifyArt,deleteArt};
        },
        
 
    }
</script>

<style lang="scss" scoped>
ul{
    padding:1rem;
}
li{
    height:5rem;
}
li{
    div,button{
        height:3.5rem;
        line-height:3.5rem;
        border-radius:1rem;
        margin-left:0.5rem;
        border:none;
        float:left;
    }
}
.title{
    width:45%;
    background-color:#fff;
    p{
        width:90%;
        margin-left:1rem;
        font-size:1.6rem;
    }
}
.mod,.del{
    width:20%;
    background-color:$blue-bot;
}

@keyframes out{
    from {transform:translateX(0);opacity:1;}
    to {transform:translateX(-100%);opacity:0}
}
@keyframes in{
    from {transform:translateY(100%);opacity:0;}
    to {transform:translateY(0);opacity:1;}
}
.out-move{
    transition:all 1s;
}
.out-enter-active{
    animation:in 1s;
}
.out-leave-active{
    animation:out 1s;
    position:absolute;
}
</style>