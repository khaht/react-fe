import { all, put, takeLatest, call } from 'redux-saga/effects';
import { LOGIN, GET_CURRENT_USER } from './constants';
import { actUpdateAuthUser } from './actions';
import AuthService from '../service';

const Services = new AuthService();

/**
 *
 * @param {cbSuccess: Fn, cbError: Fn, data: any} payload
 */
function* login({ payload }) {
  const { cbSuccess, cbError, data } = payload;
  try {
    const resp = yield call(Services.login, data);
    const {
      data: { token, user: currentUser },
    } = resp;
    yield put(actUpdateAuthUser({ isAuthenticated: true, currentUser }));
    yield cbSuccess(token);
  } catch (error) {
    yield cbError();
  }
}

function* getCurrentUser({ payload }) {
  const { cbError, cbSuccess } = payload;
  try {
    const resp = yield call(Services.getCurrentUser);
    const {
      data: { user: currentUser },
    } = resp;
    yield put(actUpdateAuthUser({ isAuthenticated: true, currentUser }));
    yield cbSuccess();
  } catch (error) {
    yield cbError();
  }
}

// watcher
function* watchLogin() {
  yield takeLatest(LOGIN, login);
}

function* watchGetCurrentUser() {
  yield takeLatest(GET_CURRENT_USER, getCurrentUser);
}
export default function* homeSaga() {
  yield all([watchLogin(), watchGetCurrentUser()]);
}
