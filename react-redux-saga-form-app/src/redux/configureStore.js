import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

const composeEnhancers = compose;

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
    const middlewares = [
        thunk,
        sagaMiddleware
    ];
    const enhancers = [
        applyMiddleware(...middlewares)
    ]
    const store = createStore(rootReducer, composeEnhancers(...enhancers));
    sagaMiddleware.run(rootSaga);
    return store;
}

export default configureStore;