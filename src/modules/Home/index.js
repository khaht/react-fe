/* eslint-disable react/button-has-type */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { DynamicModuleLoader } from 'redux-dynamic-modules-react';
import { getStates } from './store/selectors';
import { getHomeModule } from './store/module';
import { GET_HOME } from './store/constants';

const Home = () => {
  const { data } = useSelector(getStates);
  const intl = useIntl();
  const dispatch = useDispatch();
  const testSagas = () => {
    dispatch({ type: GET_HOME });
  };
  return (
    <DynamicModuleLoader modules={[getHomeModule()]}>
      <span>Home</span>
    </DynamicModuleLoader>
  );
};
export default Home;
