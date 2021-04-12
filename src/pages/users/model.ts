//使用model.ts会默认开启dva模块，所以配置文件中不需要再开启dva
import { useEffect } from 'react';
import { Reducer, Effect, Subscription } from 'umi';
import { deleteRemoteList, getRemoteList, setRemoteList, addRemoteList } from "./service";
import { message } from 'antd';
import { UserInfoType } from './data.d';

export interface UserStateType {
    data: UserInfoType[],
    meta: {
        total: number,
        per_page: number,
        page: number,
    },
};

interface UserModelType {
    namespace: 'users',
    state: UserStateType,
    reducers: {
        getList: Reducer<UserStateType>,
    },
    effects: {
        getRemote: Effect,
        setRemote: Effect,
        deleteRemote: Effect,
        addRemote: Effect,
    },
    subscriptions: {
        setup: Subscription,
    },
};

const UserModel: UserModelType = {
    namespace: 'users',
    state: {
        data: [],
        meta: {
            total: 0,
            per_page: 5,
            page: 1,
        },
    },
    reducers: {
        getList(state, { payload }) {
            return payload;              
        }
    },
    effects: {
        *getRemote(action, { put, call }){
            const data = yield call(getRemoteList);
            if (data) {
                yield put({
                    type: 'getList',
                    payload: data,
                });
            };
        },

        *setRemote({ payload:{id, values} }, { put, call }){
            const data = yield call(setRemoteList, {id, values});
            if (data) {
                yield put({
                    type: 'getRemote',
                });
                message.success('Edit Successfully.');
            } else {
                message.error('Edit Failed.')
            }
        },

        *deleteRemote({ payload }, { put, call }){
            const data = yield call(deleteRemoteList, payload);
            if (data) {
                yield put({
                    type: 'getRemote',
                });
                message.success('Delete Successfully.');
            } else {
                message.error('Delete Failed.')
            }
        },

        *addRemote({ payload }, { put, call }){
            const data = yield call(addRemoteList, payload);

            if (data) {
                yield put({
                    type: 'getRemote',
                });
                message.success('Add Successfully.');
            } else {
                message.error('Add Failed.')
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }){
            return history.listen(({pathname}) => {
                if (pathname === '/users') {
                    dispatch({
                        type: 'getRemote',
                    });
                }
            });
        },
    },
};

export default UserModel;