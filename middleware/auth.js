//verifying token.
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req,res,next)=>{
	//getting token
	const token = req.header('x-auth-token');
	//if token is not
	if(!token){
	res.status(401).json('no token, Authorization Denied!');
	}
	try{
	//verifying token
	const decoded = jwt.verify(token , config.get('mySecret'));
	req.user = decoded.user;
	next()
	}
	catch(err){
	res.status(401).json('token is not Valid')
	}
	
}