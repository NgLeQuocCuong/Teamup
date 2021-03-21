import { API_CONST } from "./API";
import fetch from 'cross-fetch';
import { tokenUtil } from './token';

const login = async (data) => {
    let response;
    let options = {
        method: 'POST',
        body: data,
    }
    let url = API_CONST.LOGIN;
    try {
        response = await fetch(url, options);
        let body = await response.json();
        return [body.error_code === 0, body];
    }
    catch (e) {
        if (response && response.statusText) {
            return [false, response.statusText];
        } else {
            return [false, e.message];
        }
    }
}

const getUserInfo = async () => {
    let response;
    let options = {
        method: 'GET',
    }
    let url = API_CONST.GET_USER_INFO;
    tokenUtil.updateOrCreateHeader(options);
    try {
        response = await fetch(url, options);
        let body = await response.json();
        return [body.error_code === 0, body];
    }
    catch (e) {
        if (response && response.statusText) {
            return [false, response.statusText];
        } else {
            return [false, e.message];
        }
    }
}

export const ProfileServices = {
    login,
    getUserInfo,
}