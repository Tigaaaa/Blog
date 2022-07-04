<template>
    <h3 class="title hid">{{title}}</h3>
    <ul class='tags'>
        <router-link 
        class="tag"
        v-for="tag in tags" 
        :key=tag.tagId
        :to="{
            path:'/user/tagSelect',
            query:{
                id:tag.tagId
            }
        }">{{tag.tagName}}</router-link>
    </ul>
    <v-md-preview class="content"
        :text="content"></v-md-preview>
    <div class='time'>
        <p>创建时间:{{createTime}}</p>
        <p>上次修改:{{updateTime}}</p>
    </div>
</template>

<script>
import {reactive,toRefs} from 'vue'
import {useRoute} from 'vue-router'
import {getCont,getTagName} from '@/utils/api'
import getTime from '@/hook/useGetTime'

export default{
    name:'anArticle',
    setup(){
        const route=useRoute();

        let Article=reactive({
            title:'',
            content:'',
            createTime:'',
            updateTime:'',
            tags:[]
        });

        getCont(route.query.id)
        .then(res=>{
            Article.title=res.data[0].title;
            Article.content=JSON.parse(res.data[0].content);
            Article.createTime=getTime(new Date(res.data[0].createTime));
            Article.updateTime=getTime(new Date(res.data[0].updateTime));
            getTagName(res.data[0].tagsId)
            .then(res=>{
                Article.tags=res.data;
            })
            .catch(err=>console.log(err));
            })
        .catch(err=>console.log(err))

        return {...toRefs(Article)};
    }
}
</script>

<style lang="scss" scoped>
.title{
    margin:1rem;
    font-size:2.5rem;
}
.tags{
    margin:1rem;
    width:80%;
    &:after{
        display:block;
        content:"";
        clear:both;
    }
}

.content{
    margin:1rem;
    border:1px solid $border-col;
    background-color:#fff;
}
.time{
    margin:1rem;
    color:$border-col;
    float:right;
}
</style>