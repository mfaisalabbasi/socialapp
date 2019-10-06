const express = require('express');
const {check, validationResult}  = require('express-validator');
const gravatar = require('gravatar');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
//@route post 
//Register User

router.post('/',[
     check('name' , 'Name is required').not().isEmpty(),
     check('email', 'Email is required').isEmail(),
     check('password' , 'Use password More than six aplha.').isLength({min:5})], async (req,res)=>{
	    const errors = validationResult(req);
	    if(!errors.isEmpty()){
	    return res.status(400).json({errors:errors.array()});
	    }

        const {name,email,password} = req.body;
	    try{
	    //checking if user exist....
	    let user = await User.findOne({email});
	    if(user){
	    return res.status(400).json({errors:[{msg:'user Already Exists!!!'}]})
	    }

	    //Getting Gravatar
	    const avatar = gravatar.url(email, {
	    	s:'200',
	    	r:'pg',
	    	d:'mm'
	    });

        user = new User({
        	name,
        	email,
        	avatar,
        	password
        });
        
        const salt = await bcrypt.genSalt(10);
        user.password= await bcrypt.hash(password , salt)
        await user.save();
        
        //implementing jsonwebtoken
        const payload = {user:{id:user.id}}
        
        jwt.sign(payload, config.get('mySecret') , {expiresIn:36000000},
        	(err,token)=>{
        	if(err) throw err;
        	res.json({token})
        	});


	    }catch(err){
        console.log(err);
        res.status(500).send('Server Error Occured!!!')
	    }



		
	});
module.exports = router;