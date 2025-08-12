import axios from "axios";
import {
    CLEARUSER,
    CLEARUPDATION,
    GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS,
    USER_FORGOT_PASSWORD_FAILED,
    USER_FORGOT_PASSWORD_REQUEST,
    USER_FORGOT_PASSWORD_SUCCESS,
    USER_LOGIN_FAILED,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_FAILED,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_REGISTER_FAILED,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_FAILED,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_VERIFY_OTP_FAILED,
    USER_VERIFY_OTP_REQUEST,
    USER_VERIFY_OTP_SUCCESS,
    CONTACT_US_REQUEST,
    CONTACT_US_SUCCESS,
    CONTACT_US_FAILED,
    GOOGLE_LOGIN_REQUEST,
    GOOGLE_LOGIN_SUCCESS,
    GOOGLE_LOGIN_FAILED
} from "../consents/userConsents";
import CustomError from "../../customError.js";
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from "../../utils/jwt.helper.js";

export const userBackendUrl = "https://smart-transportaion-system.onrender.com/user"

export const setToken = (accessToken, refreshToken) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
}
export const registerUserAction = (registrationCredentials) => async (dispatch) => {
    try {
        const link = userBackendUrl + "/register";
        dispatch({
            type: USER_REGISTER_REQUEST,
        });
        const config = { headers: { "Content-type": "application/json" } };
        const data = (await axios.post(link, registrationCredentials, config)).data;
        if (!data.success) {
            throw new CustomError(data.message);
        }
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data.user,
        });
        setToken(data.accessToken, data.refreshToken);
    } catch (err) {
        dispatch({
            type: USER_REGISTER_FAILED,
            payload: err.response.data.message,
        });
    }
};

export const loginUserAction = (loginCredentials) => async (dispatch) => {
    try {
        const link = userBackendUrl + "/login";
        dispatch({
            type: USER_LOGIN_REQUEST,
        });
        const config = { headers: { "Content-type": "application/json" } };
        const data = (await axios.post(link, loginCredentials, config)).data;
        if (!data.success) {
            throw new CustomError(data.message);
        }
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data.user,
        });
        setToken(data.accessToken, data.refreshToken);
    } catch (err) {
        dispatch({
            type: USER_LOGIN_FAILED,
            payload: err.response.data.message,
        });
    }
};

export const verifyOTPAction = (verifyOTPCredentials) => async (dispatch) => {
    try {
        const link = userBackendUrl + "/verify-otp";
        dispatch({
            type: USER_VERIFY_OTP_REQUEST,
        });
        const config = { headers: { "Content-type": "application/json" } };
        const data = (await axios.post(link, verifyOTPCredentials, config)).data;
        if (!data.success) {
            throw new CustomError(data.message);
        }
        dispatch({
            type: USER_VERIFY_OTP_SUCCESS,
            payload: data.email,
        });
    } catch (err) {
        dispatch({
            type: USER_VERIFY_OTP_FAILED,
            payload: err.response.data.message,
        });
    }
};

export const putUserUpdate = (userUpdateCredentials) => async (dispatch) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST,
        });
        const accessToken = await getAccessToken();
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const link = userBackendUrl + "/update/me";
        const data = (await axios.put(link, userUpdateCredentials, config)).data;
        if (!data.success) {
            throw new CustomError(data.message);
        }

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data.user,
        });
        setToken(data.accessToken, data.refreshToken);
    } catch (err) {
        dispatch({
            type: USER_UPDATE_FAILED,
            payload: err.response.data.message,
        });
    }
};

export const putUserUpdatePassword = (userPasswordUpdateCredentials) => async (dispatch) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST,
        });
        const accessToken = await getAccessToken();
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const link = userBackendUrl + "/update/password";
        const data = (await axios.put(link, userPasswordUpdateCredentials, config)).data;
        if (!data.success) {
            throw new CustomError(data.message);
        }

        dispatch({
            type: USER_UPDATE_SUCCESS,
        });
        setToken(data.accessToken, data.refreshToken);
    } catch (err) {
        dispatch({
            type: USER_UPDATE_FAILED,
            payload: err.response.data,
        });
    }
};


export const googleLoginAction = (code) => async (dispatch) => {
    try {
        dispatch({ type: GOOGLE_LOGIN_REQUEST });

        const { data } = await axios.get(`${userBackendUrl}/auth/google?code=${code}`);

        dispatch({
            type: GOOGLE_LOGIN_SUCCESS,
            payload: data.user,
        });
        setToken(data.accessToken, data.refreshToken);

    } catch (error) {
        dispatch({
            type: GOOGLE_LOGIN_FAILED,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });

    }
};

export const logoutUserAction = () => async (dispatch) => {
    try {
        const link = userBackendUrl + "/logout";
        dispatch({
            type: USER_LOGOUT_REQUEST
        })
        const refreshToken = getRefreshToken();
        const config = {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            }
        };
        const data = (await axios.get(link, config)).data;
        if (!data.success) {
            throw new CustomError(data.message);
        }
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        dispatch({
            type: USER_LOGOUT_SUCCESS,
        })
    } catch (err) {
        dispatch({
            type: USER_LOGOUT_FAILED,
            payload: err.response.data.message
        })
    }
}
export const forgotPasswordAction = (forgotPasswordCredentials) => async (dispatch) => {
    try {
        dispatch({
            type: USER_FORGOT_PASSWORD_REQUEST
        })
        const config = { headers: { "Content-type": "application/json" } };
        var link = userBackendUrl + "/forgot-password";
        const data = (await axios.post(link, forgotPasswordCredentials, config)).data;
        if (!data.success) {
            throw new CustomError(data.message);
        }
        dispatch({
            type: USER_FORGOT_PASSWORD_SUCCESS,
            payload: data.email
        })

    } catch (err) {
        dispatch({
            type: USER_FORGOT_PASSWORD_FAILED,
            payload: err.response.data.message
        })
    }
}
export const resetPasswordAction = (resetPasswordCredentials) => async (dispatch) => {
    try {
        const link = userBackendUrl + "/reset-password";
        dispatch({
            type: USER_UPDATE_REQUEST
        })
        const config = { headers: { "Content-type": "application/json" } };
        const data = (await axios.put(link, resetPasswordCredentials, config)).data;
        if (!data.success) {
            throw new CustomError(data.message);
        }
        dispatch({
            type: USER_UPDATE_SUCCESS,
        })
        setToken(data.accessToken, data.refreshToken);
    } catch (err) {
        dispatch({
            type: USER_UPDATE_FAILED,
            payload: err.response.data.message
        })
    }
}
export const getProfileAction = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_USER_REQUEST
        })
        const accessToken = await getAccessToken();
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const link = userBackendUrl + "/me";
        const data = (await axios.get(link, config)).data;
        if (!data.success) {
            throw new CustomError(data.message);
        }

        dispatch({
            type: GET_USER_SUCCESS,
            payload: data.user
        })
    } catch (err) {
        dispatch({
            type: GET_USER_FAILED,
            payload: err.response.data.message
        })
    }
}


export const contactUsAction = (body) => async (dispatch) => {
    try {
        dispatch({
            type: CONTACT_US_REQUEST
        })
        const accessToken = await getAccessToken();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const link = userBackendUrl + "/contact-us";
        const data = (await axios.post(link, body, config)).data;
        if (!data.success) {
            throw new CustomError(data.message);
        }

        dispatch({
            type: CONTACT_US_SUCCESS,
            payload: data.success
        })
    } catch (err) {
        dispatch({
            type: CONTACT_US_FAILED,
            payload: err.response.data.message
        })
    }
}
export const addFavouriteRoute = (credentials) => async (dispatch) => {
    try {
        const accessToken = await getAccessToken();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const response = await axios.post(`${userBackendUrl}/save-favourite-route`, credentials,config);
        dispatch({ type: 'ADD_FAVOURITE_ROUTE_SUCCESS' });
    } catch (error) {
        dispatch({ type: 'ADD_FAVOURITE_ROUTE_ERROR' });
    }
};

export const clearUsers = () => async (dispatch) => {
    dispatch({
        type: CLEARUSER
    })
}
export const clearUpdation = () => async (dispatch) => {
    dispatch({
        type: CLEARUPDATION
    })
}   