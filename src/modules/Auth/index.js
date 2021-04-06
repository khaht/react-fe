/* eslint-disable react/button-has-type */
import React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules-react';
import { getAuthModule } from './store/module';

const Home = () => {
  return (
    <DynamicModuleLoader modules={[getAuthModule()]}>
      <span>Auth</span>
    </DynamicModuleLoader>
  );
};
export default Home;
