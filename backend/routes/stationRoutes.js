import express from 'express';
import {
    createStation, getRoute, getAllStations, getTrainDetails,
    getTrainInBetweenStations, getDatabaseStationDetails,
    deleteStation, getTrainList, updateStation,
    getTrainRoute,
} from '../controllers/stationController.js';

import { isAuthenticatedAccess, isAuthrorizeRoles } from '../middlewares/Authentication.js';
const router = express.Router();

router.route('/admin/station-create').post(isAuthenticatedAccess, isAuthrorizeRoles, createStation);
router.route('/admin/station-delete').delete(isAuthenticatedAccess, isAuthrorizeRoles, deleteStation);


router.route('/get-route').post(getRoute);
router.route('/get-train-details').get(getTrainDetails);
router.route('/get-train-routes').get(getTrainRoute);
router.route('/get-station-database-details/:stationName').get(getDatabaseStationDetails);
router.route('/get-all-stations').get(getAllStations);
router.route('/get-train-between').post(getTrainInBetweenStations);
router.route('/get-list-of-trains/:date').get(getTrainList);

// router.route("/temp").post(temp);


export default router;