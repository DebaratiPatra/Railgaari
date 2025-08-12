import { CLEARUPDATION, CLEARUSER, CONTACT_US_FAILED, CONTACT_US_REQUEST, CONTACT_US_SUCCESS, GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS, GOOGLE_LOGIN_FAILED, GOOGLE_LOGIN_REQUEST, GOOGLE_LOGIN_SUCCESS, USER_FORGOT_PASSWORD_FAILED, USER_FORGOT_PASSWORD_REQUEST,
	USER_FORGOT_PASSWORD_SUCCESS, USER_LOGIN_FAILED, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT_FAILED, 
	USER_LOGOUT_SUCCESS, USER_REGISTER_FAILED, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAILED, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_VERIFY_OTP_FAILED,
	USER_VERIFY_OTP_REQUEST, USER_VERIFY_OTP_SUCCESS } from "../consents/userConsents";

const initialUserState = {
	loading:false,
	isAuthenticated:false,
	isLoggedOut:false,
	user:null,
	error:null
}

export const getUserReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
		case USER_LOGIN_REQUEST:
		case GET_USER_REQUEST:
		case GOOGLE_LOGIN_REQUEST:
			return {
				loading:true,
				isAuthenticated:false,
				user:null
			}
		case USER_REGISTER_SUCCESS:
		case USER_LOGIN_SUCCESS:
		case GET_USER_SUCCESS:
		case GOOGLE_LOGIN_SUCCESS:
			return {
				loading:false,
				isAuthenticated:true,
				user:action.payload
			}
		case USER_REGISTER_FAILED:
		case USER_LOGIN_FAILED:
		case GET_USER_FAILED:
		case GOOGLE_LOGIN_FAILED:
			return {
				...state,
				loading:false,
				error:action.payload
			}

		case USER_LOGOUT_SUCCESS: 
			return {
				...initialUserState,
				isLoggedOut:true
			}
		case USER_LOGOUT_FAILED:
			return {
				...state,
				error:action.payload
			}
		case CLEARUSER:
			return initialUserState;
		default:
			return state;
	}
};

const initialUpdateState = {
	loading:false,
	email:null,
	isForgotPassword:false,
	isUpdated:false,
	isotpVerified:false,
	isMessageSent:false,
	error:null
}

export const isUpdatedUserReducer = (state = initialUpdateState, action) => {
	switch (action.type) {
		case USER_FORGOT_PASSWORD_REQUEST:
		case USER_VERIFY_OTP_REQUEST:
		case USER_UPDATE_REQUEST:
		case CONTACT_US_REQUEST:
			return {
				...state,
				loading:true,
			}
		case USER_FORGOT_PASSWORD_SUCCESS:
			return {
				...initialUpdateState,
				isForgotPassword:true,
				email:action.payload
			}
		case USER_VERIFY_OTP_SUCCESS:
			return {
				...initialUpdateState,
				isotpVerified:true,
				email:action.payload
			}
		case USER_UPDATE_SUCCESS:
			return{
				...initialUpdateState,
				isUpdated:true
			}
		case CONTACT_US_SUCCESS:
			return {
				...state,
				loading:false,
				isMessageSent:true
			}
		case USER_FORGOT_PASSWORD_FAILED:
		case USER_VERIFY_OTP_FAILED:
		case USER_UPDATE_FAILED:
		case CONTACT_US_FAILED:
			return {
				...initialUpdateState,
				error:action.payload
			}
		case CLEARUPDATION:
			return initialUpdateState;
		default:
			return state;
	}
};
