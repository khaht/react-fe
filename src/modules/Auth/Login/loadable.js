import React from 'react';
import loadable from 'core/utils/loadable';
import LoadingIndicator from 'core/components/LoadingIndicator';

export default loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
});
