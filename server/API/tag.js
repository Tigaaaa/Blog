let db=require('../db/index')

exports.getTagName=(req,res)=>{
    var sql='select * from tags where find_in_set(tagId,?)';
    db.query(sql,[req.query.ids],(err,data)=>{
        if(err){
            return res.send('错误：'+err.message)
        }
        res.send(data);
    })
}

exports.tagSelect=(req,res)=>{
    var sql='select * from article where tagsId like ? limit ?,?';
    db.query(sql,['%,'+req.query.id+',%',+req.query.offset+req.query.limit],(err,data)=>{
        if(err){
            return res.send('错误：'+err.message)
        }
        res.send(data);
    })
}

exports.getTags=(req,res)=>{
    var sql='select * from tags';
    db.query(sql,(err,data)=>{
        if(err){
            return res.send('错误：'+err.message)
        }
        res.send(data);
    })
}

exports.addTag=(req,res)=>{
    var sql='insert into tags (tagName) values (?)';
    db.query(sql,[req.body.params.name],(err,data)=>{
        if(err){
            return res.send('错误：'+err.message)
        }
        res.send(data);
    })
}