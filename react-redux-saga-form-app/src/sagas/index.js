import { fork, take, call, put, delay, takeLatest, select, takeEvery } from 'redux-saga/effects';
import * as taskTypes from './../constants/task'
import { getList, addTask } from './../apis/task'
import { STATUS_CODE, STATUSES } from '../constants';
import { fetchListTaskSuccess, fetchListTaskFailed, filterTaskSuccess, addTaskSuccess, addTaskFailed, fetchListTask } from '../actions/task';
import { showLoading, hideLoading } from './../actions/ui';
import { hideModal } from '../actions/modal';

function* watchFetchListtaskAction() {
    while(true) {
        const action = yield take(taskTypes.FETCH_TASK);
        yield put(showLoading());
        const { params } = action.payload;
        // Blocing
        const resp = yield call(getList, params);
        // Blocing
        const { status, data } = resp;
        if (status === STATUS_CODE.SUCCESS) {
            yield put(fetchListTaskSuccess(data));
        } else {
            yield put(fetchListTaskFailed(data));
        }
        yield delay(1000);
        yield put(hideLoading());
    }
}

function* filterTaskSaga({ payload }) {
    yield delay(500);
    // console.log('test takeEvery');
    // const { keyword } = payload;
    // const list = yield select(state => state.task.listTask);
    // const filteredTask = list.filter(task => 
    //     task.title.toLowerCase().includes(keyword.trim().toLowerCase())
    // );
    // yield put(filterTaskSuccess(filteredTask));
    const { keyword } = payload;
    yield put(fetchListTask({ q: keyword }));
}

function* addTaskSaga({ payload }) {
    const { title, description } = payload;
    yield put(showLoading());
    const resp = yield call(addTask, {
        title,
        description,
        status: STATUSES[0].value,
    });
    const { data, status } = resp;
    if (status === STATUS_CODE.CREATED) {
        yield put(addTaskSuccess(data));
        yield put(hideModal());
    } else {
        yield put(addTaskFailed(data));
    }
    yield delay(1000);
    yield put(hideLoading());
}

function* rootSaga() {
    yield fork(watchFetchListtaskAction);
    yield takeLatest(taskTypes.FILTER_TASK, filterTaskSaga);
    // yield takeEvery(taskTypes.FILTER_TASK, filterTaskSaga);
    yield takeEvery(taskTypes.ADD_TASK, addTaskSaga);
}

export default rootSaga;