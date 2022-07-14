<template>
    <div class="scroll-warp" @scroll="onScroll">
        <ul>
            <li v-for="art in list" :key="art.id">
                <articleBox :title="art.title" :id="art.id" :coverUrl="art.coverUrl"/>
            </li>
        </ul>
        <div class="bot">{{load}}</div>
    </div>
</template>

<script>
import articleBox from './articleBox'
import {getList} from '@/utils/api.js'
import useLoad from '@/hook/useLoad'

    export default{
        name:'articleList',
        components:{
            articleBox
            },
        setup(){

        const loads=useLoad(getList,5);

            return {
                ...loads
            };
        },
 
    }
</script>

<style lang="scss" scoped>
.scroll-warp{
    width:100%;
    height:100%;
    overflow-y:scroll;
    &::-webkit-scrollbar{
        width:0;
    }
    ul{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:space-evenly;
        li{
            width:90%;
            height:50rem;
            margin:1.5rem 0;
        }
    }
    .bot{
        height:4rem;
        line-height:4rem;
        background-color:#fff;
        border-top:0.1rem solid $border-col;
        text-align:center;
    }
}

</style>