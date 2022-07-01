<template>
    <div class="main-box">
        <header class="top blk">
            <h1>我的博客</h1>
        </header>
        <div class="bd">
            <nav class="l-box">
                <mainNav :navlist="navlist"/>
            </nav>
            <div class="content blk m sd">
                <router-view v-slot="{Component}">
                    <keep-alive>
                        <component v-if="$route.meta && $route.meta.keepAlive" :is="Component" :key="$route.path"/>
                    </keep-alive>
                    <component v-if="!($route.meta.keepAlive)" :is="Component"/>
                </router-view>
            </div>
            <div class="r-box blk m sd"></div>
        </div>
    </div>
</template>

<script>
import mainNav from '@/components/mainNav'
import {cookieLog} from '@/utils/api'
import  {useStore} from 'vuex'

export default{
    name:'userView',
    setup(){
        const store=new useStore();

        let navlist=[{text:'文章',link:'/user/articleList',ok:true},
                    {text:'相册',link:'/user/photos',ok:true},
                    {text:'留言',link:'/user/comment',ok:true},
                    {text:'登录',link:'/user/login',ok:true},
                    {text:'管理博客',link:'/server',ok:false}];

        //尝试自动登录
        cookieLog()
        .then(res=>{
            if(res.data.status===200)
                store.dispatch('login',{
                    name:res.data.name,
                    isRoot:res.data.isRoot
                });
        })
        .catch(err=>console.log(err))
        
        return {
            navlist
        }
    },

    components:{
        mainNav
    }
}
</script>

<style scoped>
    .main-box{
        background-color: rgba(255, 255, 255, 0.5);
        overflow:hidden;
    }
    .top{
        height: 10%;
        border-bottom: 1px solid #bbb;
        display:flex;
        align-items:center;
    }
    h1{
        font-size:20px;
        margin-left:1vw;
    }

    .bd{
        height:90%;
        display: flex;
        align-items:flex-start;
    }
    .l-box{
        z-index:999;
    }
    .content,.r-box{
        height:97%;
    }
    .content{
        flex:4;
        border-radius:5px;
        overflow-y:scroll;
        overflow-x:hidden;
        position:relative;
    }
    .content::-webkit-scrollbar{
        width:0;
    }
    .r-box{
        flex:1;
        border-radius:5px;
    }
</style>