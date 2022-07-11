import axios from "./request";

export const getList=(offset,limit)=>axios.get('/article/list?offset='+offset+'&limit='+limit);
export const getCont=(id)=>axios.get('/article/cont?id='+id);
export const delArt=(id,coverUrl)=>axios.get('/article/delete?id='+id+'&coverUrl='+coverUrl);
export const postArt=(title,content,ids,coverUrl)=>{
    return axios.post('/article/postArt',{
        params:{
            title:title,
            content:content,
            ids:ids,
            coverUrl:coverUrl
        }
    });
}
export const modArt=(id,title,content,ids,coverUrl)=>{
    return axios.post('/article/modArt',{
        params:{
            id:id,
            title:title,
            content:content,
            ids:ids,
            coverUrl:coverUrl
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
export const getChildCom=(id)=>axios.get('/comment/getChildCom?fatherId='+id);
export const selectCom=(id)=>axios.get('/comment/select?id='+id);
export const postCom=(com)=>{
    return axios.post('/comment/postCom',{
        params:{
            name:com.userName,
            content:com.content,
            fatherId:com.fatherId,
            preId:com.preId,
            preName:com.preName
        }
    })
}

export const getAlbumList=()=>axios.get('/album/getList');
export const selectAlbum=(id)=>axios.get('/album/selectAlbum?albumId='+id);
export const createAlbum=(albumName)=>{
    return axios.post('/album/create',{
        params:{
            albumName:albumName
        }
    })
}
export const postAlbumName=(albumName,albumId)=>{
    return axios.post('/album/postName',{
        params:{
            albumName:albumName,
            albumId:albumId
        }
    })
}
export const deletAlbum=(albumId,photos)=>{
    return axios.post('/album/delet',{
        params:{
            albumId:albumId,
            photos:photos
        }
    })
}