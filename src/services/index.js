

import Vue from 'vue';
import { endPoint, getUrl } from './endpoints';


function ErrorHandler(err) {
    console.log('please implement ErrorHandler!!!');
}

export function loginService(params) {
    return Vue.axios({
        method: 'post',
        url: getUrl(endPoint.login),
        data: {
            ...params
        }
    }).catch((err) => {
        ErrorHandler(err)
    })
}


export function findOutlet(params) {
    return Vue.axios({
        method: 'get',
        url: getUrl(endPoint.outlet),
        params: {
            oname :params.query
        }
    }).catch((err) => {
        ErrorHandler(err)
    })
}



export function createContest(params) {
    return Vue.axios({
        method: 'post',
        url: getUrl(endPoint.createContest),
        data: {
            ...params
        }
    }).catch((err) => {
        ErrorHandler(err)
    })
}

export function getContest(params) {
    return Vue.axios({
        method: 'get',
        url: getUrl(endPoint.contest),
        params: {
            skip :params.skip,
            filter:params.filter
        }
    }).catch((err) => {
        ErrorHandler(err)
    })
}


export function contestDetail(params) {
    return Vue.axios({
        method: 'get',
        url: `${getUrl(endPoint.contest)}/${params.id}`,
        params: {
            skip :params.skip
        }
    }).catch((err) => {
        ErrorHandler(err)
    })
}


export function editContest(params) {
    return Vue.axios({
        method: 'put',
        url: `${getUrl(endPoint.contest)}/${params.id}`,
        data: {
            ...params
        }
    }).catch((err) => {
        ErrorHandler(err)
    })
}


export function expireContest(params) {
    return Vue.axios({
        method: 'patch',
        url: `${getUrl(endPoint.contest)}/${params.id}`
    }).catch((err) => {
        ErrorHandler(err)
    })
}


export function deleteContest(params) {
    return Vue.axios({
        method: 'delete',
        url: `${getUrl(endPoint.contest)}/${params.id}`
    }).catch((err) => {
        ErrorHandler(err)
    })
}

















