import { configureStore } from '@reduxjs/toolkit'

import { 
getShortestPathReducer, getStationReducer, getAllStationReducer,
getTrainStatusReducer, getAllAvailableTrainsReducer, getSearchHistoryReducer
 } from './reducers/trainReducer.js'

 import { 
  isDeletedUserReducer, getAllUserReducer, isDeletedStationReducer, isCreatedStationReducer
 } from './reducers/adminReducer.js'

import { getUserReducer, isUpdatedUserReducer } from './reducers/userReducer.js'

const store = configureStore({
  reducer: {
    GetUser: getUserReducer,
    GetAllUser: getAllUserReducer,
    GetShortestPath: getShortestPathReducer,
    GetStation: getStationReducer,
    GetAllStation: getAllStationReducer,
    GetSearchHistory:getSearchHistoryReducer,
    GetTrainStatus: getTrainStatusReducer,
    GetAllAvailableTrains: getAllAvailableTrainsReducer,

    IsUpdatedUser: isUpdatedUserReducer,
    IsDeletedUser: isDeletedUserReducer,
    IsDeletedStation: isDeletedStationReducer,
    IsUpdatedStation: isDeletedStationReducer,
    IsCreatedStation: isCreatedStationReducer
  }
})

export default store






//rtk query with redux toolkit

// import { configureStore } from '@reduxjs/toolkit';
// import { userApi } from './apis/userApis.js';
// import { adminApi } from './apis/adminApis.js';
// import {stationApi} from './apis/trainApis.js';


// const store = configureStore({
//   reducer: {
//     [userApi.reducerPath]: userApi.reducer,
//     [adminApi.reducerPath]: adminApi.reducer,
//     [stationApi.reducerPath]: stationApi.reducer
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(userApi.middleware),
// });

// export default store;
