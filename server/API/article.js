let db=require('../db/index')
var fs=require('fs');

exports.postArt=(req,res)=>{
    var sql='insert into article (title,content,tagsId,coverUrl) values (?,?,?,?)';
    db.query(sql,[req.body.params.title,req.body.params.content,req.body.params.ids,req.body.params.coverUrl],(err,data)=>{
        if(err){
            return res.send('错误：'+err.message)
        }
        res.send({
            status:200,
            message:'上传成功'
        });
    })
}

exports.modArt=(req,res)=>{
    var sql='update article set title=?,content=?,tagsId=?,coverUrl=? where id=?';
    db.query(sql,[req.body.params.title,req.body.params.content,req.body.params.ids,req.body.params.coverUrl,req.body.params.id],
    (err,data)=>{
        if(err){
            return res.send('错误：'+err.message)
        }
        res.send(data);
    })
}

exports.delArt=(req,res)=>{
    var sql='delete from article where id=?';
    db.query(sql,[req.query.id],(err,data)=>{
        if(err){
            return res.send('错误：'+err.message)
        }
        let url='static/cover/'+req.query.coverUrl.split('/').pop();
        fs.unlink(url,err=>{
            if(err)
                return res.send(err.message)
            res.send(data);
        })
    })
}

exports.getArtList=(req,res)=>{
    var sql1='select id,title,coverUrl from article limit ?,?';
    var sql2='select id,title,coverUrl from article';
    if(req.query.offset!=-1){
        db.query(sql1,[+req.query.offset,+req.query.limit],(err,data)=>{
            if(err){
                return res.send('错误：'+err.message)
            }
            res.send(data);
        })
    }else {
        db.query(sql2,(err,data)=>{
            if(err){
                return res.send('错误：'+err.message)
            }
            res.send(data);
        })
    }
}

exports.getArtCont=(req,res)=>{
    var sql='select * from article where id=?';
    db.query(sql,[req.query.id],(err,data)=>{
        if(err){
            return res.send('错误：'+err.message)
        }
        res.send(data);
    })
}

exports.postCover=(req,res)=>{
    if(req.body.oldUrl!='null'){
        let oldUrl='static/cover/'+req.body.oldUrl.split('/').pop();
        fs.unlinkSync(oldUrl);
    }
    let file=req.file;
    let fileInfo={};

    fileInfo.path=file.destination+'/'+file.filename;
    res.send({fileInfo});
}
