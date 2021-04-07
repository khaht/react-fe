import React from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
// import {
//   makeSelectCurrentUser,
//   makeSelectIsAuthenticate,
// } from 'modules/App/selectors';
import './index.scss';
import CookiesModel from 'core/cookies';
// import fb from 'core/firebase';
// import LoginModel from 'modules/Login/model';
// import { getUserInfo, updateAuthUser } from 'modules/App/actions';
// import reducer from 'modules/App/reducer';
// import saga from 'modules/App/saga';
// import { toast } from 'react-toastify';
import { actLogout } from 'modules/Auth/store/actions';
import TopNav from './TopNav';

// const key = 'global';
// function Layout({ currentUser, children, updateUser }) {
function Layout({ children }) {
  const dispatch = useDispatch();
  const signOut = async () => {
    dispatch(actLogout());
    new CookiesModel().clearToken();
  };

  // const username = currentUser && currentUser.username ? currentUser.username : '';
  const username = '';
  return (
    <>
      <div className="">
        <div className="page-container">
          <TopNav
            signOut={signOut}
            userName={username}
            // avatar={this.state.adminInfo.avatar}
          />
        </div>
        <div className="wrapper-container">{children}</div>
      </div>
    </>
  );
}

Layout.propTypes = {
  // currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
  // updateUser: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout;
