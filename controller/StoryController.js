const User = require('../model/User');
const Story = require('../model/Story')
const { error, success } = require('../utils/Utils');
const cloudinary = require("cloudinary").v2;

const createStoryController = async (req, res) => {
    try {
        const { storyImage } = req.body;
        const owner = req._id;
        console.log(owner,storyImage);
        if (!storyImage) {
            return res.send(error(401, "image is required"));
        }

        const cloudImg = await cloudinary.uploader.upload(storyImage, {
            folder: "postImg",
        });
        const user = await User.findById(req._id);
        const story = await Story.create({
            owner,
            image: {
                publicId: cloudImg.public_id,
                url: cloudImg.url,
            }
        })

        user.story.push(story._id);
        await user.save();
        return res.send(success(200, { story }))

    } catch (e) {
        console.log(e.message);
        res.send(error(500, e.message));
    }
}

const deleteStoryController = async (req, res) => {

    try {
        const { storyId } = req.body;;
        const owner=req._id;

        const curUser=await User.findById(owner);
        const story=await Story.findById(storyId);

        if(!story){
            return res.send(error(404,"story not found"));
        }

        const index=curUser.story.indexOf(storyId);
        curUser.story.splice(index,1);
        await curUser.save();
        await story.remove();

        return res.send(success(201,"story deleted"));
        
    } catch (e) {
      return res.send(error(500,e.message));
    }
}

const getMystoryController=async(req,res)=>{
    try {
        const curUserId=req._id;
        const story= await Story.find({
            owner:curUserId
        }).populate('owner');
    
        return res.send(success(200,{story}));
    } catch (error) {
        return res.send(error(500,e.message));
    }
}

const getStoryOfFollowing =async (req,res) =>{

    try {
        const curUserId=req._id;

        const curUser=await User.findById(curUserId).populate('followings');
    
        // const fullPosts=await Story.find({
        //     'owner':{
        //         '$in': curUser.followings
        //     }
        // }).populate('owner');

        const story=await Story.find({
            'owner':{
                '$in':curUser.followings
            }
        }).populate('owner');
        // console.log("story", story);

        console.log(story,"from story section bro");

        // const posts=fullPosts.map(item =>mapPostOutput(item,req._id)).reverse();
        // curUser.posts=posts;
        const followingsIds=curUser.followings.map(item =>item._id);
        followingsIds.push(req._id);
        const suggestions=await User.find({
            _id:{
                $nin: followingsIds
            }
        })
    
        return res.send(success(200,{...curUser._doc,suggestions,story}));
    } catch (e) {
         return res.send(error(500,e.message));
    }
}

const deleteStoryControllerAgenda=async(req,res)=>{
  try {
    try {
        // Calculate the date and time 24 hours ago
        // const expirationDate = new Date();
        // expirationDate.setHours(expirationDate.getHours() - 12);
        const expirationTimestamp = Date.now() - (24 * 60 * 60 * 1000);
    
        // Use the deleteMany method to remove expired stories
        const result = await Story.deleteMany({ createdAt: { $lt: expirationTimestamp } });
    
        console.log(`Deleted ${result.deletedCount} expired stories.`);
      } catch (error) {
        console.error('Error deleting expired stories:', error);
      }
  } catch (error) {
    
  }
}




module.exports = {
    createStoryController,
    deleteStoryController,
    getMystoryController,
    deleteStoryControllerAgenda,
    getStoryOfFollowing
}