
const getStorageObj = () => {
    return localStorage;
}

const updateOrCreateHeader = header => {
    if (header === null || header === void 0) {
        header = {
            method: 'GET',
            headers: {

            }
        }
    }
    let token = getStorageObj().getItem('access');
    if (token === null) {
    }
    if (header.headers === null || header.headers === void 0) {
        header.headers = {};
    }
    header.headers.Authorization = "Bearer " + token;
    return header;
}


export const tokenUtil = {
    updateOrCreateHeader,
    getStorageObj,
};