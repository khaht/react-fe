/* eslint-disable react/button-has-type */
import React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules-react';
import GetHomeModule from './store/module';

const Home = () => {
  return (
    <DynamicModuleLoader modules={[GetHomeModule()]}>
      <span>Home</span>
    </DynamicModuleLoader>
  );
};
export default Home;
