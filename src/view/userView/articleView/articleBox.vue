<template>
    <article class="box">
        <div class='articleCover'>
            <router-link :to="{
                path:'/user/article',
                query:{
                    id:id
                }}"></router-link>
        </div>
        <h3 class="title hid">{{title}}</h3>
    </article>
</template>

<script>

    export default{
        name:'articleBox',
        props:['title','id'],
    }
</script>

<style scoped>
.box{
    width:100%;
    height:100%;
    background:white;
    border-radius:0.5rem;

    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
}
.articleCover{
    width:90%;
    height:85%;
    background:black;
    position:relative;
}
.articleCover a{
    width:90%;
    height:85%;
    position:absolute;
}
.title{
    font-size:2.5rem;
}
</style>