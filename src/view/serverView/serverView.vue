<template>
    <div class="server-box">
        <header class="top blk">
            <h1>博客管理</h1>
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
        </div>
    </div>
</template>

<script>
import mainNav from '@/components/mainNav'
export default{
    name:'serverView',
    setup(){
        let navlist=[{icon:'Files',text:'博客管理',link:'/server/admArt'},
                    {icon:'Picture',text:'相册管理',link:'/server/admAlb'},
                    {icon:'User',text:'个人信息',link:'/server/information'},
                    {icon:'EditPen',text:'写博客',link:'/server/postArt'},
                    {icon:'ArrowLeftBold',text:'返回主页',link:'/user'}];
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
    .server-box{
        background-color: rgba(255, 255, 255, 0.5);
        overflow:hidden;
    }
    .top{
        height:10%;
        border-bottom: 0.1rem solid #bbb;
        display:flex;
        align-items:center;
    }
    h1{
        font-size:2rem;
        margin-left:1rem;
    }

    .bd{
        height:90%;
        display: flex;
        align-items:flex-start;
    }
    .l-box{
        z-index:999;
    }
    .content{
        height:97%;
        flex:4;
        border-radius:0.5rem;
        overflow-y:scroll;
        overflow-x:hidden;
    }
    .content::-webkit-scrollbar{
        width:0;
    }

</style>