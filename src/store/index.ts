import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';
import thunk from 'redux-thunk';
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: {
      ignoredActionPaths: ['callbacks'],
      ignoredPaths: ['action.callbacks', 'callbacks.onCallSuccess', 'callbacks.onCallFailure'],
    }}).concat(sagaMiddleware, thunk),
});

sagaMiddleware.run(rootSaga);
export default store;
