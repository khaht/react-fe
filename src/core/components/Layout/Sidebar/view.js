import React, {
  useRef, useState,
} from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
function Sidebar({ callback }) {
  const sidebar = useRef(null);
  const [state, setState] = useState({
    open: false,
    show: false,
    sideBarWidth: 280 - 70,
    mouseInMenu: false,
  });

  const sidebarClass = {
    transform:
      state.open === true
        ? `translate3d(${state.sideBarWidth}px, 0,0)`
        : 'translate3d(0, 0,0)',
  };

  const isVisibleMd = () => {
    const element = document.getElementById('pg-visible-md');
    return element.offsetParent !== null;
  };

  const isVisibleXs = () => {
    const element = document.getElementById('pg-visible-xs');
    return element.offsetParent !== null;
  };

  const isVisibleSm = () => {
    const element = document.getElementById('pg-visible-sm');
    return element.offsetParent !== null;
  };

  // eslint-disable-next-line no-unused-vars
  const toggleMenuPin = () => {
    const { body } = document;
    const width = window.innerWidth;
    if (width < 1200) {
      if (body.classList.contains('menu-pin')) {
        body.classList.remove('menu-pin');
        body.classList.add('menu-unpinned');
      }
    } else if (body.classList.contains('menu-unpinned')) {
      body.classList.add('menu-pin');
    }
  };

  const handleClickPin = () => {
    const { body } = document;
    const toggle = state.show ? 'hide' : 'show';
    if (toggle === 'hide') {
      body.classList.remove('menu-pin');
      setState({ ...state, show: false });
    } else if (toggle === 'show') {
      body.classList.add('menu-pin');
      setState({ ...state, show: true });
    }
  };

  const handleMouseEnter = () => {
    if (isVisibleSm() || isVisibleXs() || isVisibleMd()) {
      return false;
    }
    setState({ ...state, open: true });
    document.body.classList.add('sidebar-visible');
    return true;
  };

  const handleMouseLeave = () => {
    if (isVisibleSm() || isVisibleXs() || isVisibleMd()) {
      return false;
    }
    setState({ ...state, open: false });
    document.body.classList.remove('sidebar-visible');
    return true;
  };

  return (
    <>
      <nav
        className="page-sidebar site-menubar mm-menu site-menubar-dark custom-sidebar"
        style={sidebarClass}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={sidebar}
      >
        {/* <!-- BEGIN SIDEBAR MENU HEADER--> */}
        <div className="sidebar-header">
          {/* <img
            src={logo}
            alt="logo"
            className="brand"
            data-src={logo}
            data-src-retina={logo2x}
            width="120"
            height="45"
          /> */}
          <div className="sidebar-header-controls">
            <button
              type="button"
              className="btn btn-link d-lg-inline-block d-xlg-inline-block d-md-none d-xs-none d-sm-none d-none p-r-5 p-l-5 m-l-10"
              data-toggle-pin="sidebar"
              onClick={handleClickPin}
            >
              <i className="material-icons" />
            </button>
          </div>
        </div>
        {/* <!-- SIDEBAR MENU BODY--> */}
        {/* <div className="sidebar-menu site-menu">
          <ul className="menu-items p-t-20">
            <Permission action={viewActions.viewDashBoard}>
              <SidebarItemWR
                title={t('menu.dashboard')}
                to="/dashboard"
                icon="dashboard"
              />
            </Permission>
            <Permission action={viewActions.viewAgents}>
              <SidebarItemWR
                title={t('menu.agents')}
                to="/agents"
                icon="headset_mic"
              />
            </Permission>
            <Permission action={viewActions.viewAdmins}>
              <SidebarItemWR
                title={t('menu.admins')}
                to="/admins"
                icon="account_box"
              />
            </Permission>
            <Permission action={viewActions.viewBots}>
              <SidebarItemWR title={t('menu.bots')} to="/bots" icon="android" />
            </Permission>
            <Permission action={viewActions.viewProjects}>
              <SidebarItemWR
                title={t('menu.projects')}
                to="/projects"
                icon="work_outline"
              />
            </Permission>
            <Permission action={viewActions.viewClients}>
              <SidebarItemWR
                title={t('menu.clients')}
                to="/clients"
                icon="perm_identity"
              />
            </Permission>
            <Permission action={viewActions.viewOperators}>
              <SidebarItemWR
                title={t('menu.companies')}
                to="/operators"
                icon="group_work"
              />
            </Permission>
            <Permission action={viewActions.viewBusiness}>
              <SidebarItemWR
                title={t('menu.business.manager')}
                to="/businessManager"
                icon="perm_contact_calendar"
              />
            </Permission>
            <Permission action={viewActions.viewLDAPManagement}>
              <SidebarItemWR
                title={t('menu.ldap.management')}
                to="/ldapManagement"
                icon="people_outline"
              />
            </Permission>
            <Permission action={viewActions.viewLogs}>
              <SidebarItemWR title={t('menu.logs')} to="/logs" icon="list" />
            </Permission>
          </ul>
          <ul className={'menu-items-bottom'}>
            <li>
              <a href="#" onClick={this.handleSupportLink}>
                <span className="title">{t('menu.support')}</span>
                <span className="icon-thumbnail">
                  <i className="material-icons">contact_support</i>
                </span>
              </a>
            </li>
          </ul>
        </div> */}
      </nav>
    </>
  );
}

Sidebar.defaultProps = {
  callback: () => {},
};

Sidebar.propTypes = {
  callback: PropTypes.func,
};

export default Sidebar;
