const router =require('express').Router();
const postController = require('../controllers/post.controller'); 
const uploadController =require('../controllers/upload.controller');
const multer = require('multer');
const{v4:uuidv4} = require('uuid');
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./client/public/uploads/post');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + uuidv4() + file.originalname); 
    }
});
const fileFilter = (req,file,cb)=>{
    if(file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}

const upload = multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:fileFilter
});
router.get('/',postController.readPost);
router.post('/',upload.single('file'),postController.createPost);
router.put('/:id',postController.updatePost);
router.delete('/:id',postController.deletePost);
router.patch('/like-post/:id',postController.likePost);
router.patch('/unlike-post/:id',postController.unLikePost);

//comments
router.patch('/comment-post/:id',postController.commentPost);

router.patch('/delete-post-comment/:id',postController.deleteCommentPost);
router.patch('/edit-post-comment/:id',postController.editCommentPost);

//upload
// router.post('/upload',upload.single('file'),uploadController.uploadProfil);



module.exports =router;