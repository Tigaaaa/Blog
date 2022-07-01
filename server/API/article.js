let db=require('../db/index')

exports.postArt=(req,res)=>{
    var sql='insert into article (title,content,tagsId) values (?,?,?)';
    db.query(sql,[req.body.params.title,req.body.params.content,req.body.params.ids],(err,data)=>{
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
    var sql='update article set title=?,content=?,tagsId=? where id=?';
    db.query(sql,[req.body.params.title,req.body.params.content,req.body.params.ids,req.body.params.id],(err,data)=>{
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
        res.send(data);
    })
}

exports.getArtList=(req,res)=>{
    var sql1='select id,title from article limit ?,?';
    var sql2='select id,title from article';
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
