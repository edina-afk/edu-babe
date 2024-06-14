// sagas.js
import { call, put, takeEvery, all } from 'redux-saga/effects';
import axios from 'axios';
import {
  songsAdd,
  getSongs,
  deleteSong,
  updateSong,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongSuccess,
  addSongFailure,
  deleteSongSuccess,
  deleteSongFailure,
  updateSongSuccess,
  updateSongFailure
} from '../features/songsSlice';

const baseURL = "http://localhost:5031/api/";

function* addSongSaga(action) {
  try {
    const response = yield call(axios.post, baseURL + "songs", action.payload);
    yield put(addSongSuccess(response.data));
  } catch (error) {
    yield put(addSongFailure(error.response?.data));
  }
}

function* fetchSongsSaga() {
  try {
    const response = yield call(axios.get, baseURL + "songs");
    yield put(fetchSongsSuccess(response.data));
  } catch (error) {
    yield put(fetchSongsFailure(error.response?.data));
  }
}

function* deleteSongSaga(action) {
  try {
    const response = yield call(axios.delete, baseURL + "songs/" + action.payload);
    yield put(deleteSongSuccess(response.data));
  } catch (error) {
    yield put(deleteSongFailure(error.response?.data));
  }
}

function* updateSongSaga(action) {
  try {
    const { _id, artist, title, isComplete, date, uid } = action.payload;
    const response = yield call(axios.put, baseURL + "songs/" + _id, {
      artist,
      title,
      isComplete,
      date,
      uid
    });
    yield put(updateSongSuccess(response.data));
  } catch (error) {
    yield put(updateSongFailure(error.response?.data));
  }
}

function* watchAddSong() {
  yield takeEvery(songsAdd.type, addSongSaga);
}

function* watchFetchSongs() {
  yield takeEvery(getSongs.type, fetchSongsSaga);
}

function* watchDeleteSong() {
  yield takeEvery(deleteSong.type, deleteSongSaga);
}

function* watchUpdateSong() {
  yield takeEvery(updateSong.type, updateSongSaga);
}

export default function* rootSaga() {
  yield all([
    watchAddSong(),
    watchFetchSongs(),
    watchDeleteSong(),
    watchUpdateSong()
  ]);
}