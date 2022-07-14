<template>
    <ul>
        <li class="alb-box" v-for="alb in list" :key="alb.albumId">
            <div class="img">
                <img :title="alb.albumName" :src="alb.photos[0].url||''" onerror="this.src='http://localhost:8000/static/cover/1657275474420-222.186.12.jpg';this.onerror=null"/>
                <router-link :to="{
                    path:'/user/anAlbum',
                    query:{
                        id:alb.albumId
                    }
                }"></router-link>
            </div>
            <p class="title">{{alb.albumName}}</p>
        </li>
    </ul>
</template>

<script>
import {reactive,toRefs} from 'vue'
import {getAlbumList} from '@/utils/api'
export default{
    name:'albumList',
    setup(){
        let albums=reactive({
            list:[]
        });

        getAlbumList()
        .then(res=>{
            for(let p of res.data){
                p.photos=JSON.parse(p.photos);
                if(!p.photos[0])
                    p.photos.push({url:""})
            }
            albums.list=res.data;
        })
        .catch(err=>console.log(err.message))

        return {
            ...toRefs(albums)
        }
    }
}
</script>

<style lang="scss" scoped>
.alb-box{
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
</style>