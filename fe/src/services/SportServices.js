import { API_CONST } from "./API";
import fetch from 'cross-fetch';
import { tokenUtil } from './token';

const getListSport = async () => {
    let response;
    let options = {
        method: 'GET',
    }
    let url = API_CONST.GET_SPORT_LIST;
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
const createActivity = async (data) => {
    let response;
    let options = {
        method: 'POST',
        body: data,
    }
    let url = API_CONST.CREATE_ACTIVITY;
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
const getListActivity = async loggedin => {
    let response;
    let options = {
        method: 'GET',
    }
    let url = API_CONST.GET_ACTIVITIES;
    if (loggedin) {
        tokenUtil.updateOrCreateHeader(options);
    }
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

const joinActivity = async (uid) => {
    let response;
    let options = {
        method: 'GET',
    }
    let url = API_CONST.JOIN_ACTIVITY + `?uid=${uid}`;
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
export const SportServices = {
    getListSport,
    createActivity,
    getListActivity,
    joinActivity,
}