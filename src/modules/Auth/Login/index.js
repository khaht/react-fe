/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CookiesModel from 'core/cookies';
import './index.scss';
import { toast } from 'react-toastify';
import { actChangeLoading } from 'modules/App/store/actions';
import { actLogin } from 'modules/Auth/store/actions';
import { validateAll } from 'core/utils/validate';
import { SelectInput, EmailInput, TextField } from 'cplus_common_library';
import { useIntl } from 'react-intl';
import { appLocales, appLocalesOptions, DEFAULT_LOCALE } from 'modules/i18n/LanguageProvider/i18n';

function LoginPage({ history }) {
  const dispatch = useDispatch();
  const { isAuthenticated = false } = useSelector((state) => (state.auth ? state.auth : {}));
  const { loading = false } = useSelector((state) => state.app);
  const sysLanguage = localStorage.getItem('sysLanguage');
  const intl = useIntl();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState(
    appLocales.includes(sysLanguage) ? sysLanguage : DEFAULT_LOCALE,
  );

  const fields = {
    email: (
      <EmailInput
        isRequired
        inputClassName="input-material hide-hint"
        isShowLabel
        isShowIcon
        innerRef={emailRef}
        type="email"
        label={intl.formatMessage({ id: 'login.email' })}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        texts={{
          placeholder: intl.formatMessage({
            id: 'login.email.placeholder',
          }),
          field: intl.formatMessage({ id: 'login.email' }),
          hint: '',
        }}
      />
    ),
    password: (
      <TextField
        isRequired
        inputClassName="input-material"
        isShowLabel
        isShowIcon
        innerRef={passwordRef}
        type="password"
        label={intl.formatMessage({ id: 'login.password' })}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        texts={{
          placeholder: intl.formatMessage({
            id: 'login.password.placeholder',
          }),
          field: intl.formatMessage({ id: 'login.password' }),
          hint: '',
        }}
      />
    ),
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('sysLanguage', language);
  }, [history, language]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const gotoForgot = (e) => {
    e.preventDefault();
    history.push('/forgot-password');
  };

  const signIn = (e) => {
    e.preventDefault();
    if (validateAll(fields)) {
      dispatch(actChangeLoading(true));
      dispatch(
        actLogin({
          data: { email, password },
          cbError: () => {
            dispatch(actChangeLoading(false));
            toast.error('Email or password invalid');
          },
          cbSuccess: (token) => {
            const cookies = new CookiesModel();
            cookies.storeAccessToken(token, 36000);
            dispatch(actChangeLoading(false));
            history.push('/');
          },
        }),
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.code === 'Enter') {
      if (!loading) {
        signIn(e);
      }
    }
  };

  const signInWithGoogleCallback = (signInResult) => {
    // window.signInResult = signInResult;
    // const { credential, user } = signInResult;
    // if (credential && credential.idToken) {
    //   updateUser(
    //     {
    //       id: user.uid,
    //       username: user.displayName,
    //       email: user.email,
    //       isActive: user.emailVerified,
    //       type: 'google',
    //     },
    //     true,
    //   );
    //   history.push('/home');
    // }
  };

  const signInWithGoogle = (e) => {
    e.preventDefault();
    // fb.signInWithGoogle()
    //   .then(signInWithGoogleCallback)
    //   .catch((error) => {
    //     const { code } = error;
    //     if (code !== 'auth/popup-closed-by-user') {
    //       toast.error('Something went wrong');
    //     }
    // });
  };

  const changeLanguage = (select) => {
    if (language !== select) {
      setLanguage(select);
      window.location.reload();
    }
  };

  return (
    <div className="login-wrapper">
      <div className="row no-gutters">
        <div className="d-none d-sm-none d-md-block col-md-5  col-lg-7">
          <div className="background">
            <div className="bg-caption pull-bottom sm-pull-bottom text-white p-l-20 p-b-10">
              <h2 className="semi-bold text-white">{intl.formatMessage({ id: 'login.slogan' })}</h2>
              <p className="small">
                <span>{intl.formatMessage({ id: 'app.copyright' })}</span>
                &nbsp;
                {intl.formatMessage({ id: 'app.company' })}
                &nbsp;
                {intl.formatMessage({ id: 'app.reserved' })}
              </p>
            </div>
            <div className="backdrop" />
          </div>
        </div>
        <div className="col-sm-12 col-md-7 col-lg-5">
          <div className="login-container">
            <p className="p-t-35">{intl.formatMessage({ id: 'login.sign.in.title' })}</p>
            <div className="group-input">
              <label className="title-1">
                <span style={{ color: 'red', marginRight: '3px' }}>*</span>
                {intl.formatMessage({ id: 'login.email' })}
              </label>
              <i className="material-icons">person</i>
              {fields.email}
            </div>
            <div className="group-input">
              <label className="title-1">
                <span style={{ color: 'red', marginRight: '3px' }}>*</span>
                {intl.formatMessage({ id: 'login.password' })}
              </label>
              <i className="material-icons">lock</i>
              {fields.password}
            </div>

            <div className="d-flex align-items-center">
              <div className="m-r-15">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  role="button"
                  tabIndex={0}
                  style={{ fontSize: '0.7rem' }}
                  onClick={gotoForgot}
                  onKeyDown={gotoForgot}
                >
                  {intl.formatMessage({ id: 'common.label.forgotPassword' })}
                </a>
              </div>
              <div className="flex-grow-1 d-flex justify-content-end">
                <div style={{ maxWidth: '162px', width: '100%' }}>
                  <SelectInput
                    dataType="string"
                    value={appLocalesOptions.find((locale) => locale.value === language)}
                    classNamePrefix="select-material"
                    onChange={changeLanguage}
                    options={appLocalesOptions}
                  />
                </div>
              </div>
            </div>
            <button
              className="btn btn-primary btn-cons m-t-10 btn-block"
              type="button"
              onClick={signIn}
            >
              {intl.formatMessage({ id: 'link.sign.in' })}
            </button>
            {/* <button
              className="btn btn-google btn-cons m-t-10 btn-block"
              type="button"
              onClick={signInWithGoogle}
            >
              {intl.formatMessage({ id: 'login.sign.in.google.button' })}
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
