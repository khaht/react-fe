/* eslint-disable react/button-has-type */
import React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules-react';
import GetAuthModule from './store/module';

const Home = () => {
  return (
    <DynamicModuleLoader modules={[GetAuthModule()]}>
      <span>Auth</span>
    </DynamicModuleLoader>
  );
};
export default Home;
