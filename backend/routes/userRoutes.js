import express from "express";
import {
	registerUser, loginUser, logoutUser, updateUser, getMe, forgotPassword, adminDeleteUser,
	addFavouriteRoute, adminGetUser, adminGetAllUsers, updatePassword, updateRoleAdmin, refresh,
	contactUs,
	resetPassword,
	verifyOTP,
	setlruTrains,
	getlruTrains,
	googleLogin
} from "../controllers/userController.js";
import { isAuthenticatedAccess, isAuthenticatedRefresh, isAuthrorizeRoles } from "../middlewares/Authentication.js";
import { rateLimit } from 'express-rate-limit';

const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, 
    max: 5, // Block after 5 failed attempts
    message: {
        success: false,
        message: 'Too many failed login attempts. Please try again after 10 minutes.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

const router = express.Router();

router.route("/register").post(authLimiter,registerUser);
router.route("/login").post(authLimiter,loginUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/verify-otp").post(verifyOTP);
router.route("/reset-password").put(resetPassword);

router.get('/auth/google',authLimiter,googleLogin);

router.route("/logout").get(isAuthenticatedRefresh, logoutUser);
router.route("/update/me").put(isAuthenticatedAccess, updateUser);
router.route("/update/password").put(isAuthenticatedAccess, updatePassword);
router.route("/me").get(isAuthenticatedAccess, getMe);
router.route("/refresh").get(isAuthenticatedRefresh, refresh);
router.route("/save-favourite-route").post(isAuthenticatedAccess, addFavouriteRoute);
router.route("/contact-us").post(isAuthenticatedAccess, contactUs);
router.route("/get-lru-trains").get(isAuthenticatedAccess, getlruTrains);
router.route("/set-lru-trains").post(isAuthenticatedAccess, setlruTrains);


router.route("/admin/delete/:id").delete(isAuthenticatedAccess, isAuthrorizeRoles, adminDeleteUser);
router.route("/admin/getuser/:id").get(isAuthenticatedAccess, isAuthrorizeRoles, adminGetUser);
router.route("/admin/get-all-user").get(isAuthenticatedAccess, isAuthrorizeRoles, adminGetAllUsers);
router.route("/admin/update-role").post(isAuthenticatedAccess, isAuthrorizeRoles, updateRoleAdmin);

export default router;