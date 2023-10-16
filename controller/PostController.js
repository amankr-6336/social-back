const Post = require("../model/Post");
const User = require("../model/User");
const { success, error } = require("../utils/Utils");
const { mapPostOutput } = require("../utils/responseWrapper");
const cloudinary = require("cloudinary").v2;

const createPostController = async (req, res) => {
  try {
    const { caption, postImg } = req.body;
    const owner = req._id;

    if (!caption || !postImg) {
      return res.send(error(401, "all field are required"));
    }

    const cloudImg = await cloudinary.uploader.upload(postImg, {
      folder: "postImg",
    });

    const user = await User.findById(req._id);
    const post = await Post.create({
      owner,
      caption,
      image: {
        publicId: cloudImg.public_id,
        url: cloudImg.url,
      },
    });

    user.posts.push(post._id);
    await user.save();
    // console.log("user", user);
    // console.log("post", post);
    return res.send(success(200, {post}));
  } catch (e) {
    res.send(error(500, e.message));
  }
};

const likeAndUnlikePostController = async (req, res) => {
  try {
    const { postId } = req.body;
    const currUserId = req._id;

    const post = await Post.findById(postId).populate('owner');
    if (!post) {
      return res.send(error(404, "post not found"));
    }

    if (post.likes.includes(currUserId)) {
      const index = post.likes.indexOf(currUserId);
      post.likes.splice(index, 1);

     
    } else {
      post.likes.push(currUserId);
    }

    await post.save();
    return res.send(success(200,{post : mapPostOutput(post,req._id)}));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const updatePostController = async (req, res) => {
  try {
    const { postId, caption } = req.body;
    const curUserId = req._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.send(error(404, "post not found"));
    }

    if (post.owner.toString() !== curUserId) {
      return res.send(error(403, "only owner can update the post"));
    }

    if (caption) {
      post.caption = caption;
    }

    await post.save();

    return res.send(success(201, { post }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const deletePostController = async (req, res) => {
  try {
    const { postId } = req.body;
    const curUserId = req._id;

    const post = await Post.findById(postId);

    const curUser = await User.findById(curUserId);

    if (!post) {
      return res.send(error(404, "post not found"));
    }

    if (post.owner.toString() !== curUserId) {
      return res.send(error(403, "only owner can update the post"));
    }

    const index = curUser.posts.indexOf(postId);
    curUser.posts.splice(index, 1);
    await curUser.save();
    await post.remove();

    return res.send(success(201, "post deleted"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

module.exports = {
  createPostController,
  likeAndUnlikePostController,
  updatePostController,
  deletePostController,
};