// store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import songsReducer from './features/songsSlice';
import rootSaga from './features/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    songsState: songsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;