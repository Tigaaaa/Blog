let db=require('../db/index')
var fs=require('fs');

exports.create=(req,res)=>{
    let sql="insert into album (albumName,photos) values (?,?)";
    let photos=JSON.stringify([]);
    db.query(sql,[req.body.params.albumName,photos],(err,data)=>{
        if(err){
            return res.send({
                status:1,
                message:"新建相册失败",
                reason:err.message
            })
        }
        let sql2="select max(albumId) from album";
        db.query(sql2,[],(err,data)=>{
            if(err){
                return res.send({
                    status:1,
                    message:"获取相册id失败",
                    reason:err.message
                })
            }
            res.send({
                status:0,
                message:"新建相册成功！",
                data:data
            });
        })
    })
}

exports.getList=(req,res)=>{
    let sql="select albumId,albumName,photos from album";
    db.query(sql,(err,data)=>{
        if(err){
            return res.send({
                status:1,
                message:"获取相册列表失败",
                reason:err.message
            })
        }
        res.send(data);
    })
}
exports.selectAlbum=(req,res)=>{
    let sql="select photos from album where albumId=?";
    db.query(sql,[req.query.albumId],(err,data)=>{
        if(err){
            return res.send({
                status:1,
                message:"获取失败",
                reason:err.message
            })
        }
        res.send(data);
    })
}

exports.postName=(req,res)=>{
    let sql="update album set albumName=? where albumId=?";
    db.query(sql,[req.body.params.albumName,req.body.params.albumId],(err,data)=>{
        if(err){
            return res.send({
                status:1,
                message:"修改失败",
                reason:err.message
            })
        }
        res.send({
            status:0,
            message:"修改成功！"
        });
    })
}

exports.postPhoto=(req,res)=>{
    let file=req.file;
    let newp={};
    newp.url=`http://localhost:8000/${file.destination}/${file.filename}`;
    newp.name=file.filename;
    let list=JSON.parse(req.body.jsonList);
    list.push(newp);

    let sql="update album set photos=? where albumId=?";
    let photos=JSON.stringify(list);
    db.query(sql,[photos,req.body.id],(err,data)=>{
        if(err){
            return res.send({
                status:1,
                message:"上传失败",
                reason:err.message
            })
        }
        res.send({
            status:0,
            message:"上传成功！"
        });
    })
}
exports.deletAlbum=(req,res)=>{
    let photos=JSON.parse(req.body.params.photos);
    for(let p of photos){
        if(p.url!=""){
            let url='static/album/'+p.url.split('/').pop();
            fs.unlink(url,err=>{
                if(err)
                    return res.send({
                        status:1,
                        message:"删除照片失败！",
                        reason:err.message
                    })
            })
        }
    }
    let sql="delete from album where albumId=?"
    db.query(sql,[req.body.params.albumId],(err,data)=>{
        if(err){
            return res.send({
                status:1,
                message:"删除相册失败！",
                reason:err.message
            })
        }
        res.send({
            status:0,
            message:"删除成功"
        })
    })
}