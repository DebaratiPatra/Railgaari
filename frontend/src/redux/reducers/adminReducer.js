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
  IS_CREATED_STATION_REQUEST,
  IS_CREATED_STATION_SUCCESS,
  IS_CREATED_STATION_FAILED,
  IS_DELETED_STATION_REQUEST,
  IS_DELETED_STATION_SUCCESS,
  IS_DELETED_STATION_FAILED,
  CLEAR,
} from "../consents/adminConsents";

const initialAdminState = {
  loading: false,
  error: null,
  message: null,
};

const initialUserState = {
  allUsers: [],
  singleUser: null,
  loading: false,
  error: null,
};

const initialStationState = {
  loading: false,
  error: null,
  message: null,
};

// Reducer for deleting a user
export const isDeletedUserReducer = (state = initialAdminState, action) => {
  switch (action.type) {
    case IS_DELETED_USER_REQUEST:
      return { ...state, loading: true };
    case IS_DELETED_USER_SUCCESS:
      return { ...state, loading: false, message: action.payload, error: null };
    case IS_DELETED_USER_FAILED:
      return { ...state, loading: false, error: action.payload };
    case CLEAR:
      return { ...state, error: null, message: null };
    default:
      return state;
  }
};

// Reducer for getting all users or a single user
export const getAllUserReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case GET_ALL_USER_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_USER_SUCCESS:
      if (Array.isArray(action.payload)) {
        return { ...state, loading: false, allUsers: action.payload, error: null };
      } else {
        return { ...state, loading: false, singleUser: action.payload, error: null };
      }
    case GET_ALL_USER_FAILED:
      return { ...state, loading: false, error: action.payload };
    case CLEAR:
      return { ...state, error: null };
    default:
      return state;
  }
};

// Reducer for updating a user's role
export const updateRoleReducer = (state = initialAdminState, action) => {
  switch (action.type) {
    case UPDATE_ROLE_REQUEST:
      return { ...state, loading: true };
    case UPDATE_ROLE_SUCCESS:
      return { ...state, loading: false, message: action.payload, error: null };
    case UPDATE_ROLE_FAILED:
      return { ...state, loading: false, error: action.payload };
    case CLEAR:
      return { ...state, error: null, message: null };
    default:
      return state;
  }
};

// Reducer for creating a station
export const isCreatedStationReducer = (state = initialStationState, action) => {
  switch (action.type) {
    case IS_CREATED_STATION_REQUEST:
      return { ...state, loading: true };
    case IS_CREATED_STATION_SUCCESS:
      return { ...state, loading: false, message: action.payload, error: null };
    case IS_CREATED_STATION_FAILED:
      return { ...state, loading: false, error: action.payload };
    case CLEAR:
      return { ...state, error: null, message: null };
    default:
      return state;
  }
};

// Reducer for deleting a station
export const isDeletedStationReducer = (state = initialStationState, action) => {
  switch (action.type) {
    case IS_DELETED_STATION_REQUEST:
      return { ...state, loading: true };
    case IS_DELETED_STATION_SUCCESS:
      return { ...state, loading: false, message: action.payload, error: null };
    case IS_DELETED_STATION_FAILED:
      return { ...state, loading: false, error: action.payload };
    case CLEAR:
      return { ...state, error: null, message: null };
    default:
      return state;
  }
};
