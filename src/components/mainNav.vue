<template>
    <div class="headImg">
    </div>
    <p class="name">{{name}}</p>
    <ul class='navlist'>
        <transition-group name='cli'>
        <li class="nav-blk blk" v-for="(nav,index) in navlist" :key=index
        v-show="nav.ok||$store.state.isRoot"
        :class="{cli:navIndex==index}"
        @click="navIndex=index">
        <el-icon>
            <component :is="nav.icon"></component>
        </el-icon>
        {{nav.text}}
            <router-link :to="nav.link"></router-link>
        </li>
    </transition-group>
    </ul>
</template>

<script>
import {ref,watch} from 'vue'
import {useStore} from 'vuex'

export default{
    name:'mainNav',
    props:['navlist'],
    setup(){
        const store=new useStore();
        let navIndex=ref(0);
        let name=ref(store.state.name);

        watch(()=>store.state.name,(newName)=>{name.value=newName});
        return {
            navIndex,
            name
            };
    },
}
</script>

<style lang="scss" scoped>
    .headImg{
        width:8vw;
        height:8vw;
        border-radius:50%;
        margin:1rem auto;
        background-image:url(http://127.0.0.1:8000/static/profile/img2.jpg);
        background-repeat:no-repeat;
        background-position:center center;
        background-size:cover;
    }
    .name{
        margin-bottom:1rem;
        text-align:center;
    }
    .nav-blk{
        height:10vh;
        border-bottom:0.1rem solid $border-col2;
        display:flex;
        justify-content:center;
        align-items:center;

        position:relative;
        &:hover{
            background:white;
        }
        a{
            position:absolute;
            width:100%;
            height:100%;
            left:0;
            top:0;
        }
        
        .el-icon{
            width:1.5rem;
            height:1.5rem;
            margin:0.6rem;
            color:#aaa;
        }
    }
    .cli{
        background:white;
        .el-icon{
            width:1.6rem;
            height:1.6rem;
            color:black;
        }
    }
    @keyframes navin{
        from{transform:translateX(-100%);opacity:0};
        to{transform:translateX(0);opacity:1};
    }
    .cli-enter-active{
        animation:navin 1s;
    }
    .cli-leave-active{
        animation:navin reverse 1s;
    }
    .cli:after{
        display:block;
        content:'';
        border-left:5vh solid white;
        border-top:5vh solid transparent;
        border-bottom:5vh solid transparent;
        
        position:absolute;
        right:-5vh;
        bottom:0;
    }
    
</style>