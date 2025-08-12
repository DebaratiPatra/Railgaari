import axios from "axios";
import {
  IS_DELETED_USER_REQUEST,
  IS_DELETED_USER_SUCCESS,
  IS_DELETED_USER_FAILED,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAILED,
  UPDATE_ROLE_REQUEST,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_FAILED,
  CLEAR,
  IS_DELETED_STATION_REQUEST,
  IS_CREATED_STATION_REQUEST,
  IS_CREATED_STATION_SUCCESS,
  IS_CREATED_STATION_FAILED,
  IS_DELETED_STATION_SUCCESS,
  IS_DELETED_STATION_FAILED
} from "../consents/adminConsents";
import CustomError from "../../customError.js";
import { getAccessToken } from "../../utils/jwt.helper.js";

const backendUrlUser = "https://smart-transportaion-system.onrender.com/user";
const backendUrlStation = "https://smart-transportaion-system.onrender.com/station";


export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: IS_DELETED_USER_REQUEST });
    
    const config = {
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    };

    const { data } = await axios.delete(`${backendUrlUser}/admin/delete/${id}`, config);
    if (!data.success) {
      throw new CustomError(data.message);
    }

    dispatch({ type: IS_DELETED_USER_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: IS_DELETED_USER_FAILED,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Action to get all users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_USER_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    };

    const { data } = await axios.get(`${backendUrlUser}/admin/get-all-user`, config);
    if (!data.success) {
      throw new CustomError(data.message);
    }

    dispatch({ type: GET_ALL_USER_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({
      type: GET_ALL_USER_FAILED,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
// Action to get all users
export const getSingleUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_USER_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    };

    const { data } = await axios.get(`${backendUrlUser}/admin/getuser/${id}`, config);
    if (!data.success) {
      throw new CustomError(data.message);
    }

    dispatch({ type: GET_ALL_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: GET_ALL_USER_FAILED,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


export const updateRoleAdmin = (id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ROLE_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    };

    const { data } = await axios.post(
      `${backendUrlUser}/admin/update-role`,
      { id },
      config
    );
    if (!data.success) {
      throw new CustomError(data.message);
    }

    dispatch({ type: UPDATE_ROLE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: UPDATE_ROLE_FAILED,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
export const createStation = (stations) => async (dispatch) => {
  try {
    dispatch({ type: IS_CREATED_STATION_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    };

    const { data } = await axios.post(`${backendUrlStation}/admin/station-create`, stations, config);

    if (data.errors && data.errors.length) {
      throw new CustomError(data.errors.join(", "));
    }

    dispatch({ type: IS_CREATED_STATION_SUCCESS, payload: data.successes });

  } catch (error) {
    dispatch({ type: IS_CREATED_STATION_FAILED, payload: error.response?.data?.message || error.message });
  }
};

export const deleteStation = (stationNames) => async (dispatch) => {
  try {
    dispatch({ type: IS_DELETED_STATION_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    };

    const { data } = await axios.delete(`${backendUrlStation}/admin/station-delete`, {
      headers: config.headers,
      data: { station_names: stationNames },
    });

    dispatch({ type: IS_DELETED_STATION_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ type: IS_DELETED_STATION_FAILED, payload: error.response?.data?.message || error.message });
  }
};
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR });
};
