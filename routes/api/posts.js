const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check,validationResult} = require('express-validator');
const User = require('../../models/User');
const Post = require('../../models/Post');


//@route post /api/post
//@desc adding post
//@access private

router.post('/',[auth,[
    check('text','text is required').not().isEmpty()
	]],
	async (req,res)=>{
    const errors = validationResult(req);
  if(!errors.isEmpty()){
  return res.status(400).json({errors:errors.array()})
  }

		try{

      const user = await User.findById(req.user.id).select('-password');
  
			        const addPost = new Post({
            	name:user.name,
            	avatar:user.avatar,
            	text:req.body.text,
            	user:req.user.id
            });
            const post = await addPost.save();
            res.json(post);
        }catch(err){
			console.log(err);
			res.status(500).json('server error')
		}
	
	});


  //@route  get /api/post
  //@desc   getting all post
  //@access private
  router.get('/', auth, async (req,res)=>{
  	try{
  		const post = await Post.find().sort({date:-1})
  		if(!post){
  			return res.status(400).json('post not found')
  		}
  		res.json(post)
  	}catch(err){
  		console.log(err);
  		res.status(500).json('Server Error')
  	}
  });

  //@route get /api/get/:id
  //@desc  getting post by id
  //@access private
  router.get('/:id',auth, async (req,res)=>{
  	try{
  		const post = await Post.findById(req.params.id);
  		if(!post){
  			return res.status(400).json('post not found')
  		}
  		res.json(post);
  	}catch(err){
  		console.error(err);
  		if(err.kind==='ObjectId'){
  			res.status(400).json('profile not found!')
  		}
  		res.status(500).json('server not found')
  	}
  });

  //@route Delete /api/post/:id
  //@desc  deleting the post
  //@access private
router.delete('/:id', auth , async (req,res)=>{
	try{
		const post = await Post.findById(req.params.id);
		if(post.user.toString()!==req.user.id){
			return res.status(401).json('unAuthorised')
		}
        await post.remove();
        res.json({msg:'post has been deleted!'})
	}catch(err){
		console.error(err);
		if(err.kind=='ObjectId'){
			res.status(400).json('post not found')
		}
		res.status(500).json('Server Error!')
	}
})

//@route  put /api/post/like/:id
//@desc   Adding Like to post
//@access private

router.put('/like/:id', auth , async (req,res)=>{
	try{
		const post = await Post.findById(req.params.id);
		if(post.likes.filter(like => like.user.toString()===req.user.id).length>0)
		{
			return res.status(400).json('post is Already been Liked')
		}
		 post.likes.unshift({user:req.user.id});
		 await post.save();
		res.json(post.likes);

	}catch(err){
		console.log(err);
		res.status(500).json('Server Error')
	}
})

//@route put /api/post/unlike/:id
//@desc unliking the post or deleting like
//@access private

router.put('/unlike/:id',auth,async (req,res)=>{
	try{

		const post = await Post.findById(req.params.id);
		if(post.likes.filter(like=>like.user.toString()===req.user.id).length===0){
			return res.status(400).json('post not been liked yet')
		}
		const removeLike = post.likes.map(liked=>liked.user.toString()).indexOf(req.params.id);
		post.likes.splice(removeLike,1);
		await post.save();
		res.json(post.likes);
 

	}catch(err){
		console.log(err);
		res.status(500).json('Server Error');
	}
})

//@route   post /api/post/comment/:id
//@desc    adding comment on post
//@access  private

router.post('/comment/:id',[auth,[
    check('text','text is required').not().isEmpty()
  ]],
  async (req,res)=>{
    const errors = validationResult(req);
  if(!errors.isEmpty()){
  return res.status(400).json({errors:errors.array()})
  }

    try{

      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);
              const addComment = {
              name:user.name,
              avatar:user.avatar,
              text:req.body.text,
              user:req.user.id
            };
            post.comments.unshift(addComment);
            await post.save();
            res.json(post);
        }catch(err){
      console.log(err);
      res.status(500).json('server error')
    }
  
  });


  //@route   delete /api/post/comment/:id/:com_id
  //@desc deleting comments
  //@access private

  router.delete('/comment/:id/:com_id',auth, async (req,res)=>{
  	try{
  		const post = await Post.findById(req.params.id);

  		const comment = post.comments.find(com => com.id===req.params.com_id);
  		if(!comment){
  			return res.status(404).json('comment not found')
  		}
  		if(comment.user.toString()!==req.user.id){
  			return res.status(401).json('unAuthorised ')
  		}

  		const delCom = post.comments.map(comment =>comment.user.toString()).indexOf(req.user.id);
  		post.comments.splice(delCom);
  		await post.save();
  		res.json(post.comments);

  	}catch(err){
  		console.log(err);
  		res.status(500).json('server error')
  	}
  })









module.exports = router;