import {createStore} from 'vuex'
import { getList } from '@/utils/api';

const actions={
    sel(context,limit){
        getList(limit)
    .then((res)=>{
        context.commit('Sel',res)})
    .catch((err)=>console.log(err));
    },

    login(context,arg){
        context.commit('Login',arg);
    },
    outLog(context){
        context.commit('outLog');
    }
}

const mutations={
    Sel(state,res){
        state.artList.push(...res.data);
        state.limit+=5;
    },
    Login(state,arg){
        state.name=arg.name;
        state.login=true;
        if(arg.isRoot)
            state.isRoot=true;
    },
    outLog(state){
        state.name='用户未登录';
        state.login=false;
        state.isRoot=false;
    }
}

const state={
    artList:[],
    limit:0,
    name:'用户未登录',
    login:false,
    isRoot:false
}

export default createStore({
    actions,
    mutations,
    state
})