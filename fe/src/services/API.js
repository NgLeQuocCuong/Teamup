const API_ROOT = process.env.REACT_APP_API_DOMAIN;

const LOGIN = API_ROOT + 'api/auth/login'
const GET_USER_INFO = API_ROOT + 'api/user/get_information'

const GET_SPORT_LIST = API_ROOT + 'api/sport/get_list'

const CREATE_ACTIVITY = API_ROOT + 'api/activity/add'
const GET_ACTIVITIES = API_ROOT + 'api/activity/get_list'
const JOIN_ACTIVITY = API_ROOT + 'api/activity/accept'

export const API_CONST = {
    LOGIN,
    GET_USER_INFO,
    GET_SPORT_LIST,
    CREATE_ACTIVITY,
    GET_ACTIVITIES,
    JOIN_ACTIVITY,
}