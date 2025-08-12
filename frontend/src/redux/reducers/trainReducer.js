import {
    GET_SHORTEST_PATH_REQUEST, GET_SHORTEST_PATH_SUCCESS, GET_SHORTEST_PATH_FAILED,
    GET_STATION_REQUEST, GET_STATION_SUCCESS, GET_STATION_FAILED,
    GET_ALL_STATION_REQUEST, GET_ALL_STATION_SUCCESS, GET_ALL_STATION_FAILED,
    GET_TRAIN_STATUS_REQUEST, GET_TRAIN_STATUS_SUCCESS, GET_TRAIN_STATUS_FAILED,
    GET_ALL_AVAILABLE_TRAINS_REQUEST, GET_ALL_AVAILABLE_TRAINS_SUCCESS, GET_ALL_AVAILABLE_TRAINS_FAILED,
    CLEAR_GET_SHORTEST_PATH,
    GET_LRU_TRAINS_REQUEST,
    GET_LRU_TRAINS_SUCCESS,
    GET_LRU_TRAINS_FAILED,
    SET_LRU_TRAINS_REQUEST,
    SET_LRU_TRAINS_SUCCESS,
    SET_LRU_TRAINS_FAILED
} from "../consents/trainConsents.js";

const initialTrainState = {
    data: null,
    loading: false,
    error: null,
};

export const getShortestPathReducer = (state = initialTrainState, action) => {
    switch (action.type) {
        case GET_SHORTEST_PATH_REQUEST:
            return { ...state, loading: true };
        case GET_SHORTEST_PATH_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                distanceArray:action.payload.path.resultDistanceArray,
                stationArray:action.payload.path.resultStationArray,
                lineColorArray:action.payload.path.lineColorArray,
                
            };
        case GET_SHORTEST_PATH_FAILED:
            return { ...state, loading: false, error: action.payload };
        case CLEAR_GET_SHORTEST_PATH:
            return {...state,data:null,error:null};
        default:
            return state;
    }
};

export const getStationReducer = (state = initialTrainState, action) => {
    switch (action.type) {
        case GET_STATION_REQUEST:
            return { ...state, loading: true };
        case GET_STATION_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case GET_STATION_FAILED:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const getAllStationReducer = (state = initialTrainState, action) => {
    switch (action.type) {
        case GET_ALL_STATION_REQUEST:
            return { ...state, loading: true };
        case GET_ALL_STATION_SUCCESS:
            return { ...state, loading: false, data: action.payload.stations };
        case GET_ALL_STATION_FAILED:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
export const getSearchHistoryReducer = (state = initialTrainState, action) => {
    switch (action.type) {
        case GET_LRU_TRAINS_REQUEST:
        case SET_LRU_TRAINS_REQUEST:
            return { ...state, loading: true };
        case GET_LRU_TRAINS_SUCCESS:
        case SET_LRU_TRAINS_SUCCESS:
            return { ...initialTrainState, loading: false, data: action.payload };
        case GET_LRU_TRAINS_FAILED:
        case SET_LRU_TRAINS_FAILED:
            return { ...initialTrainState, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const getTrainStatusReducer = (state = initialTrainState, action) => {
    switch (action.type) {
        case GET_TRAIN_STATUS_REQUEST:
            return { ...state, loading: true };
        case GET_TRAIN_STATUS_SUCCESS:
            return { ...initialTrainState, loading: false,error:null, data: action.payload };
        case GET_TRAIN_STATUS_FAILED:
            return { ...initialTrainState, loading: false, data:null, error: action.payload };
        default:
            return state;
    }
};

export const getAllAvailableTrainsReducer = (state = initialTrainState, action) => {
    switch (action.type) {
        case GET_ALL_AVAILABLE_TRAINS_REQUEST:
            return { ...initialTrainState, loading: true };
        case GET_ALL_AVAILABLE_TRAINS_SUCCESS:
            return { ...initialTrainState, loading: false, data: action.payload };
        case GET_ALL_AVAILABLE_TRAINS_FAILED:
            return { ...initialTrainState, loading: false, error: action.payload };
        default:
            return state;
    }
};
