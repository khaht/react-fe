import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { DynamicModuleLoader } from 'redux-dynamic-modules-react';
import { CHANGE_LOCALE } from 'modules/i18n/LanguageProvider/store/constants';
import { getIntlModule } from './store/module';
import { makeSelectLocale } from './store/selectors';
import { appLocales, DEFAULT_LOCALE } from './i18n';

export function LanguageProvider(props) {
  const { messages, children } = props;
  const { locale } = useSelector(makeSelectLocale);
  const dispatch = useDispatch();
  const sysLanguage = localStorage.getItem('sysLanguage');

  if (appLocales.includes(sysLanguage) && sysLanguage !== DEFAULT_LOCALE) {
    dispatch({
      type: CHANGE_LOCALE,
      locale: sysLanguage,
    });
  }

  return (
    <DynamicModuleLoader modules={[getIntlModule()]}>
      <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
        {React.Children.only(children)}
      </IntlProvider>
    </DynamicModuleLoader>
  );
}

LanguageProvider.propTypes = {
  messages: PropTypes.objectOf(PropTypes.any).isRequired,
  children: PropTypes.element.isRequired,
};

export default LanguageProvider;
