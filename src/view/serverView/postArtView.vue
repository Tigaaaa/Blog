<template>
    <div class="title">
        <input v-model="title" placeholder="标题"/>
    </div>
    <div class="tags-choose">
        <ul class="art-tags">
            <li class="tag" v-for="value in tags" :key="value[0]">{{value[1]}}</li>
        </ul>
        <div class="all-tags" :class="{collect:!tagExp,expand:tagExp}">
            <div :class="{'exp-bt':!tagExp,'col-bt':tagExp}" @click="expand"></div>
            <ul class="tag-list" v-show="tagExp">
                <li class="tag"
                v-for="tag in allTags" 
                :key="tag.tagId" 
                :class="{'has-cho':tags.has(tag.tagId)}"
                @click="postTag(tag.tagId,tag.tagName)">{{tag.tagName}}</li>
                <li class="tag" @dblclick="inpTag=true">
                    <p v-show="!inpTag">+</p>
                    <input v-show="inpTag" @blur="addATag" v-model="newTagName">
                </li>
            </ul>
        </div>
    </div>
    <v-md-editor
        ref="editor"
        v-model="content"
        placeholder='在这里写东西'
        height="400px"
        ></v-md-editor>
        
    <button @click="post">提交</button>
</template>

<script>
import {reactive,toRefs,ref} from 'vue'
import {useRoute} from 'vue-router'
import {getTags,addTag,getCont,getTagName,postArt,modArt} from '@/utils/api.js'

export default{
    name:'postArtView',
    setup(){
        const route=useRoute();

        let Post=reactive({
            title:"",
            content:"",
            tags:new Map(),
            allTags:[]
        });
        let tagExp=ref(false);
        let inpTag=ref(false);
        let newTagName=ref('');

        //修改文章,先获取文章内容
        if(route.query.id){
            getCont(route.query.id)
            .then(res=>{
                Post.title=res.data[0].title;
                Post.content=JSON.parse(res.data[0].content);
                getTagName(res.data[0].tagsId)
                .then(res=>{
                    res.data.map(t=>{
                        Post.tags.set(t.tagId,t.tagName)
                    })
                })
                .catch(err=>console.log(err));
            })
            .catch(err=>console.log(err))
        }
        //获取标签列表
        getTags()
        .then(res=>Post.allTags=res.data)
        .catch(err=>console.log(err))

        //展开、收起tag列表
       function expand(){
            tagExp.value=!tagExp.value;
        }
        //设置标签
        function postTag(id,name){
            if(!Post.tags.has(id))
                Post.tags.set(id,name);
            else
                Post.tags.delete(id);
        }
        //新增标签
        function addATag(){
            addTag(newTagName.value)
            .then(()=>{
                getTags()
                .then(res=>Post.allTags=res.data)
                .catch(err=>console.log(err))
                inpTag.value=false;
            })
            .catch(err=>console.log(err))
        }
        
        //提交文章或修改
        function post(){
            let newTags=[];
            let keys=Post.tags.keys();
            for(let key of keys)
                newTags.push(key)
            newTags=','+newTags.join(',')+',';
            if(route.query.id){
                modArt(route.query.id,Post.title,JSON.stringify(Post.content),newTags)
                .then(()=>{
                    alert('修改成功！');
                })
                .catch(err=>console.log(err))
            }else{
                postArt(Post.title,JSON.stringify(Post.content),newTags)
                .then(()=>{
                    alert('上传成功！');
                    Post.title="";
                    Post.content="";
                    Post.tags.clear();
                })
                .catch(err=>console.log(err))
            }
        }

        return {
            ...toRefs(Post),
            inpTag,
            newTagName,

            addATag,
            tagExp,
            postTag,
            post,
            expand,
        };
    }
}
</script>

<style lang="scss" scoped>
.title{
    width:50%;
    height:3.5rem;
    background-color:white;
    border-radius:0.5rem;
    border:1px solid #border-col;
    margin:1rem;
    padding-left:1rem;
    display:flex;
    align-items:center;

    input{
        font-size:0.5rem;
    }
}

.tags-choose{
    margin:1rem;
    height:3.5rem;
    position:relative;
}
.art-tags{
    width:50%;
    height:3.5rem;
    border:0.1rem solid blue;
    border-radius:0.5rem;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    overflow-x:scroll;

    position:absolute;
    left:0;
}
.art-tags::-webkit-scrollbar{
    height:0;
}
.all-tags{
    z-index:999;
    background-color:#fff;
    border:1px solid $border-col;
    position:absolute;
    left:52%;
}
.collect{
    width:3.5rem;
    height:3.5rem;
    transition:width 0.5s,height 0.5s;
}
.expand{
    width:30%;
    height:18rem;
    padding:1rem 2rem 1rem 3rem;
    overflow:scroll;
    transition:width 1s,height 1s;
}
.expand::-webkit-scrollbar{
    width:0;
}
.exp-bt,.col-bt{
    border:
    {
        top:0.8rem solid transparent;
        bottom:0.8rem solid transparent;
    }
    position:absolute;
    left:1rem;
    top:1rem;
}
.exp-bt{
    border-left:1.5rem solid #bbb;
}
.col-bt{
    border-right:1.5rem solid #bbb;
}

.tag-list{
    width:100%;
    &:after{
        display:block;
        content:'';
        clear:both;
    }
    .tag{
        margin-top:1rem;
    }
}
.has-cho{
    background-color:$blue-bot-c;
    color:#fff;
}

button{
    width:10rem;
    height:3.5rem;
    background:$blue-bot;
    border:0.1rem solid white;
    border-radius:0.5rem;
    margin:1rem;
}
</style>