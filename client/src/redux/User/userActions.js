import {LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, SIGNUP_USER, SIGNUP_USER_FAILURE,SIGNUP_USER_SUCCESS, SIGNUP_EMAIL_CONFIRM, SIGNUP_EMAIL_CONFIRM_FAILURE, SIGNUP_EMAIL_CONFIRM_SUCCESS, LOGOUT_USER } from './userTypes';
import {API_LOADING, API_LOADING_SUCCESS, API_LOADING_FAILURE} from "../Global/globalTypes";

import {apiLoading, apiLoadingFailure} from '../Global/globalActions';

import axios from 'axios';

import {history} from '../../history';
import {apiLoadingSuccess} from "..";


axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const loginUser = (user) => {
    console.log(user)
    return {
        type: LOGIN_USER
    }
};

export const loginUserSuccess = (user) => {
    return {
        type: LOGIN_USER_SUCCESS,
        payload: user
    }
};
export const loginUserFailure = (err) => {
    return {
        type: LOGIN_USER_FAILURE,
        payload: err
    }
};

export const logoutUser = () => {
    history.push('/login');
    return {
        type: LOGOUT_USER,
    }
}


export const signupUser = (user) => {
    console.log(user);
    return {
        type: SIGNUP_USER
    }
};


export const signupUserSuccess = (user) => {
    return {
        type: SIGNUP_USER_SUCCESS,
        payload: user
    }
};
 /* failure not written yet*/


export const signupEmail = () => {
    return {
        type: SIGNUP_EMAIL_CONFIRM
    }
};

export const signupEmailSuccess = (user) => {
    return {
        type: SIGNUP_EMAIL_CONFIRM_SUCCESS,
        payload: user
    }
};


export const signupNewUser = (userSignup) => {
    console.log(userSignup)
    return (dispatch) => {
        dispatch(signupUser(userSignup));
        axios.post('/api/signup', userSignup)
            .then(response => {
                const user = response.data;
                console.log(user);
                dispatch(signupUserSuccess(user));
            }).catch(err => {
            const errorMsg = err.message;
            console.log(errorMsg)
            // dispatch(fetchUsersFailure(err));
        })
    }
};

export const signUpEmailConfirm = (token) => {
    console.log(token)
    return (dispatch) => {
        dispatch(signupEmail(token));
        axios.post('/api/account-activation', token)
            .then(response => {
                const signupMessage = response.data;
                console.log(signupMessage);
                dispatch(signupEmailSuccess(signupMessage.user));
                history.push('/login');
            }).catch(err => {
            const errorMsg = err.message;
            console.log(errorMsg)
            // dispatch(fetchUsersFailure(err));
        })
    }
}


 // Method that trigger on Login Button click
export const fetchUser = (userLogin) => {
    console.log(userLogin)
    return (dispatch) => {
        dispatch(loginUser(userLogin));
        dispatch(apiLoading());

        axios.interceptors.request.use(function (config) {
            // Do something before request is sent
            console.log(config)
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });
        axios.post('/api/signin', {...userLogin})
            .then(response => {
                const user = response.data;
                console.log(user);
                dispatch(loginUserSuccess(user));
                dispatch(apiLoadingSuccess());

                history.push('/home');
            }).catch(err => {
            const errorMsg = err.message;
            console.log(errorMsg);
            dispatch(loginUserFailure(errorMsg));
            dispatch(apiLoadingFailure());
        })
    }
};

