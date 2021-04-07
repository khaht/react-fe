/* eslint-disable react/jsx-boolean-value */
import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadingIndicator from 'core/components/LoadingIndicator';
import { actGetCurrentUser } from 'modules/Auth/store/actions';
import { toast, ToastContainer } from 'react-toastify';
import { DynamicModuleLoader } from 'redux-dynamic-modules-react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import CookiesModel from 'core/cookies';
import { getStates } from './store/selectors';
import { getAuthModule } from './store/module';
import Routes from '../../router';
import './index.scss';
import 'react-toastify/dist/ReactToastify.css';

function App(props) {
  // eslint-disable-next-line no-confusing-arrow
  const { isAuthenticated = false } = useSelector((state) => (state.auth ? state.auth : {}));
  const { loading = false } = useSelector(getStates);
  const {
    location: { pathname },
  } = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    toast.configure();
  }, []);

  useEffect(() => {
    const cookie = new CookiesModel();
    const token = cookie.accessToken();
    if (!!token) {
      dispatch(
        actGetCurrentUser({
          cbError: () => {
            window.location.href = '/login';
          },
          cbSuccess: () => {},
        }),
      );
    }
  }, [pathname]);

  const renderRoutesApp = (isAuth) => <Routes {...props} isAuth={isAuth} />;
  const memorizedRoutes = useMemo(() => renderRoutesApp(isAuthenticated), [isAuthenticated]);

  return (
    <DynamicModuleLoader modules={[getAuthModule()]}>
      {loading && (
        <div className="wrapper-loading">
          <LoadingIndicator />
        </div>
      )}
      <Router>{memorizedRoutes}</Router>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
      />
    </DynamicModuleLoader>
  );
}

export default App;
