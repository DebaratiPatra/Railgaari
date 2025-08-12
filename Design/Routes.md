```javascript
router.route('/station-create').post(createStation);
router.route('/get-shortest-route').post(getRoute);
router.route('/get-all-stations').get(getAllStations);
router.route('/get-single-station').get(getSingleStations); 
    // Patricular station details including platform details
router.route('/get-train-details').get(getSingleTrainDetails);
router.route('/get-list-of-trains/:date').get(getTrainList);



//user
router.route('/login').post(login);
router.route('/register').post(register);
router.route('/logout').get(logout);
router.route('/forgot-password').post(forgot-password);
router.route('/favourite-route').post(favouriteroute);
router.route('/favourite-train').post(favouritetrain);
router.route('/favourite-station').post(favouritestation);
```

