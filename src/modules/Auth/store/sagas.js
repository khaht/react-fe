import { all, put, fork, call, takeLatest } from 'redux-saga/effects';
import AuthService from '../service';
import { GET_PROFILE } from './constants';
import { actGetToken } from './actions';

const Services = new AuthService();
// handler
function* getProfile() {
  // try {
  //   const request = yield call(Services.getProfile);
  //   yield put(actGetHome('abc'));
  // } catch (error) {
  //   // yield showError;
  //   console.log(error);
  // }
}

// watcher
function* watchGetHome() {
  // yield takeLatest(GET_HOME, getProfile);
}

export default function* homeSaga() {
  yield all([]);
}
