<template>
    <div class="log-reg-box login-box" :class="{'before':!flag,'after':flag}" v-if="!$store.state.login">
        <div class="l"><p class="txt">用户名:</p><div class="inp"><input v-model="name"/></div></div>
        <div class="l">
            <p class="txt">密码:</p>
            <div class="inp" >
                <input v-model="password" type="password"/>
            </div>
        </div>
        <div class="l"></div>
        <div class="l bt">
            <div @click="loging">登录</div>
            <a href="#" @click="change">注册账号></a>
        </div>
    </div>
    <div class="log-reg-box register-box" :class="{'before':flag,'after':!flag}" v-if="!$store.state.login">
        <div class="l">
            <p class="txt">用户名:</p>
            <div class="inp" :class="{err:!nameOk}">
                <input v-model="name"/>
            </div>
        </div>
        <div class="l errt">
                <span v-if="!nameOk">用户名不可为空！</span>
        </div>
        <div class="l">
            <p class="txt">密码:</p>
            <div class="inp" :class="{err:!pwdOk}">
                <input v-model="password" type="password"/>
            </div>
        </div>
        <div class="l errt">
            <span v-if="!pwdOk">密码需为6-18位的字母或数字！</span>
        </div>
        <div class="l bt">
            <div @click="registering">注册</div>
            <a href="#" @click="change">已有账号></a>
        </div>
    </div>
    <div class="log-reg-box" v-if="$store.state.login">
        <span class='l out'>欢迎你！{{$store.state.name}}!</span>
        <div class="out-bt" @click="out">退出</div>
    </div>
</template>

<script>
import {login,register,outLog} from '@/utils/api'
import {reactive,toRefs,computed} from 'vue'
import {useStore} from 'vuex'

export default{
    name:'loginView',
    setup(){
        const store=new useStore();
        let user=reactive({
            name:"",
            password:""
        });
        
        const pwdRegex="^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$";
        let logFlag=reactive({
            flag:true,
            pwdOk:computed({
                get:()=>{return !user.password||user.password.match(pwdRegex)}
            }),
            nameOk:computed({
                get:()=>{return user.name}
            })
        });
        
        //登录/注册页面
        function change(){
            logFlag.flag=!logFlag.flag;
            user.name="";
            user.password="";
        }
        function loging(){
            login(user.name,user.password)
            .then((res=>{
                alert(res.data.message);
                if(res.data.status===200){
                    store.dispatch('login',{
                        name:user.name,
                        isRoot:res.data.isRoot
                    });
                }
            }))
            .catch(err=>console.log(err))
        }
        function registering(){
            if(!logFlag.nameOk)
                alert('先取个名吧！');
            else if(!user.password||!logFlag.pwdOk)
                alert('你这密码不行！');
            else{
                register(user.name,user.password)
                .then((res)=>{
                    alert(res.data.message);
                    if(res.data.status===200){
                        logFlag.flag=!logFlag.flag;
                    }
                })
                .catch((err)=>console.log(err));
            }
        }
        function out(){
            outLog()
            .then(()=>{
                store.dispatch('outLog');
            })
            .catch(err=>{console.log(err)})
        }

        return {
            ...toRefs(user),
            ...toRefs(logFlag),

            change,
            loging,
            registering,
            out
        }
    }
}
</script>

<style scoped>
.log-reg-box,.inp,.bt div,.out-bt{
    border: 0.1rem solid #00FFFF;
    box-shadow:0 0 0.2rem #00FFFF;
}
.log-reg-box{
    position:absolute;

    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

    backface-visibility:hidden;
    transition:1s;
}
.before{
    transform:rotateY(-180deg);
}
.after{
    transform:rotateY(0deg);
}

.l{
    width:80%;
    height:4rem;
}
.txt{
    width:15%;
    line-height:4rem;
    float:left;
}
.inp{
    width:70%;
    padding: 0.5rem;
    border-radius:0.5rem;
    float: right;
}
.err{
    border:0.1rem solid #F62217;
    box-shadow: 0 0 0.5rem #F62217;
}
.errt span{ 
    color:#F62217;
    float:right;
}
.log-reg-box input{
    width:70%;
    height:2rem;
    border:none;
    outline:none;
    font-size:0.5rem;
    background:transparent;
}
.bt{
    line-height:3rem;
}
.bt div,.out-bt{
    width: 15rem;
    height: 3rem;
    line-height:3rem;
    text-align:center;
    border-radius:0.5rem;
    user-select:none;
    float:left;
}
.bt a{
    float:right;
}

.out{
    text-align:center;
}
</style>