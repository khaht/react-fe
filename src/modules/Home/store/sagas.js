import { all, put, fork, call, takeLatest } from 'redux-saga/effects';
import HomeService from '../service';
import { GET_HOME } from './constants';
import { actGetHome } from './actions';

const Services = new HomeService();
// handler
function* getHome() {
  try {
    // const request = yield call(Services.getHome);
    yield put(actGetHome('abc'));
  } catch (error) {
    // yield showError;
    console.log(error);
  }
}

// watcher
function* watchGetHome() {
  yield takeLatest(GET_HOME, getHome);
}

export default function* homeSaga() {
  yield all([fork(watchGetHome)]);
}
