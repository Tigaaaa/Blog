import {createStore} from 'vuex'

const actions={
    login(context,arg){
        context.commit('Login',arg);
    },
    outLog(context){
        context.commit('outLog');
    }
}

const mutations={
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
    name:'用户未登录',
    login:false,
    isRoot:false
}

export default createStore({
    actions,
    mutations,
    state
})