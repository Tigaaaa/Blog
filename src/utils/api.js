import axios from "./request";

export const getList=(offset,limit)=>axios.get('/article/list?offset='+offset+'&limit='+limit);
export const getCont=(id)=>axios.get('/article/cont?id='+id);
export const delArt=(id)=>axios.get('/article/delete?id='+id);
export const postArt=(title,content,ids)=>{
    return axios.post('/article/postArt',{
        params:{
            title:title,
            content:content,
            ids:ids
        }
    });
}
export const modArt=(id,title,content,ids)=>{
    return axios.post('/article/modArt',{
        params:{
            id:id,
            title:title,
            content:content,
            ids:ids
        }
    })
}

export const register=(name,password)=>{
    return axios.post('/login/register',{
        params:{
            name:name,
            password:password
        }
    })
}
export const login=(name,password)=>{
    return axios.post('/login/login',{
        params:{
            name:name,
            password:password
        }
    })
}
export const outLog=()=>axios.get('/login/out');
export const cookieLog=()=>axios.get('/login/cookie');

export const getTags=()=>axios.get('/tag/getTags');
export const getTagName=(ids)=>axios.get('/tag/getName?ids='+ids);
export const tagSelect=(offset,limit,id)=>axios.get('/tag/select?id='+id+'&offset='+offset+'&limit='+limit);
export const addTag=(name)=>{
    return axios.post('/tag/add',{
        params:{
            name:name
        }
    })
}

export const getCom=(offset,limit)=>axios.get('/comment/getCom?offset='+offset+'&limit='+limit);
export const selectCom=(id)=>axios.get('/comment/select?id='+id);
export const postCom=(name,content)=>{
    return axios.post('/comment/postCom',{
        params:{
            name:name,
            content:content
        }
    })
}