import { API_CONST } from "./API";
import fetch from 'cross-fetch';

const login = async (data) => {
    return [true, {
        data: {
            access: 'asd',
            refresh: 'asxc',
        }
    }]
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

const getUserInfo = () => {
    const data = {
        userName: 'Nguyen cuong',
        listFriend: [],
    }
    return [localStorage['access'] === 'asd', { data: data }]
}

export const ProfileServices = {
    login,
    getUserInfo,
}