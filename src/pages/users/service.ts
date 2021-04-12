import { request} from 'umi';
import { message } from 'antd';
import { extend } from 'umi-request';

const errorHandler = function (error: any) {
    if (error.response) {
        message.error(error.data.message ? error.data.message : error.data);
    } else {
        message.error('Network Error.');
    };
};
const extendRequest = extend({ errorHandler });

export const getRemoteList = async () => {
    return extendRequest('http://public-api-v1.aspirantzhang.com/users', {
        method: 'get',
    })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return false;
        });
}

export const setRemoteList = async ({ id, values }: { id: number, values: any }) => {
    return extendRequest(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
        method: 'put',
        data: values,
    })
        .then(function (response) {
            if(response === undefined) {
                return false;
            };
            return true;
        })
        .catch(function (error) {
            return false;
        });
}

export const deleteRemoteList = async (id: number) => {
    return extendRequest(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
        method: 'delete',
    })
        .then(function (response) {
            if(response === undefined) {
                return false;
            };
            return true;
        })
        .catch(function (error) {
            return false;
        });
}

export const addRemoteList = async (values: any) => {
    return extendRequest('http://public-api-v1.aspirantzhang.com/users', {
        method: 'post',
        data: values,
    })
        .then(function (response) {
            if(response === undefined) {
                return false;
            };
            return true;
        })
        .catch(function (error) {
            return false;
        });
}