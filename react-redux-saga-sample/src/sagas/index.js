import { fork, take, call, put, delay, takeLatest, select, takeEvery } from 'redux-saga/effects';
import * as taskTypes from './../constants/task'
import { getList } from './../apis/task'
import { STATUS_CODE } from '../constants';
import { fetchListTaskSuccess, fetchListTaskFailed, filterTaskSuccess } from '../actions/task';
import { showLoading, hideLoading } from './../actions/ui';

function* watchFetchListtaskAction() {
    while(true) {
        yield take(taskTypes.FETCH_TASK);
        yield put(showLoading());
        // Blocing
        const resp = yield call(getList);
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
    const { keyword } = payload;
    const list = yield select(state => state.task.listTask);
    const filteredTask = list.filter(task => 
        task.title.toLowerCase().includes(keyword.trim().toLowerCase())
    );
    yield put(filterTaskSuccess(filteredTask));
}

function* rootSaga() {
    yield fork(watchFetchListtaskAction);
    yield takeLatest(taskTypes.FILTER_TASK, filterTaskSaga);
    // yield takeEvery(taskTypes.FILTER_TASK, filterTaskSaga);
}

export default rootSaga;