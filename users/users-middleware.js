const jwt=require("jsonwebtoken")
const roles=["basic","admin"]
function restrict(role) {
	return async (req, res, next) => {
		try {
			// express-session will automatically get the session ID from the cookie
			// header, and check to make sure it's valid and the session for this user exists.
			// if (!req.session || !req.session.user) {
			// 	return res.status(401).json({
			// 		message: "Invalid credentials",
			// 	})
		//}
		//	const token=req.headers.authorization
		const token=req.cookies.token
			if(!token){
				return res.status(401).json({
					message:"Invalid credentials"
				})

			}
			jwt.verify(token,"keep it secret,keep it safe",(err,decoded)=>{
				if(err){
					return res.status(401).json({
						message:"Invalid credentials"
					})
				}
			
			//if(role&&decoded.userrole!=role)
			if(role&&roles.indexOf(decoded.userRole)<roles.indexOf(role)){
				return res.status(401).json({
					message:"Invalid credentials",

				})
			}

			next()
		})
		} catch(err) {
			next(err)
		}
	}
}

module.exports = {
	restrict,
}