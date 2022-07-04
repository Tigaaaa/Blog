let db=require('../db/index')

exports.postCom=(req,res)=>{
    var sql1='insert into comment (userName,content,fatherId,preId,preName) values (?,?,?,?,?)';
    var sql2='insert into comment (userName,content) values (?,?)';
    if(req.body.params.fatherId)
        db.query(sql1,[req.body.params.name,req.body.params.content,req.body.params.fatherId,req.body.params.preId,req.body.params.preName],(err,data)=>{
            if(err){
                return res.send({
                    statu:400,
                    message:'发送失败!'
                })
            }
            res.send({
                status:200,
                message:'发送成功!',
                data:data
            });
        })
    else
        db.query(sql2,[req.body.params.name,req.body.params.content],(err,data)=>{
            if(err){
                return res.send({
                    statu:400,
                    message:'发送失败!'
                })
            }
            res.send({
                status:200,
                message:'发送成功!',
                data:data
            });
        })
}
exports.getCom=(req,res)=>{
    var sql='select * from comment where fatherId is null limit ?,?';
    db.query(sql,[+req.query.offset,+req.query.limit],(err,data)=>{
        if(err)
            return res.send("错误"+err.message)
        res.send(data);
    })
}
exports.getChildCom=(req,res)=>{
    var sql='select * from comment where fatherId = ?';
    db.query(sql,[+req.query.fatherId],(err,data)=>{
        if(err)
            return res.send("错误"+err.message)
        res.send(data);
    })
}


exports.selectCom=(req,res)=>{
    var sql='select * from comment where commentId=?';
    db.query(sql,[req.query.id],(err,data)=>{
        if(err){
            return res.send('错误：'+err.message)
        }
        res.send(data);
    })
}