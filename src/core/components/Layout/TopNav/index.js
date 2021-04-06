/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from 'assets/images/logo-default.png';
import avatar from 'assets/images/avatars/user-avatar.png';
import './index.scss';

function TopNav({ signOut, userName }) {
  const history = useHistory();
  const [isShow, setShow] = useState(false);
  const logout = () => {
    setShow(false);
    signOut();
  };

  return (
    <div className="header df-between">
      {/* <a
        className="btn-link toggle-sidebar d-lg-none pg pg-menu"
        data-toggle="sidebar"
        onClick={this.toggleSideBar.bind(this)}
      >
        <i className="material-icons">menu</i>
      </a> */}
      {/* START LOGO */}
      <div className="left-logo">
        <button type="button" className="btn-none" onClick={() => history.push('/home')}>
          <img src={logo} alt="logo" data-src={logo} data-src-retina={logo} width={45} />
        </button>
      </div>
      {/* START PROFILE */}
      <div className="right-profile df-right">
        <span className="name semi-bold">{userName}</span>
        <div className="dropdown pull-right">
          <button className="profile-dropdown-toggle" type="button" onClick={() => setShow(!isShow)}>
            <img src={avatar} alt="..." width="32" height="32" />
          </button>
          <div className={`dropdown-menu dropdown-menu-right profile-dropdown ${isShow ? 'show' : null}`}>
            <a
              role="button"
              tabIndex={0}
              className="clearfix bg-master-lighter dropdown-item"
              onClick={() => {
                setShow(false);
                return history.push('/profile');
              }}
              onKeyDown={() => {
                setShow(false);
                return history.push('/profile');
              }}
            >
              <span className="pull-left">Profile</span>
              <span className="pull-right">
                <i className="material-icons md-18">account_box</i>
              </span>
            </a>
            <a
              role="button"
              tabIndex={0}
              className="clearfix bg-master-lighter dropdown-item"
              onClick={logout}
              onKeyDown={logout}
            >
              <span className="pull-left">Logout</span>
              <span className="pull-right">
                <i className="material-icons md-18">lock</i>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

TopNav.propTypes = {
  signOut: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
};

export default TopNav;
