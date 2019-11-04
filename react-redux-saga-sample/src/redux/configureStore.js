import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

const composeEnhancers = compose;

const configureStore = () => {
    const middlewares = [
        thunk
    ];
    const enhancers = [
        applyMiddleware(...middlewares)
    ]
    const store = createStore(rootReducer, composeEnhancers(...enhancers));
    return store;
}

export default configureStore;