import * as taskApis from './../apis/task'
import * as taskContants from './../constants/task'

export const fetchListTask = () => {
    return {
        type: taskContants.FETCH_TASK
    }
}

export const fetchListTaskSuccess = data => {
    return {
        type: taskContants.FETCH_TASK_SUCCESS,
        payload: {
            data
        }
    }
}

export const fetchListTaskFailed = error => {
    return {
        type: taskContants.FETCH_TASK_SUCCESS,
        payload: {
            error
        }
    }
}

// export const fetchListTaskRequest = () => {
//     return dispatch => {
//         dispatch(fetchListTask());
//         taskApis.getList().then(resp => {
//             const { data } = resp;
//             console.log('data:', data);
//             dispatch(fetchListTaskSuccess(data))
//         }).catch(error => {
//             console.log('error;', error);
//             dispatch(fetchListTaskFailed(error))
//         })
//     }
// };

export const filterTask = keyword => ({
    type: taskContants.FILTER_TASK,
    payload: {
        keyword,
    }
});

export const filterTaskSuccess = data => ({
    type: taskContants.FILTER_TASK_SUCCESS,
    payload: {
        data,
    }
});