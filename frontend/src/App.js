import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/Auth/LoginPage.js';
import RegisterPage from './components/Auth/RegisterPage.js';
import Test from "./Test.js";
import ForgotPasswordForm from './components/Auth/ForgotPasswordForm.js';
import VerifyOtp from './components/Auth/VerifyOtp.js';
import Navbar from './components/Common/Navbar.js';
import Footer from './components/Common/Footer.js';
import HomePage from './pages/Home/HomePage.js';
import RoutePage from './components/Station/Route.js';
import UserProfile from './components/Dashboard/User/UserProfile.js';
import AboutUs from './pages/AboutUs/AboutUs.js';
import ChangePassword from './components/Dashboard/ChangePassword.js';
import ViewFavouriteRoutes from './components/Dashboard/ViewFavouriteRoutes.js';
import Logout from './components/Dashboard/Logout.js';
import { useEffect } from 'react';
import { getProfileAction } from './redux/actions/userActions.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStations, getLRUtrains } from './redux/actions/trainActions.js';
import ManageUser from './components/Dashboard/Admin/ManageUser.js';
import ManageStation from './components/Dashboard/Admin/ManageStation.js';
import GetShortestPath from './components/Train/GetShortestPath.js';
import { Alert, AlertIcon, Box, Spinner } from '@chakra-ui/react';
import PageNotFound from './pages/PageNotFound.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Protected from './utils/protectedRoutes.js';
import { AlertNav } from './components/Common/AlertNav.js';
import { VerifyEmail } from './components/Auth/verifyEmail.js';
import CompleteRegistration from './components/Auth/CompleteRegistration.js';
import ResetPassword from './components/Auth/ResetPassword.js';
import TrainRoutePath from './components/Train/TrainRoutePath.js';
import ShowAvailableTrains from './components/Train/ShowAvailableTrains.js';
import { ModalNotice } from './components/Common/ModalNotice.js';


function App() {
    const dispatch = useDispatch();
    const refreshToken = localStorage.getItem("refresh");

    useEffect(() => {
        if (refreshToken) {
            dispatch(getProfileAction());
        }
        dispatch(getAllStations());
    }, [])
    const { loading: loading1, error: err2, data: data1 = [] } = useSelector(state => state.GetAllStation);

    function GoogleLogin() {
        return (
            <GoogleOAuthProvider clientId="146756462672-ldk10gufg7c3v9jun37p6hme4he803ia.apps.googleusercontent.com">
                <LoginPage />
            </GoogleOAuthProvider>
        )
    }

    return (
        <Router>
            <ModalNotice/>
            <AlertNav/>
            <Navbar />
            {loading1 ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <Spinner size="xl" />
                </Box>
            ) :
        <Routes>
            <Route path='*' element={<PageNotFound />} />
            <Route path="/login" element={
                 <Protected needLoggedIn={false}>
                    <GoogleLogin />
                </Protected>
            } />
            <Route path="/register" element={
                 <Protected needLoggedIn={false}>
                     <RegisterPage />
                </Protected>
            } />
            <Route path="/complete-profile" element={
                <Protected needLoggedIn={true}>
                    <CompleteRegistration/>
                 </Protected>
            } />
            <Route path="/forgot-password" element={
                <Protected needLoggedIn={false}>
                    <ForgotPasswordForm />
                </Protected>
            } />
            <Route path="/verify-otp" element={
                <Protected needLoggedIn={false}>
                    <VerifyOtp navigate_link={'/reset-password'} />
                </Protected>
            } />
            <Route path='/reset-password' element={
                <Protected needLoggedIn={false}>
                    <ResetPassword/>
                </Protected>
            } />
            <Route path="/verify-email" element={
                <Protected needLoggedIn={true}>
                    <VerifyEmail/>
                </Protected>
            } />

            <Route path="/" element={
                <Protected needLoggedIn={false}>
                    <HomePage />
                </Protected>
            } />
            <Route path="/Home" element={
                <Navigate to={'/'} />
            } />

            <Route path="/routes" element={
                <Protected needLoggedIn={false}>
                    <RoutePage />
                </Protected>
            } />
                    <Route path="/trains/:trainNo" element={
                        <Protected needLoggedIn={false}>
                            <TrainRoutePath />
                        </Protected>
                    } />
                    <Route path="/get-shortest-path" element={
                        <Protected needLoggedIn={false}>
                            <GetShortestPath />
                            
                        </Protected>
                    } />
                    <Route path="/get-list-available-trains/:source/:destination" element={
                        <Protected needLoggedIn={false}>
                            <ShowAvailableTrains />
                        </Protected>
                    } />
                    <Route path="/profile" element={
                        <Protected needLoggedIn={true}>
                            <UserProfile />
                        </Protected>
                    } />
                    <Route path="/About Us" element={
                        <Protected needLoggedIn={false}>
                            <AboutUs />
                        </Protected>
                    } />
                    <Route path="/admin/manage-user" element={
                        <Protected needLoggedIn={true}>
                            <ManageUser />
                        </Protected>
                    } />
                    <Route path="/logout" element={
                        <Protected needLoggedIn={true}>
                            <Logout />
                        </Protected>
                    } />
                    <Route path='/change-password' element={
                        <Protected needLoggedIn={true}>
                            <ChangePassword />
                        </Protected>
                    } />
                    <Route path='/saved-routes' element={
                        <Protected needLoggedIn={true}>
                            <ViewFavouriteRoutes />
                        </Protected>
                    } />
                    <Route path="/admin/manage-station" element={
                        <Protected needLoggedIn={true}>
                            <ManageStation />
                        </Protected>
                    } />
                </Routes>
            }
            <Footer />
        </Router>
    );
}

export default App;
