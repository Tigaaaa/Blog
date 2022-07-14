<template>
    <ul>
        <transition-group name="list">
        <li class="abox alb-box" v-for="alb in list" :key="alb.albumId">
            <div class="img">
                <img :title="alb.albumName" :src="alb.photos[0].url||''" onerror="this.src='http://localhost:8000/static/cover/1657275474420-222.186.12.jpg';this.onerror=null"/>
                <router-link :to="{
                    path:'/server/anAlbum',
                    query:{
                        id:alb.albumId
                    }
                }"></router-link>
            </div>
            <div class="bottom">
                <p v-show="!inp" class="title" @dblclick="inp=!inp">{{alb.albumName}}</p>
                <input v-show="inp" class="title" v-model="alb.albumName" @blur="changeName(alb.albumName,alb.albumId)"/>
                <el-icon @click="delAlbum(alb.albumId,alb.photos)"><DeleteFilled /></el-icon>
            </div>
        </li>
        <li class="abox add-box" key="adm" @click="isCreate=true">
            <el-icon>
                <Plus/>
            </el-icon>
        </li>
        </transition-group>
    </ul>
    <div class="create-box" v-show="isCreate">
        <div class="top"><span @click="isCreate=false">x</span></div>
        <div class="body">
            <div class="inp">
                <input placeholder="相册名" v-model="createName"/>
            </div>
            <div class="button" @click="createAlb(createName)">创建相册</div>
        </div>
    </div>
</template>

<script>
import {reactive,toRefs} from 'vue'
import {useRouter} from 'vue-router'
import {getAlbumList,createAlbum,postAlbumName,deletAlbum} from '@/utils/api'
export default{
    name:"admAlbum",
    setup(){
        const router=new useRouter();
        let albumList=reactive({
            inp:false,
            isCreate:false,
            createName:"",
            list:[]
        });

        //获取相册列表
        function getList(){
            getAlbumList()
            .then(res=>{
                for(let p of res.data){
                    p.photos=JSON.parse(p.photos);
                    if(!p.photos[0])
                        p.photos.push({url:""})
                }
                albumList.list=res.data;
            })
            .catch(err=>console.log(err))
        }
        //新建相册
        function createAlb(name){
            if(!name)
                alert("给相册取个名吧！")
            else{
                createAlbum(name)
                .then(res=>{
                    alert(res.data.message);
                    if(res.data.status==0){
                        albumList.isCreate=false;
                        albumList.createName="";
                        router.push({
                            path:'/server/anAlbum',
                            query:{
                                id:res.data.data[0]["max(albumId)"]
                            }
                        });
                    }
                })
                .catch(err=>console.log(err.message))
            }  
        }
        //修改相册名
        function changeName(name,id){
            albumList.inp=false;
            postAlbumName(name,id)
            .finally(()=>getList())
            .catch(err=>console.log(err.message))
        }
        //删除相册
        function delAlbum(id,photos){
            if(confirm("确定删除吗？")){
                deletAlbum(id,JSON.stringify(photos))
                .then(res=>{
                    alert(res.data.message);
                    if(res.data.status==0)
                        getList();
                })
            }
        }
        
        getList();
        
        return {
            ...toRefs(albumList),

            getList,
            createAlb,
            changeName,
            delAlbum
        }
    }
}
</script>

<style lang="scss" scoped>
@keyframs out{
    from{opacity:1;}
    to{opacity:0;}
}
.list-move{
    transition:all 1s;
}
.list-leave-active{
    animation:out 1s;
    position:absolute;
}
.abox{
    width:25rem;
    height:25rem;
    background-color:#fff;
    border-radius:0.5rem;
    margin:1rem;
    
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    align-items:center;

    float:left;
}
.alb-box{
    .img{
        width:90%;
        height:80%;
        overflow:hidden;
        position:relative;
        img{
            min-height:100%;
            min-width:100%;
            object-fit:cover;
            position:absolute;
            left:50%;
            top:50%;
            transform:translate(-50%,-50%);
        }
        a{
            width:100%;
            height:100%;
            position:absolute;
            left:0;
            top:0;
        }
    }
    .bottom{
        width:90%;
        .title{
            text-align:center;
            float:left;
        }
        .el-icon,.el-icon svg{
            width:2rem;
            height:2rem;
            color:$border-col2;
            float:right;
            &:hover{
                color:$border-col;
            }
        }
    }
}
.add-box{
    .el-icon,.el-icon svg{
        width:15rem;
        height:15rem;
        color:$border-col;
    }
}

.create-box{
    position:absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    margin:auto;
    z-index:999;

    width:60rem;
    height:20rem;
    background:#fff;
    border:0.1rem solid $border-col;
    border-radius:0.5rem;

    .top{
        width:100%;
        height:20%;
        span{
            width:3rem;
            height:3rem;
            text-align:center;
            line-height:3rem;
            float:right;
            user-select:none;
        }
    }
    .body{
        height:80%;
        display:flex;
        flex-direction:column;
        justify-content:space-evenly;
        align-items:center;
        .inp{
            width:80%;
            height:3rem;
            padding:0.5rem;
            border:0.1rem solid $border-col;
            input{
                width:100%;
                height:100%;
            }
        }
        .button{
            padding:1rem;
            border-radius:0.5rem;
            background-color:$blue-bot;
        }
    }
    
}
</style>