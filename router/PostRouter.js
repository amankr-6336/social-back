const router=require("express").Router();
const postRouter=require('../controller/PostController');
const userRequire=require("../middlewares/UserRequres");

router.post("/",userRequire,postRouter.createPostController);
router.post("/like",userRequire,postRouter.likeAndUnlikePostController);
router.put("/",userRequire,postRouter.updatePostController);
router.delete("/",userRequire,postRouter.deletePostController);


module.exports=router;