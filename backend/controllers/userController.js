import blackListedToken from "../models/blackListedToken.js";
import User from "../models/userModel.js";
import { redisClient } from "../index.js";
import CustomError from "../utils/customError.js";
import { OauthClient } from "../utils/googleConfig.js";
import { newAccessToken, signUser } from "../utils/jwt.helper.js";
import { sendEmail } from "../utils/sendMail.js";
import axios from 'axios'
export const sendToken = (res, user, accessToken, refreshToken) => {
    res.status(201).json({
        success: true,
        accessToken: accessToken,
        refreshToken: refreshToken,
        user
    });
};

const contactUs = async (req, res) => {
    try {
        const { email, subject, message } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new CustomError("Enter valid email id");
        }
        const username = req.username;
        await sendEmail(process.env.ADMIN_EMAIL, subject, message);
        const UserMailSubject = `Thank you ${username} for your Feedback`;
        const UserMailMessage = `
            <p>Dear ${username},</p>
            <p>Thank you for providing your valuable feedback regarding our website. We appreciate your input and will review the matter you've raised: <strong>${message}</strong>.</p>
            <p>We aim to continuously improve our services and your feedback helps us in this process.</p>
            <p>For any further assistance, please visit the <a href="">Contact Us</a> section on our website.</p>
            <p>Kind regards,</p>
            <p>Smart Transportation Team</p>
            <br/>
            <p><strong>Note:</strong> This is an automated message. Please do not reply to this email.</p>
        `;
        await sendEmail(email, UserMailSubject, UserMailMessage);
        res.status(200).json({
            success: true,
            message: "mail sent to the user"
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

const forgotPassword = async (req, res, next) => {
    try {
        const { email, phoneNo, username } = req.body;
        let user;

        if (email) user = await User.findOne({ email });
        else if (phoneNo) user = await User.findOne({ phoneNumber: phoneNo });
        else if (username) user = await User.findOne({ username });
        else throw new CustomError("Enter email, phone number, or username");

        if (!user) throw new CustomError("User does not exist");

        const OTP = generateOTP();
        const subject = 'Your One-Time Password (OTP)';
        const message = `Your OTP for verification is ${OTP}.`;

        const htmlContent = `
            <h1>Verification Code</h1>
            <p>Your OTP for verification is:</p>
            <h2>${OTP}</h2>
            <p>This code is valid for 10 minutes. Please do not share it with anyone.</p>
            <p>If you did not request this OTP, please ignore this email or contact support.</p>
            <br/>
            <p>For further assistance, visit the <a href="">Contact Us</a> section on our website.</p>
            <p><strong>Note:</strong> This is an automated message. Please do not reply to this email.</p>
        `;
        await sendEmail(user.email, subject, message, htmlContent);
        user.otp = OTP;
        await user.save();

        res.status(200).json({
            success: true,
            email: user.email,
            message: "OTP sent to your email"
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        });
    }
};

const registerUser = async (req, res, next) => {
    try {
        const { username, phoneNumber, email, password, city, nearestRailStation, nearestMetroStation } = req.body;
        const existUser = await User.findOne({ username: username });
        if (existUser) {
            throw new CustomError("User already exists with your credentials");
        }
        const user = await User.create(req.body);
        const { accessToken, refreshToken } = signUser(user.username);
        await sendEmail(
            user.email,
            "Welcome to Smart Transportation – Explore Our Best Features!",
            'Thank you for registering on our platform! Enjoy real-time tracking, seamless connectivity, and an efficient user-friendly interface.',
            `
                <h1>Welcome to Our Smart Transportation System!</h1>
                <p>Dear ${user.username},</p>
                <p>We are thrilled to have you on board. Here are the top 3 features you will love:</p>
                <ul>
                    <li>Real-Time Tracking</li>
                    <li>Seamless Connectivity</li>
                    <li>User-Friendly Interface</li>
                </ul>
                <p>For any help or inquiries, please visit the <a href="">Contact Us</a> section on our website.</p>
                <br/>
                <p><strong>Note:</strong> This is an automated message. Please do not reply to this email.</p>
            `
        );
        sendToken(res, user, accessToken, refreshToken);
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        });
    }
};

const googleLogin = async (req, res) => {
    try {
        const { code } = req.query;
        const googleRes = await OauthClient.getToken(code);
        OauthClient.setCredentials(googleRes.tokens);
        const { data } = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)
        const { email, name, picture } = data;
        let user = await User.findOne({ email: email });
        if (!user) {
            user = await User.create({
                username: name,
                email: email,
                imageUrl: picture,
                isEmailVerified: true
            })
            await sendEmail(
                user.email,
                "Welcome to Smart Transportation – Explore Our Best Features!",
                'Thank you for registering on our platform! Enjoy real-time tracking, seamless connectivity, and an efficient user-friendly interface.',
                `
                    <h1>Welcome to Our Smart Transportation System!</h1>
                    <p>Dear ${user.username},</p>
                    <p>We are excited to have you on board. Here are the top 3 features you will love:</p>
                    <ul>
                        <li>Real-Time Tracking</li>
                        <li>Seamless Connectivity</li>
                        <li>User-Friendly Interface</li>
                    </ul>
                    <p>If you need assistance, visit the <a href="">Contact Us</a> section on our website.</p>
                    <br/>
                    <p><strong>Note:</strong> This is an automated message. Please do not reply to this email.</p>
                `
            );
        }

        const { accessToken, refreshToken } = signUser(user.username);
        sendToken(res, user, accessToken, refreshToken);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const refresh = async (req, res) => {
    try {
        const { username } = req;
        const { accessToken } = newAccessToken(username);

        res.status(200).json({
            success: true,
            accessToken: accessToken,
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        });
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, phoneNo, username, password } = req.body;
        let user;

        if (email) user = await User.findOne({ email: email });
        else if (phoneNo) user = await User.findOne({ phoneNumber: phoneNo });
        else if (username) user = await User.findOne({ username: username });
        else throw new CustomError("Enter credentials");

        if (!user) throw new CustomError("User does not exist");

        const checkPassword = await user.comparePassword(password);
        if (!checkPassword) throw new CustomError("Invalid credentials");

        const { accessToken, refreshToken } = signUser(user.username);
        sendToken(res, user, accessToken, refreshToken);
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        });
    }
};

const logoutUser = async (req, res, next) => {
    try {
        const token = req.token;
        const newToken = await blackListedToken.create({
            token: token
        });
        await redisClient.del(`user:${req.username}`);
        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        });
    }
};

const updateUser = async (req, res, next) => {
    try {
        const updates = req.body;
        const user = await User.findOneAndUpdate({ username: req.username }, updates, {
            new: true,
        });
        await redisClient.del(`user:${req.username}`);
        const { accessToken, refreshToken } = signUser(user.username);
        res.status(200).json({
            success: true,
            accessToken: accessToken,
            refreshToken: refreshToken,
            user,
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        });
    }
};

const updatePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findOne({ username: req.username });

        if (!oldPassword) throw new CustomError("Enter old password");
        const checkPassword = await user.comparePassword(oldPassword);
        if (!checkPassword) throw new CustomError("Enter valid old password");

        user.password = newPassword;
        await user.save();

        const { accessToken, refreshToken } = signUser(user.username);
        sendToken(res, user, accessToken, refreshToken);
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
const getMe = async (req, res) => {
    try {
        const username = req.username;

        let cachedUser = await redisClient.get(`user:${username}`);
        if (cachedUser !== null) {
            return res.status(200).json({
                success: true,
                user: JSON.parse(cachedUser),
            });
        }

        const user = await User.findOne({ username: username })
            .populate('nearestRailStation', 'station_name')
            .populate('nearestMetroStation', 'station_name')
            .populate({
                path: 'favouriteRoutes',
                populate: [
                    { path: 'source', select: 'station_name -_id' },
                    { path: 'destination', select: 'station_name -_id' }
                ]
            })
            .select(['-password', '-otp']);

        if (!user) {
            throw new CustomError("User not found");
        }

        await redisClient.set(`user:${username}`, JSON.stringify(user));
        await redisClient.expire(`user:${username}`, 60 * 15);

        res.status(200).json({
            success: true,
            user,
        });

    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        });
    }
};



const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
};

const resetPassword = async (req, res, next) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new CustomError("Please provide correct email")
        }
        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        });
    }
};

const verifyOTP = async (req, res, next) => {
    try {
        const { email, otp } = req.body
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new CustomError("Please provide correct email")
        }

        if (user.otp !== otp) throw new CustomError("Enter valid OTP");

        res.status(200).json({
            success: true,
            email: user.email,
            message: "OTP verified successfully"
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }

}
const adminDeleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if (!user) throw new CustomError("User does not exist");

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        });
    }
};

const adminGetUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) throw new CustomError("User does not exist");

        res.status(200).json({
            success: true,
            user,
        });
    } catch (e) {
        res.status(404).json({
            success: false,
            message: e.message,
        });
    }
};

const adminGetAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, ['username', 'email']);
        res.status(200).json({
            success: true,
            users,
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        });
    }
};

const updateRoleAdmin = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findById(id);

        if (!user) throw new CustomError("User does not exist");

        user.role = "admin";
        await user.save();

        res.status(200).json({
            success: true,
            message: "User Updated to admin",
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};


const addFavouriteRoute = async (req, res) => {
    try {
        const { source, destination } = req.body;

        if (!source || !destination) {
            throw new CustomError("Enter source and destination");
        }

        const user = await User.findOne({ username: req.username });
        if (!user) {
            throw new CustomError("User not found");
        }

        user.favouriteRoutes.push({ source, destination });

        await user.save();
        await redisClient.del(`user:${user.username}`);

        res.status(200).json({
            success: true,
            message: "Route added to favourite routes",
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};




const setlruTrains = async (req, res) => {
    try {
        const username = req.username;
        const train = req.body.train;
        const user = await User.findOne({ username: username })
        let trains = user.lruTrains
        if (trains.indexOf(train) !== -1) {
            trains.splice(trains.indexOf(train), 1);
        }
        if (trains.length === 5) {
            trains.pop();
        }
        trains.unshift(train);
        user.lruTrains = trains;
        await user.save()
        res.status(200).json({
            success: true,
            message: "lru trains changed successfully",
            trains
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}
const getlruTrains = async (req, res) => {
    try {
        const username = req.username;
        const user = await User.findOne({ username: username })
        const trains = user.lruTrains
        res.status(200).json({
            success: true,
            message: "LRU stations found successfully",
            trains
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}
export {
    registerUser,
    loginUser,
    refresh,
    logoutUser,
    updateUser,
    updatePassword,
    resetPassword,
    verifyOTP,
    getMe,
    forgotPassword,
    adminDeleteUser,
    adminGetUser,
    updateRoleAdmin,
    adminGetAllUsers,
    addFavouriteRoute,
    contactUs,
    getlruTrains,
    setlruTrains,
    googleLogin
};
