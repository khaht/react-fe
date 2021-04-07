import React from 'react';
import PropTypes from 'prop-types';

function BlankLayout({ children }) {
  return <div className="h-full">{children}</div>;
}

BlankLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BlankLayout;
