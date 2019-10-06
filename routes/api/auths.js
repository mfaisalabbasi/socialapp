const express = require('express');
const router = express.Router();
const auth  = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

router.get('/',auth, async (req,res)=>{
try{
const user =await User.findById(req.user.id).select('-password');
res.json(user);
}
catch(err){
res.status(500).json('server error');
}
});

//Authenticating LogIn route
router.post('/' ,
[
check('email', 'Valid Email Required').isEmail(),
check('password', 'Need Correct password').exists()
],
async (req,res)=>{
const errors = validationResult(req);
if(!errors.isEmpty()){
return res.status(400).json({errors:errors.array()})}

//checking logics
const {email,password} = req.body;
try {
 const user = await User.findOne({email})
 if(!user){
 return res.status(400).json('Invalid Credentials')
 }
 
 const isMatched = await bcrypt.compare(password,user.password);
 if(!isMatched){
 res.status(400).json('Invalid Credentialss')
 }

//Assigning Token

const payload = {user:{id:user.id}}
jwt.sign(payload, config.get('mySecret'), {expiresIn:36000000} , (err,token)=>{
	if(err) throw err;
res.json({token});
})

}
catch(err){
if(err){
	console.log(err)
	res.status(500).send('Server Error');
}
}
});





module.exports = router;