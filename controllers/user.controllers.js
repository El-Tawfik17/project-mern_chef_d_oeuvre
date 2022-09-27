const mongoose =require('mongoose');
const { findById } = require('../models/user.model');
const UserModel = require('../models/user.model');
const { signUp } = require('./auth.controllers');
const ObjectID= mongoose.Types.ObjectId;
module.exports.getAllUser= async(req,res)=> {
    const users =await UserModel.find().select('-password');
    res.status(201).json(users);
}

module.exports.userInfo =async(req ,res)=>{
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown:' + req.params.id);
    const user = await UserModel.findById(req.params.id,(err,docs)=>{
        if(!err)res.status(201).send(docs);
        else console.log('ID unknow :' +err);
    }).select('-password');
}
module.exports.updateUser = async(req,res)=>{
    try{
        if(!ObjectID.isValid(req.params.id))
        return res.status(400).send(res);
        const user = await UserModel.findOneAndUpdate({_id : req.params.id},
            {
                $set:{
                    bio : req.body.bio
                }
            },
            {new :true, upsert : true, setDefaultsOnInsert :true},
            (err,docs)=>{
                if(!err)res.status(201).send(docs);
                else res.status(500).send({message : err});
            }

            );

    }catch (err){
        res.status(500).json({message :err});

    }
}
module.exports.delete = async (req,res)=>{
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown:' + req.params.id);
        try{
            await UserModel.remove({_id:req.params.id}).exec();
            res.status(200).json({message:'successfully delete!!!'});


        }catch(err){
            res.status(500).json({message: err});

        }
}

module.exports.follow = async(req, res)=>{
    if(!ObjectID.isValid(req.params.id)|| !ObjectID.isValid(req.body.idToFollow))
    return res.status(400).send('ID unknown:' + req.params.id);
     try{
            //add to follower list
            console.log('id to follow', req.body.idToFollow);
            console.log('id follower', req.params.id);
            await UserModel.findByIdAndUpdate(req.params.id,
                {
                    $addToSet:{following:req.body.idToFollow}
                },
                {new:true,upsert:true},
                (err,docs)=>{
                    if(err) return res.status(400).json({message:err});
                }
                );
                //add to following list
                await UserModel.findByIdAndUpdate(req.body.idToFollow,
                    {
                        $addToSet:{followers:req.params.id
                        }
                    },
                    {new:true,upsert:true
                    },
                    (err,docs)=>{
                        if(!err) return res.status(201).json(docs);
                        if(err) return res.status(400).json({message:err});
                    }
                    );

    }catch(err){
        return res.status(500).json({message:err});

    }


}

module.exports.unFollow = async(req,res)=>{
    if(!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnFollow))
       if(!ObjectID.isValid(req.params.id))
       return res.status(400).send('ID unknown:' + req.params.id);
       else 
       return res.status(400).send('ID unknown:' + req.body.idToUnFollow);
    
    try{
       // remove one following
        await UserModel.findByIdAndUpdate(req.params.id,{
            $pull :{ following : req.body.idToUnFollow}
        },
        {new:true,upsert:true
        },
        (err,docs)=>{
            if(!err)return res.status(201).json(docs);
        }
        );
        //remove follower
        await UserModel.findByIdAndUpdate(req.body.idToUnfollow,{$pull:{follower:req.params.id}},
        {new:true,upsert:true
        },
        (err,docs)=>{if(err)return res.status(400).json({message:err})
        }
        );
    }catch(err){
        return res.status(500).json({message:err});
    }

}