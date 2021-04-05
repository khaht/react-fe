/* eslint-disable react/button-has-type */
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DynamicModuleLoader } from 'redux-dynamic-modules-react';
import { getStates } from './store/selectors';
import { getHomeModule } from './store/module';
import { GET_HOME } from './store/constants';

const Home = () => {
  const { data } = useSelector(getStates);
  const dispatch = useDispatch();
  const testSagas = () => {
    dispatch({ type: GET_HOME });
  };
  return (
    <DynamicModuleLoader modules={[getHomeModule()]}>
      <Link to="/home1">click vao</Link>
      <button onClick={() => testSagas()}>Actions</button>
      <span>{data}</span>
    </DynamicModuleLoader>
  );
};
export default Home;
