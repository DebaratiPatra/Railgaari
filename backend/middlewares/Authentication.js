import User from "../models/userModel.js";
import { addTokenToRequest } from "./tokenChecker.js"
import { verifyAccessToken, verifyRefreshToken } from "./tokenVerifier.js";

export const isAuthenticatedAccess = (req,res,next)=> {
        addTokenToRequest(req, res, (err) => {
          if (err) return; // Stop execution if an error response has been sent
      
          verifyAccessToken(req, res, (err) => {
            if (err) return; // Stop execution if an error response has been sent
      
            next();
          });
        });
}
export const isAuthenticatedRefresh = (req,res,next)=> {
    addTokenToRequest(req, res, (err) => {
      if (err) return; // Stop execution if an error response has been sent
  
      verifyRefreshToken(req, res, (err) => {
        if (err) return; // Stop execution if an error response has been sent
  
        next();
      });
    });
}

export const isAuthrorizeRoles =async (req,res,next)=> {
    const username = req.username;
    const user = await User.findOne({username:username});
    if(!user) {
        res.status(401).json({
            message:"User not found"
        })
    }
    if(user.role!=="admin") {
        res.status(401).json({
            message:"admin are allowed only"
        })
    } 
    next();
}