const postModel = require('../models/post.model');
const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;
module.exports.readPost = async (req, res) => {
    const post = await postModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error to get data:' + err);
    });

}
//create post
module.exports.createPost = async (req, res) => {
    const { posterId, message, comments, video, likers } = req.body;
    
    if( req.file != null){
        const {path} = req.file;
    }
    const newPost = new postModel({
        posterId: posterId,
        message: message,
        comments: [],
        picture : req.file != null ? req.file.path : '',
        video: video,
        likers: []
    });
    try {
        const post = await newPost.save();
        return res.status(201).json({ post });

    } catch (err) {
        return res.status(400).json({ err });

    }


}

module.exports.updatePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown:' + req.params.id);
    try {
        const updateRecord = {
            message: req.body.message,
        }

        const post = postModel.findByIdAndUpdate(req.params.id,
            { $set: updateRecord },
            { new: true },
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                else res.status(200).json({ err });
            })


    } catch (err) {
        res.status(200).send({ err });

    }


}
module.exports.deletePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknow:' + req.params.id);

    try {


        await postModel.findByIdAndRemove(req.params.id, (err, docs) => {
            if (!err) res.send({ docs });
            else console.log('fail to delete :' + err);
        });
    } catch (err) {
        res.status(200).send({ err });

    }


}

module.exports.likePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.id))
        return res.status(400).send('ID unknow:' + req.params.id);
    try {
        const post = await postModel.findByIdAndUpdate(req.params.id,
            {
                $addToSet: {
                    likers: req.body.id
                }
            },
            (err, docs) => {
                if (err) res.status(200).send(err);
            }
        );

        const user = await UserModel.findByIdAndUpdate(req.body.id,
            {
                $addToSet: {
                    likes: req.params.id
                }
            },
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                else res.status(200).json(err);
            }
        );

    } catch (err) {
        res.status(200).send({ err });
    }

}
module.exports.unLikePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.id))
        return res.status(400).send('ID unknow:' + req.params.id);
    try {
        const post = await postModel.findByIdAndUpdate(req.params.id,
            {
                $pull: {
                    likers: req.body.id
                }
            },
            (err, docs) => {
                if (err) res.status(200).send(err);
            }
        );

        const user = await UserModel.findByIdAndUpdate(req.body.id,
            {
                $pull: {
                    likes: req.params.id
                }
            },
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                else res.status(200).json(err);
            }
        );

    } catch (err) {
        res.status(200).send({ err });
    }


}

module.exports.commentPost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.commenterId))
        return res.status(400).send('ID unknow:' + req.params.id);
    try {
        return postModel.findByIdAndUpdate(req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text,
                        timestamps: new Date().getTime(),
                    },
                },
            },
            { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));

    } catch (err) {
        res.status(200).json({ err });

    }

}
module.exports.deleteCommentPost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.commentId))
        return res.status(400).send('ID unknow:' + req.params.id);
    try {
        return postModel.findByIdAndUpdate(req.params.id,
            {
                $pull: { comments: { _id: req.body.commentId } }
            },
            { new: true },
            (err, docs) => {
                if (!err) res.status(201).send(docs);
                else res.status(200).send(err);
            })

    } catch (err) {

        return res.status(200).send(err);
    }
}
module.exports.editCommentPost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.commentId))
        return res.status(400).send('ID unknow:' + req.params.id);

    try {
        return postModel.findById(req.params.id, (err, docs) => {
            const theComment = docs.comments.find((comment) =>
                comment._id.equals(req.body.commentId));
            if (!theComment) return res.status(404).send('comment not found');
            //   if (theComment.commenterId.equals(req.body.editerId))
            theComment.text = req.body.text;
            // else return res.status(200).send('impossible de modifier');
            docs.save((err) => {
                if (!err) return res.status(201).send({ docs });
                else return res.status(200).send({ err });
            })


        })

    } catch (err) {

        return res.status(200).send({ err });

    }
}

